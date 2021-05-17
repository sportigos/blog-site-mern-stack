//  Begin Date: 2020/05/24  Sun
const express = require("express");
const router = express.Router();

const tagCtrl = require("../../controllers/tagCtrl");

router.post("/getAllTags", tagCtrl.getAllTags);

module.exports = router;