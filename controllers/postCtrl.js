//  Begin Date: 2020/05/25  Mon
const Post      = require("../models/post");
const User      = require("../models/user");
const Tag       = require("../models/tag");
const Category  = require("../models/category");
const Comment   = require("../models/comment");

const postValid = require("../validation/post");

exports.createPost = async function(req, res) {
    var { errors, isValid } = postValid(req.body),
        postData = { tags: [] };
    if (!isValid) {
        return res.status(400).json(errors);
    }
    postData.title = req.body.title;
    postData.parent = req.body.parent;
    postData.content = req.body.content;
    postData.user = req.body.user;
    var tags = req.body.tags;

    await User.findById(postData.user)
        .then(async result => {
            await User.findByIdAndUpdate(
                    postData.user,
                    { postCount: result.postCount + 1 }
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
    
    await Category.findById(postData.parent, { _id: 0, ancestors: 1 })
        .then(async result => {
            if(result) {
                postData.ancestors = result.ancestors;
                await postData.ancestors.push(postData.parent);
            } else {
                errors.dbErr = "Sorry. DB error occured. Please try again.";
                return res.status(500).json(errors);
            }
        })
        .catch(err => {
            errors.dbErr = "Sorry. DB error occured. Please try again.";
            return res.status(500).json(errors);
        });
    
	if(tags != "") {
        if(tags.indexOf(",") >= 0) {
            var tagsArray = tags.split(",");
            for(let i=0; i<tagsArray.length; i++) {
                if(tagsArray[i].trim() != "") {
                    await Tag.findOne({ name: tagsArray[i].trim() })
                        .then(async result_2 => {
                            if(result_2) {
                                await postData.tags.push({ tag: result_2._id });
                            } else {
                                await new Tag({ name: tagsArray[i].trim() })
                                    .save()
                                    .then(async result_3 => {
                                        await postData.tags.push({ tag: result_3._id });
                                    })
                                    .catch(err => {
                                        errors.dbErr = "Sorry. DB error occured. Please try again.";
                                        return res.status(500).json(errors);
                                    });
                            }
                        })
                        .catch(err => {
                            errors.dbErr = "Sorry. DB error occured. Please try again.";
                            return res.status(500).json(errors);
                        });
                }
            }
            await new Post(postData)
                .save()
                .then(result_4 => {
                })	
                .catch(err => {
                    errors.dbErr = "Sorry. DB error occured. Please try again.";
                    return res.status(500).json(errors);
                });
        
		} else {    
            await Tag.findOne({ name: tags })
                .then(async result_2 => {
                    if(result_2) {
                        await postData.tags.push({ tag: result_2._id });
                    } else {
                        await new Tag({ name: tags })
                            .save()
                            .then(async result_3 => {
                                await postData.tags.push({ tag: result_3._id });
                            })
                            .catch(err => {
                                errors.dbErr = "Sorry. DB error occured. Please try again.";
                                return res.status(500).json(errors);
                            });
                    }
                })
                .catch(err => {
                    errors.dbErr = "Sorry. DB error occured. Please try again.";
                    return res.status(500).json(errors);
                });
            
            await new Post(postData)
                .save()
                .then(result_4 => {})	
                .catch(err => {
                    errors.dbErr = "Sorry. DB error occured. Please try again.";
                    return res.status(500).json(errors);
                });
        }
    } else {
        await new Post(postData)
            .save()
            .then()	
            .catch(err => {
                errors.dbErr = "Sorry. DB error occured. Please try again.";
                return res.status(500).json(errors);
            });
    }
    var pageSize = req.body.pageSize,
        currentPage = req.body.currentPage;
    await Post.find()
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize*currentPage-pageSize)
        .populate("user", ["name", "email"])
        .populate("tags.tag", "name")
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.log(err);
			errors.dbErr = "Sorry. DB error occured. Please try again.";
			return res.status(500).json(errors);
        });
}

