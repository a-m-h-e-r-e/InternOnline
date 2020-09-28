var multer = require("multer");
var fs = require("fs");

uploadTestCase = (req, res) => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("here i am " + req.body.id);
      const path = "static/testCases/";
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const filename = req.body.id;
      cb(null, /* Date.now() + "-"*/ filename);
    },
  });

  let upload = multer({ storage: storage }).single("file");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file.path);
  });
};

module.exports = {
  uploadTestCase,
};
