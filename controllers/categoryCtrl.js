//  Begin Date: 2020/05/24  Sun
const Category = require("../models/category");

exports.getRootCategories = async function(req, res) {
    var errors = {};
    await Category.find({ ancestors: [] })
        .sort({ name: 1 })
		.then(results => {
			if(results.length == 0) {
				errors.noResult = "No list.";
				return res.status(404).json(errors);
			} else {
				res.json(results);
			}
		})
		.catch(err => {
			errors.dbErr = "Sorry. DB management issue occured. Please try again.";
			return res.status(500).json(errors);
		});
}

exports.getSubCategories = async function(req, res) {
	var errors = {},
		_id = req.params._id;
	await Category.find({ parent: _id })
		.sort({ name: 1 })
		.then(results => {
			if(results.length == 0) {
				errors.noResult = "No list.";
				return res.status(404).json(errors);
			} else {
				res.json(results);
			}
		})
		.catch(err => {
			errors.dbErr = "Sorry. DB management issue occured. Please try again.";
			return res.status(500).json(errors);
		});
}