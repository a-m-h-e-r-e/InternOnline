const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  //   console.log(data);
  let errors = {}; // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.field = !isEmpty(data.field) ? data.field : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.start_date = !isEmpty(data.start_date) && !null ? data.start_date : "";
  data.end_date = !isEmpty(data.end_date) && !null ? data.end_date : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.field)) {
    errors.field = "Field field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (Validator.isEmpty(data.start_date)) {
    errors.start_date = "Starting date field is required";
  }
  if (Validator.isEmpty(data.end_date)) {
    errors.end_date = "Starting date field is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
