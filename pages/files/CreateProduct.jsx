import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../utils/config";

export default function CreateProduct({ image }) {
  const title = "title" + String(Math.floor(Math.random() * 10000000));
  const price = Math.floor(Math.random() * 100) * 1000;

  const [data, setData] = useState({
    title,
    price,
    original_price: price,
    // image: image || `https://ui-avatars.com/api/?name=${title}&size=500`,
    image: image || `https://picsum.photos/500`,
    description: "description" + String(Math.floor(Math.random() * 10000000)),
  });

  useEffect(() => {
    if (image) {
      onData("image", image);
    }
  }, [image]);

  const onData = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onCreateProduct = async () => {
    await axios.post(`${config.server}/api/products`, data);
    toast("success");
  };

  return (
    <>
      <ToastContainer />

      <b>title</b>
      <input
        value={data.title}
        onChange={(e) => onData("title", e.target.value)}
      />
      <br />

      <b>price</b>
      <input
        type="number"
        value={data.price}
        onChange={(e) => onData("price", e.target.value)}
      />
      <br />

      <b>original_price</b>
      <input
        type="number"
        value={data.original_price}
        onChange={(e) => onData("original_price", e.target.value)}
      />
      <br />

      <b>description</b>
      <input
        value={data.description}
        onChange={(e) => onData("description", e.target.value)}
      />
      <br />

      <b>image</b>
      <input
        value={data.image}
        onChange={(e) => onData("image", e.target.value)}
      />
      <p>{image}</p>

      <button onClick={onCreateProduct}>create product</button>
    </>
  );
}
