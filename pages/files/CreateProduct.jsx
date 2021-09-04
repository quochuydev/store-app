import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct({ image }) {
  console.log(image);

  const title = "title" + String(Math.floor(Math.random() * 10000000));
  const price = Math.floor(Math.random() * 100) * 1000;

  const [data, setData] = useState({
    title,
    price,
    original_price: price,
    image: image || `https://ui-avatars.com/api/?name=${title}&size=500`,
    description: "description" + String(Math.floor(Math.random() * 10000000)),
  });

  const onData = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onCreateProduct = async () => {
    await axios.post(process.env.SERVER_URL + "/api/products", data);
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

      <b>description</b>
      <input
        value={data.description}
        onChange={(e) => onData("description", e.target.value)}
      />
      <br />

      <b>image</b>
      <p>{image}</p>
      <button onClick={onCreateProduct}>create product</button>
    </>
  );
}
