import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./upload-adapter";
import config from "@utils/config";

const Editor = ({ initValue, readOnly, onData }) => {
  const handleChange = (evt, editor) => {
    onData(editor.getData());
  };

  const onReady = (editor) => {
    if (!editor) {
      return;
    }

    editor.plugins.get("FileRepository").createUploadAdapter = function (
      loader
    ) {
      return new UploadAdapter(loader);
    };
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={initValue}
      onReady={onReady}
      config={{
        basicEntities: false,
        ckfinder: {
          uploadUrl: `${config.server}/files`,
        },
      }}
      onChange={handleChange}
    />
  );
};

export default Editor;
