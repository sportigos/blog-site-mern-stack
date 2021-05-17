//  Begin Date: 2020/05/24  Sun
const express = require("express");
const router = express.Router();

const categoryCtrl = require("../../controllers/categoryCtrl");

router.get("/getRootCategories", categoryCtrl.getRootCategories);
router.get("/getSubCategories/:_id", categoryCtrl.getSubCategories);

module.exports = router;