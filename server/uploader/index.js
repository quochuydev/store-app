const { diskStorage, diskUploader } = require("./local");
const { cloudStorage, cloudUploader } = require("./google");

module.exports = { storage: cloudStorage, uploader: cloudUploader };
