const multer = require("multer");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

const { fileModel } = require("../models/file");

const server = process.env.SERVER_URL;

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "files");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${slugify(file.originalname, { lower: true })}`);
    },
  }),
});

const diskStorage = upload.single("files");

const diskUploader = (file) => {
  console.log(file);
  return fileModel.create({ url: server + "/" + file.path });
};

function getFile(fileName, onData, onError) {
  const fullPath = path.join(path.resolve("./files"), fileName);

  fs.exists(fullPath, function (exists) {
    if (!exists) {
      return onError({ message: "File not exist" });
    }
    fileStream.pipe(onData);
  });
}

module.exports = { diskStorage, diskUploader, getFile };
