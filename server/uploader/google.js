const multer = require("multer");
const slugify = require("slugify");

const multerGoogleStorage = require("multer-cloud-storage");

const { fileModel } = require("../models/file");

const cloudUpload = multer({
  storage: multerGoogleStorage.storageEngine({
    acl: "publicRead",
    uniformBucketLevelAccess: false,
    destination: (req, file, cb) => {
      cb(null, "files");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${slugify(file.originalname, { lower: true })}`);
    },
  }),
});

const cloudStorage = cloudUpload.single("files");

const cloudUploader = (file) => {
  return fileModel.create({ url: file.linkUrl });
};

module.exports = { cloudStorage, cloudUploader };
