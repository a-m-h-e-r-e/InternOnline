const Joi = require("@hapi/joi");

const username = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
});
const password = Joi.object({
  password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
});

const email = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
// const schema = Joi.object({
//   username: Joi.string().alphanum().min(3).max(30).required(),

//   password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

//   repeat_password: Joi.ref("password"),

//   access_token: [Joi.string(), Joi.number()],

//   birth_year: Joi.number().integer().min(1900).max(2013),

//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   }),
// })
//   .with("username", "birth_year")
//   .xor("password", "access_token")
//   .with("password", "repeat_password");

// const { error, value } = schema.validate({
//   username: "abc",
//   birth_year: 1994,
//   password: "amir",
//   repeat_password: "mir",
// });
console.log("amir" && "f" && "");

const validate = { username, email, password };
// export default validate;
