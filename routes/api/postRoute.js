//  Begin Date: 2020/05/24  Sun
const express = require("express");
const router = express.Router();

const postCtrl = require("../../controllers/postCtrl");

router.post("/createPost", postCtrl.createPost);
router.post("/getPosts", postCtrl.getPosts);
router.get("/getPost/:_id", postCtrl.getPost);
router.post("/getPostsOfCategory", postCtrl.getPostsOfCategory);
router.post("/searchPosts", postCtrl.searchPosts);
router.post("/setPostLiker", postCtrl.setPostLiker);
router.post("/setPostDisliker", postCtrl.setPostDisliker);

module.exports = router;