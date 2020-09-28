let multer = require("multer");
// let directory = "static/submissions";
let directory = "../frontend/src/static/resumes";
let fs = require("fs");
const Request = require("../models/Request");
const RequestNumbers = require("../models/requestnumbers");
let post_id = "";
let fullname = "";
let email = "";
let skills = "";
let phone = "";
let linkedlink = "";
let additional_info = "";
let filename = "";
apply = (req, res) => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("here i am " + req.body.language);
      fs.mkdirSync(directory, { recursive: true });
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      post_id = req.body.post_id;
      fullname = req.body.fullname;
      email = req.body.email;
      skills = req.body.skills;
      phone = req.body.phone;
      linkedlink = req.body.linkedlink;
      additional_info = req.body.additional_info;
      filename = Date.now() + "-" + file.originalname;
      // directory = directory + '/' + new Date() + '-' + filename;
      cb(null, filename);
    },
  });

  let upload = multer({ storage: storage }).single("file");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    console.log("here you are" + filename);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>" + req.file.path);
    // if every thing is okay
    // let user_name = "";
    // User.findById({ _id: user_id }, (err, user) => {
    //   user_name = user.user_name;
    // });
    const request = new Request({
      post_id,
      fullname,
      email,
      skills,
      phone,
      additional_info,
      linkedlink,
      resume: filename,
    });

    request
      .save()
      .then(() => {
        // Post.find({_id: post_id }, (err, sen))
        RequestNumbers.findOne({ post_id: post_id }, (err, rn) => {
          let temp = rn.numbers;
          console.log(">>>> " + rn.numbers);
          rn.numbers = temp + 1;
          rn.save();
        });
        return res.status(201).json({
          success: true,
          id: request._id,
          message: "Post created!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          error,
          message: "Post not created!",
        });
      });
  });
};

getApplicantsByPostId = (req, res) => {
  Request.find({ post_id: req.params.post_id }, (err, request) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log(request);
    return res.status(200).json({ success: true, data: request });
  }).catch((err) => console.log(err));
};

updateResult = (req, res) => {
  console.log("here boy");
  console.log(req.body.value, req.params._id);
  Request.findByIdAndUpdate(
    req.params._id,
    { $set: { accepted: req.body.value } },
    (err, temp) => {
      if (err) return res.status(404).json({ success: false, error: err });
      return res.status(200).json({ success: true, data: temp });
    }
  );
};

module.exports = {
  apply,
  getApplicantsByPostId,
  updateResult,
};
