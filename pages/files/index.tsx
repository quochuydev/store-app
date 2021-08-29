import React, { useEffect, useState } from "react";
import axios from "axios";

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
    alert("success");
  };

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      <button onClick={onCreateProduct}>create product</button>
      <br />
      {JSON.stringify(setting)}
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={async (event: any) => {
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

      {files.map((e: any, i: number) => (
        <ul key={i}>
          <li>{e._id}</li>
          <li onClick={() => onCopy(e.url)}>{e.url}</li>
        </ul>
      ))}
    </>
  );
}
