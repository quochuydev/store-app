/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import config from "../utils/config";

export default function Category({ setting }) {
  return (
    <section className="category" id="category">
      <h1 className="heading">
        shop by <span>category</span>
      </h1>
      <div className="box-container">
        {setting.categories.map((item, i) => (
          <div key={i} className="box">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={item.image} alt="" />
            <a href={item.url} className="btn">
              shop now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
