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
  accessKey: "S9W42CAHHVBN3LGZC0LT",
  secretKey: "bgSiXPnXVjKV05zUYbRng91klKmlalbaPDa0XNVv",
});

const diskStorage = multer({ storage: multer.memoryStorage() }).single("files");

const diskUploader = (file) => {
  const fileName = Date.now() + "_" + file.originalname;

  minioClient.putObject(
    "grocery",
    fileName,
    file.buffer,
    function (error, { etag }) {
      return fileModel.create({
        fileName,
        url: server + "/files/" + fileName,
      });
    }
  );
};

function getFile(fileName, onError, onData) {
  minioClient.getObject("grocery", fileName, function (error, stream) {
    if (error) {
      return onError(error);
    }
    onData(stream);
  });
}

module.exports = { diskStorage, diskUploader, getFile };
