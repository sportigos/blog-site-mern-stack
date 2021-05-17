//  Begin Date:     2020/05/24  Sun
const express = require("express");
const router = express.Router();

var userCtrl = require("../../controllers/userCtrl");

router.post("/signUp", userCtrl.signUp);
router.post("/signIn", userCtrl.signIn);

module.exports = router;