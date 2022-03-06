const multer = require("multer");
const slugify = require("slugify");
const fs = require("fs-extra");
const path = require("path");
const env = require("../env");
const { fileModel } = require("../models/file");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "files");
    },
    filename: function (req, file, cb) {
      // TODO datetime
      cb(null, `${Date.now()}-${slugify(file.originalname, { lower: true })}`);
    },
  }),
});

module.exports = {
  storage: upload.single("files"),
  uploader: (file) => {
    console.log(file);
    return fileModel.create({ url: `${env.serverUrl}/${file.path}` });
  },
  getFile: function getFile(fileName, onData, onError) {
    const fullPath = path.join(path.resolve("./files"), fileName);
    const stream = fs.createReadStream(fullPath);

    if (!fs.pathExistsSync(fullPath)) {
      return onError({ message: "File not exist" });
    }

    stream.pipe(onData);
  },
};
