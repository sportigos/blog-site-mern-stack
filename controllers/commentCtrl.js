//  Begin Date: 2020/05/26  Tue
const Comment   = require("../models/comment");
const User      = require("../models/user");

exports.saveComment = async function (req, res) {
    var commentData = {},
        errors = {};
    commentData.content = req.body.content;
    commentData.user = req.body.user;
    commentData.post = req.body.post;
    await User.findById(commentData.user)
		.then(async result => {
			await User.findByIdAndUpdate(
					commentData.user,
					{ commentCount: result.commentCount + 1 }
				)
				.then()
				.catch(err => {
					errors.dbErr = "Sorry. DB error occured. Please try again.";
					return res.status(500).json(errors);
				});
		})
		.catch(err => {
			errors.dbErr = "Sorry. DB error occured. Please try again.";
			return res.status(500).json(errors);
        });
    if(req.body.parent) {
        commentData.parent = req.body.parent;
        commentData.ancestors = [];
        await Comment.findById(req.body.parent)
            .then(async result => {
                if(result) {
                    if(result.ancestors.length != 0) {
                        await commentData.ancestors.push(...result.ancestors, req.body.parent);
                    } else {
                        await commentData.ancestors.push(req.body.parent);
                    }
                } else {
                    errors.noResult = "Sorry. The answer you are trying to reply is just deleted. Answer to anower replies.";
                    return res.status(404).json(errors);
                }
            })
            .catch(err => {
                errors.dbErr = "Sorry. DB error occured. Please try again.";
                return res.status(500).json(errors);
            });
        await new Comment(commentData)
            .save()
            .then()
            .catch(err => {
                errors.dbErr = "Sorry. DB error occured. Please try again.";
                return res.status(500).json(errors);
            });
    } else {
        await new Comment(commentData)
            .save()
            .then()
            .catch(err => {
                errors.dbErr = "Sorry. DB error occured. Please try again.";
                return res.status(500).json(errors);
            });
    }
    await Comment.find({ post: commentData.post })
        .sort({ createdAt: -1 })
		.populate("user")
		.then(results => {
			if(results.length == 0) {
				errors.noResult = "No replies for this blog.";
				return res.status(404).json(errors);
			} else {
				res.json(results);
			}
		})
		.catch(err => {
			errors.dbErr = "Sorry. DB error occured. Please try again.";
			return res.status(500).json(errors);
		});
}

exports.searchComments = async function(req, res) {
    var errors = {};
    if(req.body.key == "") {
        await Comment.find({ post: req.body.post })
            .populate("user")
            .then(results => {
                res.json(results);
            })
            .catch(err => {
                errors.dbErr = "Sorry. DB error occured. Please try again.";
                return res.status(500).json(errors);
            });
    } else {
        var key = new RegExp(req.body.key);
        await Comment.find({ content: key, post: req.body.post })
            .sort({ createdAt: -1 })
            .populate("user")
            .then(results => {
                res.json(results);
            })
            .catch(err => {
                errors.dbErr = "Sorry. DB error occured. Please try again.";
                return res.status(500).json(errors);
            });
    }
}

exports.getCommentsQuant = async function(req, res) {
    var errors = {};
    await Comment.find({ post: req.params.post })
        .countDocuments()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            errors.dbErr = "Sorry. DB error occured. Please try again.";
            return res.status(500).json(errors);
        });
}

exports.setCommentLiker = async function(req, res) {
    var errors = {};
    var originLikers = await Comment.findById(req.body._id, { _id: 0, likers: 1 }).exec();
    await originLikers.likers.push(req.body.liker);
    await Comment.findByIdAndUpdate(
            req.body._id,
            {
                $set: { likers: originLikers.likers }
            }
        )
        .exec();
    await Comment.find({ post: req.body.post })
        .sort({ createdAt: -1 })
        .populate("user", ["name", "email"])
        .then(async result => {
            await res.json(result);
        })
        .catch(err => {
            errors.dbErr = "Sorry. DB error occured. Please try again.";
            return res.status(500).json(errors);
        });
}

exports.setCommentDisliker = async function(req, res) {
    var errors = {};
    var originDislikers = await Comment.findById(req.body._id, { _id: 0, dislikers: 1 }).exec();
    await originDislikers.dislikers.push(req.body.disliker);
    await Comment.findByIdAndUpdate(
            req.body._id,
            {
                $set: { dislikers: originDislikers.dislikers }
            }
        )
        .exec();
    await Comment.find({ post: req.body.post })
        .sort({ createdAt: -1 })
        .populate("user", ["name", "email"])
        .then(async result => {
            await res.json(result);
        })
        .catch(err => {
            errors.dbErr = "Sorry. DB error occured. Please try again.";
            return res.status(500).json(errors);
        });
} 