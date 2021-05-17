const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function postValid(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.parent = !isEmpty(data.parent) ? data.parent : "";

    if (Validator.isEmpty(data.title)) {
        errors.postTitle = "Please input title.";
    }

    if (Validator.isEmpty(data.parent)) {
        errors.parent = "Please select list.";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
