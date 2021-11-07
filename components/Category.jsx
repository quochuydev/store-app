/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Category({ setting }) {
  return (
    <section className="category" id="category">
      <div className="box-container">
        {setting.categories?.map((item, i) => (
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
