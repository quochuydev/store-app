const multer = require("multer");
const slugify = require("slugify");

const { fileModel } = require("./models/file");
const server = process.env.SERVER_URL;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${slugify(file.originalname, { lower: true })}`);
  },
});

const upload = multer({ storage });
const diskStorage = upload.single("files");

const uploader = (file) => {
  return fileModel.create({ url: server + "/" + file.path });
};

module.exports = { diskStorage, uploader };
