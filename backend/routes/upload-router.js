const express = require("express");

const UploadCtrl = require("../controllers/upload-ctrl");

const router = express.Router();

router.post("/upload/testcase", UploadCtrl.uploadTestCase);
// router.get("/users", ProblemCtrl.getProblems);

module.exports = router;
