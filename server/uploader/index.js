const { diskStorage, diskUploader, getFile } = require("./local");

module.exports = {
  storage: diskStorage,
  uploader: diskUploader,
  getFile,
};
