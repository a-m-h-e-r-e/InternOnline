const Company = require("../models/company");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body); // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Company.findOne({ name: req.body.name }).then((company) => {
    if (company) {
      return res.status(400).json({ name: "Company name already exists" });
    }
  });

  Company.findOne({ email: req.body.email }).then((company) => {
    if (company) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newCompany = new Company({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }); // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCompany.password, salt, (err, hash) => {
          if (err) throw err;
          newCompany.password = hash;
          newCompany
            .save()
            .then((company) => res.json(company))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body); // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password; // Find company by email
  Company.findOne({ email }).then((company) => {
    // Check if company exists
    if (!company) {
      return res.status(404).json({ email: "Email not found" });
    } // Check password
    bcrypt.compare(password, company.password).then((isMatch) => {
      if (isMatch) {
        // Company matched
        // Create JWT Payload
        const payload = {
          _id: company._id,
          name: company.name,
        }; // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
};

module.exports = {
  register,
  login,
};
