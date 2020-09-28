const Post = require("../models/post");
const RequestNumbers = require("../models/requestnumbers");
const validatePost = require("../validation/post");

addPost = (req, res) => {
  const body = req.body;
  console.log(">>>>>>>>>>>> " + body.company_id);
  const { errors, isValid } = validatePost(req.body); // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findOne({ title: req.body.title })
    .then((post) => {
      // console.log(">>>>>>>>>>>> " + post);
      if (post) {
        return res.status(400).json({ title: "Post already exists" });
      } else {
        const post = new Post(body);

        if (!post) {
          return res.status(400).json({ success: false, error: err });
        }

        post
          .save()
          .then(() => {
            const requestnumbers = new RequestNumbers({
              post_id: post._id,
            }).save();
            return res.status(201).json({
              success: true,
              id: post._id,
              message: "Post created!",
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(400).json({
              error,
              message: "Post not created!",
            });
          });
      }
    })
    .catch((err) => console.log(">>>>>>>>>>> " + err));
  //   console.log(body);
};

getPosts = async (req, res) => {
  const company_id = req.params.company_id;
  let result;
  // console.log(company_id);
  if (company_id === undefined) return;
  await Post.find({ company_id: company_id }, async (err, post) => {
    // console.log("why " + post);
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    result = post;
  }).catch((err) => console.log(err));

  RequestNumbers.find({}, (err, rn) => {
    let temp = result.map((resItem, resInd) => {
      for (let reqIndex = 0; reqIndex < rn.length; reqIndex++) {
        if (rn[reqIndex].post_id.toString() === resItem._id.toString()) {
          return { ...resItem._doc, applicants: rn[reqIndex].numbers };
        }
      }
    });
    return res.status(200).json({ success: true, data: temp });
  }).catch((err) => console.log(err));

  // console.log(result);

  // console.log(temp);
};

getPostById = (req, res) => {
  Post.findOne({ _id: req.params.post_id }, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    console.log(post);
    return res.status(200).json({ success: true, data: post });
  }).catch((err) => console.log(err));
};

updatePost = async (req, res) => {
  const body = req.body;
  const { errors, isValid } = validatePost(req.body); // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Post.findOne({ _id: req.params.post_id }, (err, post) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Post not found!",
      });
    }
    Post.findOne({ title: body.title }, (tErr, tPost) => {
      if (tPost && post.title !== tPost.title) {
        return res.status(400).json({ title: "Post already exists" });
      } else {
        post.title = body.title;
        post.field = body.field;
        post.location = body.location;
        post.start_date = body.start_date;
        post.end_date = body.end_date;
        post.description = body.description;
        // post.rating = body.rating
        post
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: post._id,
              message: "Post updated!",
            });
          })
          .catch((error) => {
            return res.status(404).json({
              error,
              message: "Post not updated!",
            });
          });
      }
    });
    // post = body;
  });
};

deletePost = async (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>> = " + req.params.post_id);
  await Post.findOneAndDelete({ _id: req.params.post_id }, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!post) {
      return res.status(404).json({ success: false, error: `Post not found` });
    }

    return res.status(200).json({ success: true, data: post });
  }).catch((err) => console.log(err));
};

getAllPosts = async (req, res) => {
  // let temp = Post.find().sort({ $natural: -1 });
  let result;
  await Post.find({}, (err, post) => {
    console.log(">>>>>>>>>>>>>>>>>>> " + post);
    result = post;
    // return res.status(200).json({ success: true, data: post });
  })
    .sort({ $natural: -1 })
    .catch((err) =>
      res.status(404).json({ success: false, error: "Post not found" })
    );
  RequestNumbers.find({}, (err, rn) => {
    let temp = result.map((resItem, resInd) => {
      for (let reqIndex = 0; reqIndex < rn.length; reqIndex++) {
        if (rn[reqIndex].post_id.toString() === resItem._id.toString()) {
          return { ...resItem._doc, applicants: rn[reqIndex].numbers };
        }
      }
    });
    return res.status(200).json({ success: true, data: temp });
  }).catch((err) => console.log(err));
};

searchPosts = async (req, res) => {
  let searchKey1 = req.params.term.toString().split(",")[0];

  // let searchKey2 = req.params.term.toString().split(",")[1];
  // console.log(">>>>>>>>>>>>>>  " + searchKey1.split(",")[0]);
  let result = [];
  await Post.find(
    { name: { $regex: searchKey1, $options: "$i" } },
    (err, post) => {
      result = [...result, ...post];
    }
  );
  await Post.find(
    { title: { $regex: searchKey1, $options: "$i" } },
    (err, post) => {
      result = [...result, ...post];
    }
  );

  await Post.find(
    { location: { $regex: searchKey1, $options: "$i" } },
    (err, post) => {
      result = [...result, ...post];
    }
  );
  console.log("here " + searchKey1 + " " + result);
  return res.status(200).json({ success: true, data: result });
};

// searchPosts = async (req, res) => {
//   let result = [];
//   console.log("sup " + term);
//   await Post.find({ title: term }, (err, post) => {
//     result = [...result, ...post];
//   });
//   await Post.find({ name: req.params.term }, (err, npost) => {
//     result = [...result, ...npost];
//     console.log(result);
//   });
//   await Post.find({ field: req.params.term }, (err, fpost) => {
//     result = [...result, ...fpost];
//   });
//   await Post.find({ location: req.params.term }, (err, lpost) => {
//     result = [...result, ...lpost];
//   });
//   console.log(result);
//   return res.status(200).json({ success: true, data: result });
// };

module.exports = {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getAllPosts,
  searchPosts,
};
