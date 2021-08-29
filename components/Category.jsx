/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";

export default function Category() {
  return (
    <section className="category" id="category">
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
