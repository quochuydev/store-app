import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKConfig, CKOnReady } from "./utils";

const Editor = ({ initValue, readOnly, onData }) => {
  const handleChange = (evt, editor) => {
    onData(editor.getData());
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={initValue}
      onReady={CKOnReady}
      config={CKConfig}
      onChange={handleChange}
    />
  );
};

export default Editor;
