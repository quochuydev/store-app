/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

export default function InputConfig(props) {
  const { setting, label = "", name, initData = {}, onSave } = props;

  const [data, setData] = useState(initData);

  useEffect(() => {
    if (initData) {
      setData(initData);
    }
  }, [initData]);

  const onData = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <h2>{label}</h2>
      <br />
      <img src={data.image} width={200} />
      <br />
      <label>title</label>
      <input
        value={data.title}
        onChange={(e) => onData("title", e.target.value)}
      />
      <label>description</label>
      <input
        value={data.description}
        onChange={(e) => onData("description", e.target.value)}
      />
      <label>image</label>
      <input
        value={data.image}
        onChange={(e) => onData("image", e.target.value)}
      />
      <label>url</label>
      <input value={data.url} onChange={(e) => onData("url", e.target.value)} />
      <br />
      <button onClick={() => onSave(name, data)}>save</button>
    </div>
  );
}
