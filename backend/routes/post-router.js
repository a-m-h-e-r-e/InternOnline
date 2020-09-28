const express = require("express");
const PostCtrl = require("../controllers/post-ctrl");
const router = express.Router();

router.post("/addpost", PostCtrl.addPost);
router.get("/posts/:company_id", PostCtrl.getPosts);
router.get("/post/:post_id", PostCtrl.getPostById);
router.put("/post/:post_id", PostCtrl.updatePost);
router.delete("/post/:post_id", PostCtrl.deletePost);
router.get("/posts", PostCtrl.getAllPosts);
router.get("/searchposts/:term", PostCtrl.searchPosts);
module.exports = router;
