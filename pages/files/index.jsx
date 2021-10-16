import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputConfig from "../../components/Setting/InputConfig";
import ItemsConfig from "../../components/Setting/ItemsConfig";
import CreateProduct from "./CreateProduct";
import Uploader from "../../components/Uploader";
import config from "../../utils/config";

export default function Files() {
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [setting, setSetting] = useState({});

  const fetchFiles = () => {
    axios.get(`${process.env.SERVER_URL}/api/files`).then((result) => {
      setFiles(result?.data?.items || []);
    });
  };

  useEffect(() => {
    axios.get(process.env.SERVER_URL + "/api/settings").then((result) => {
      setSetting(result?.data || {});
    });
  }, []);

  useEffect(() => {
    fetchFiles();
  }, []);

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
      process.env.SERVER_URL + "/api/settings/" + setting._id,
      { [name]: data }
    );
    toast("updated");
    return result;
  };

  return (
    <>
      <ToastContainer />
      <Link href="/">Home</Link>
      <CreateProduct {...{ image }} />
      <hr />

      <Uploader
        onSuccess={async (result) => {
          setImage(result?.url);
          fetchFiles();
        }}
      />

      {files.map((e, i) => (
        <ul key={i}>
          <li>{e._id}</li>
          <li onClick={() => onCopy(e.url)}>{e.url}</li>
        </ul>
      ))}

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
      <p>{JSON.stringify(config)}</p>
    </>
  );
}
