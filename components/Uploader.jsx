import React from "react";
import axios from "@utils/axios";

export default function Uploader(props) {
  return (
    <input
      type="file"
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

          props.onSuccess && props.onSuccess(result?.data);
        } catch (error) {
          props.onError && props.onError(error);
        }
      }}
    />
  );
}
