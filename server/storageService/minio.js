const multer = require("multer");
const Minio = require("minio");
const env = require("../env");
const { fileModel } = require("../models/file");

var minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  // secure: false,
  accessKey: "S9W42CAHHVBN3LGZC0LT",
  secretKey: "bgSiXPnXVjKV05zUYbRng91klKmlalbaPDa0XNVv",
});

const storage = multer({ storage: multer.memoryStorage() }).single("files");

const uploader = (file) => {
  const fileName = Date.now() + "_" + file.originalname;

  minioClient.putObject(
    "grocery",
    fileName,
    file.buffer,
    function (error, { etag }) {
      return fileModel.create({
        fileName,
        url: env.serverUrl + "/files/" + fileName,
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

module.exports = { storage, uploader, getFile };
