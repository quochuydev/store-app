const multer = require("multer");
const slugify = require("slugify");
var Minio = require("minio");

const { fileModel } = require("../models/file");

const server = process.env.SERVER_URL;

var minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  // secure: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const diskStorage = multer({ storage: multer.memoryStorage() }).single("files");

const diskUploader = (file) => {
  const fileName = Date.now() + "_" + file.originalname;

  minioClient.putObject(
    "grocery",
    fileName,
    file.buffer,
    function (error, result) {
      if(error) {
        throw error
      }
      return fileModel.create({
        fileName,
        url: server + "/files/" + fileName,
      });
    }
  );
};

function getFile(fileName, onData, onError) {
  minioClient.getObject("grocery", fileName, function (error, stream) {
    if (error) {
      return onError(error);
    }
    stream.pipe(onData);
  });
}

module.exports = { diskStorage, diskUploader, getFile };
