import React, { useState, useEffect } from "react";

export default function ItemsConfig(props) {
  const { setting, label = "", name, initData, onSave } = props;

  const df = {
    title: "",
    description: "",
    image: "",
    url: "#",
  };

  const [data, setData] = useState(initData);

  useEffect(() => {
    if (initData) {
      setData(initData);
    }
  }, [initData]);

  const onData = (index, name, value) => {
    const newData = data.map((e, i) =>
      i === index ? { ...e, [name]: value } : e
    );
    setData(newData);
  };

  const onAdd = () => {
    setData([...initData, df]);
  };

  return (
    <div>
      <p>{label}</p>
      <br />
      <button onClick={onAdd}>Add</button>
      <br />
      {data?.map((item, i) => (
        <div key={i}>
          <label>title</label>
          <input
            value={item.title}
            onChange={(e) => onData(i, "title", e.target.value)}
          />

          <label>description</label>
          <input
            value={item.description}
            onChange={(e) => onData(i, "description", e.target.value)}
          />

          <label>image</label>
          <input
            value={item.image}
            onChange={(e) => onData(i, "image", e.target.value)}
          />

          <label>url</label>
          <input
            value={item.url}
            onChange={(e) => onData(i, "url", e.target.value)}
          />
        </div>
      ))}

      <br />
      <button onClick={() => onSave(name, data)}>save</button>
    </div>
  );
}