exports.getPosts = async function(req, res) {
    var pageSize = req.body.pageSize,
        currentPage = req.body.currentPage,
        resData = {},
        errors = {};
    resData.dataQuant = await Post.find().countDocuments().exec();
    resData.data = await Post.find()
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize*currentPage-pageSize)
        .populate("user", ["name", "email"])
        .populate("tags.tag", "name")
        .exec();
    res.json(resData);
}

exports.getPost = async function(req, res) {
    var _id = req.params._id,
        resData = {},
        errors = {};
    
    await Post.findById(_id)
        .then(async result => {
            if(result) {
                await Post.findByIdAndUpdate(
                        _id,
                        { $set: { visitCount: result.visitCount+1 } }
                    )
                    .then()
                    .catch(err => {
                        errors.dbErr = "Sorry. DB error occured. Please try again.";
                        return res.status(500).json(errors);
                    });
            } else {
                errors.noResult = "Sorry. DB error occured. Please try again.";
                return res.status(404).json(errros);
            }
        })
        .catch(err => {
            errors.dbErr = "Sorry. DB error occured. Please try again.";
            return res.status(500).json(errors);
        });
        
    resData.post = await Post.findById(_id)
        .populate("user", ["name", "email"])
        .populate("tags.tag", "name")
        .exec();
    resData.comments = await Comment.find({ post: _id })
        .sort({ createdAt: -1 })
        .populate("user", ["name", "email"])
        .exec();
    res.json(resData);
}

exports.getPostsOfCategory = async function(req, res) {
    var pageSize = req.body.pageSize,
        currentPage = req.body.currentPage,
        categoryId = req.body.categoryId,
        resData = {},
        errors = {};
    resData.dataQuant = await Post.find({ ancestors: categoryId }).countDocuments().exec();
    resData.data = await Post.find({ ancestors: categoryId })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize*currentPage-pageSize)
        .populate("user", ["name", "email"])
        .populate("tags.tag", "name")
        .exec();
    res.json(resData);
}

exports.searchPosts = async function(req, res) {
    var key = new RegExp(req.body.key),
        pageSize = req.body.pageSize,
        currentPage = req.body.currentPage,
        resData = {},
        errors = {};
    resData.dataQuant = await Post.find({ 
            $or: [
                { title: key },
                { content: key }
            ] 
        }).countDocuments().exec();
    resData.data = await Post.find({ 
            $or: [
                { title: key },
                { content: key }
            ]
        })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize*currentPage-pageSize)
        .populate("user", ["name", "email"])
        .populate("tags.tag", "name")
        .exec();
    res.json(resData);
}

exports.setPostLiker = async function(req, res) {
    var errors = {};
    var originLikers = await Post.findById(req.body._id, { _id: 0, likers: 1 }).exec();
    await originLikers.likers.push(req.body.liker);
    await Post.findByIdAndUpdate(
            req.body._id,
            {
                $set: { likers: originLikers.likers }
            }
        )
        .exec();
    await Post.findById(req.body._id)
        .populate("user", ["name", "email"])
        .populate("tags.tag", "name")
        .then(async result => {
            await res.json(result);
        })
        .catch(err => {
            errors.dbErr = "Sorry. DB error occured. Please try again.";
            return res.status(500).json(errors);
        });
}

exports.setPostDisliker = async function(req, res) {
    var errors = {};
    var originDislikers = await Post.findById(req.body._id, { _id: 0, dislikers: 1 }).exec();
    await originDislikers.dislikers.push(req.body.disliker);
    await Post.findByIdAndUpdate(
            req.body._id,
            {
                $set: { dislikers: originDislikers.dislikers }
            }
        )
        .exec();
    await Post.findById(req.body._id)
        .populate("user", ["name", "email"])
        .populate("tags.tag", "name")
        .then(async result => {
            await res.json(result);
        })
        .catch(err => {
            errors.dbErr = "Sorry. DB error occured. Please try again.";
            return res.status(500).json(errors);
        });
} 