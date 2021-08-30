import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputConfig from "../../components/Setting/InputConfig";
import ItemsConfig from "../../components/Setting/ItemsConfig";

export default function Files() {
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [setting, setSetting] = useState({});

  const fetchFiles = () => {
    axios.get(process.env.SERVER_URL + "/api/files").then((result) => {
      setFiles(result?.data?.items || []);
    });
  };

  useEffect(() => {
    axios.get(process.env.SERVER_URL + "/api/setting").then((result) => {
      setSetting(result?.data || {});
    });
  }, []);

  useEffect(() => {
    fetchFiles();
  }, []);

  const onCreateProduct = async () => {
    await axios.post(process.env.SERVER_URL + "/api/products", {
      image,
    });
    toast("success");
  };

  const onCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const onSave = async (name, data) => {
    const result = await axios.put(
      process.env.SERVER_URL + "/api/setting/" + setting._id,
      { [name]: data }
    );
    toast("updated");
    return result;
  };

  return (
    <>
      <ToastContainer />
      <button onClick={onCreateProduct}>create product</button>
      <hr />
      <InputConfig
        setting={setting}
        name="banner"
        label="banner"
        initData={setting.banner}
        onSave={onSave}
      />
      <hr />
      <ItemsConfig
        setting={setting}
        name="contents"
        label="contents"
        initData={setting.contents}
        onSave={onSave}
      />
      <hr />
      <ItemsConfig
        setting={setting}
        name="categories"
        label="categories"
        initData={setting.categories}
        onSave={onSave}
      />
      <hr />

      <br />
      <input
        type="file"
        accept="image/*"
        onChange={async (event) => {
          try {
            const file = event.target?.files[0];
            console.log(file);
            const bodyFormData = new FormData();
            bodyFormData.append("files", file);

            const result = await axios({
              method: "post",
              url: process.env.SERVER_URL + "/api/files",
              headers: { "Content-Type": "multipart/form-data" },
              data: bodyFormData,
            });
            setImage(result?.data?.url);
          } catch (error) {
            //
          }
          fetchFiles();
        }}
      />

      {files.map((e, i) => (
        <ul key={i}>
          <li>{e._id}</li>
          <li onClick={() => onCopy(e.url)}>{e.url}</li>
        </ul>
      ))}
    </>
  );
}
