//  Begin Date: 2020/05/24  Sun
const express = require("express");
const router = express.Router();

const commentCtrl = require("../../controllers/commentCtrl");

router.post("/saveComment", commentCtrl.saveComment);
router.post("/searchComments/", commentCtrl.searchComments);
router.get("/getCommentsQuant/:post", commentCtrl.getCommentsQuant);
router.post("/setCommentLiker", commentCtrl.setCommentLiker);
router.post("/setCommentDisliker", commentCtrl.setCommentDisliker);

module.exports = router;