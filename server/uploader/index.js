const { diskStorage, diskUploader, getFile } = require("./minio");

module.exports = {
  storage: diskStorage,
  uploader: diskUploader,
  getFile,
};
