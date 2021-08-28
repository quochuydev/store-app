import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Category() {
  const [image, setImage] = useState(null);

  return (
    <section className="category" id="category">
      <button
        onClick={async () => {
          await axios.post(process.env.SERVER_URL + "/api/products", {
            image,
          });
          alert("success");
        }}
      >
        create product
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          try {
            const file = event.target?.files[0];
            console.log(file);
            var bodyFormData = new FormData();
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
        }}
      />
      <h1 className="heading">
        shop by <span>category</span>
      </h1>
      <div className="box-container">
        <div className="box">
          <h3>vegitables</h3>
          <p>upto 50% off</p>
          <img src="images/category-1.png" alt="" />
          <a href="#" className="btn">
            shop now
          </a>
        </div>
        <div className="box">
          <h3>juice</h3>
          <p>upto 44% off</p>
          <img src="images/category-2.png" alt="" />
          <a href="#" className="btn">
            shop now
          </a>
        </div>
        <div className="box">
          <h3>meat</h3>
          <p>upto 35% off</p>
          <img src="images/category-3.png" alt="" />
          <a href="#" className="btn">
            shop now
          </a>
        </div>
        <div className="box">
          <h3>fruite</h3>
          <p>upto 12% off</p>
          <img src="images/category-4.png" alt="" />
          <a href="#" className="btn">
            shop now
          </a>
        </div>
      </div>
    </section>
  );
}
