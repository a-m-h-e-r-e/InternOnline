const express = require("express");
const PostCtrl = require("../controllers/request-ctrl");
const router = express.Router();

router.post("/apply", PostCtrl.apply);
router.get("/getapplicants/:post_id", PostCtrl.getApplicantsByPostId);
router.post("/result/:_id", PostCtrl.updateResult);
module.exports = router;
