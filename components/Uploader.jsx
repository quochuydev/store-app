import React from "react";
import axios from "@utils/axios";

export default function Uploader(props) {
  const { id, onSuccess, onError } = props;

  return (
    <input
      type="file"
      id={id}
      name={id}
      className="sr-only"
      onChange={async (event) => {
        try {
          const file = event.target?.files[0];
          const formData = new FormData();
          formData.append("files", file);

          const result = await axios({
            method: "post",
            url: `api/files`,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          });

          console.log(result?.data);
          onSuccess && onSuccess(result?.data);
        } catch (error) {
          onError && onError(error);
        }
      }}
    />
  );
}
