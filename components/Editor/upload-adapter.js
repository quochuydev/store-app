import axios from "@utils/axios";

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("files", file);
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/files`,
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
