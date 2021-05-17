const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function signInValid(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "Please input correct email.";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Please input email.";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Please input password.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
