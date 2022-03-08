import axios from "axios";
import config from "@utils/config";

export { CKConfig, CKUploadAdapter, CKOnReady };

const CKOnReady = (editor) => {
  if (!editor) {
    return;
  }

  editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
    return new CKUploadAdapter(loader);
  };
};

const CKConfig = {
  basicEntities: false,
  ckfinder: {
    uploadUrl: `${config.server}/api/files`,
  },
};

class CKUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("files", file);
    return new Promise((resolve, reject) => {
      axios({
        url: `${config.server}/api/files`,
        method: "post",
        data,
      })
        .then((res) => {
          var resData = res.data;
          console.log(resData);
          resData.default = resData.url;
          resolve(resData);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  abort() {}
}
