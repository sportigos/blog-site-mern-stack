const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function signUpValid(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordConf = !isEmpty(data.passwordConf) ? data.passwordConf : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Please input name.";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Please input email.";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Please input correct email.";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Please input password.";
    }

    if (Validator.isEmpty(data.passwordConf)) {
        errors.passwordConf = "Please input password again.";
    }

    if (!Validator.equals(data.password, data.passwordConf)) {
        errors.passwordConf = "Please confirm password.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
