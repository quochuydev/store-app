import React, { useState, useEffect } from 'react';
import axios from "axios";

import Product from "./Product";

export default function Home({ products }){
  const [cart, setCart] = useState({})

  useEffect(() => {
    axios.get("http://localhost:3000/cart")
      .then(result => setCart(result?.data));
  }, [])
  
  return <div>
    <header>
      <div className="header-1">
        <a href="#" className="logo"><i className="fas fa-shopping-basket" />groco</a>
        <form className="search-box-container">
          <input type="search" id="search-box" placeholder="search here..." />
          <label htmlFor="search-box" className="fas fa-search" />
        </form>
      </div>
      <div className="header-2">
        <div id="menu-bar" className="fas fa-bars" />
        <nav className="navbar">
          <a href="#home">home</a>
          <a href="#category">category</a>
          <a href="#product">product</a>
          <a href="#deal">deal</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="icons">
          {cart.item_count}
          <a href="#" className="fas fa-shopping-cart" />
          <a href="#" className="fas fa-heart" />
          <a href="#" className="fas fa-user-circle" />
        </div>
      </div>
    </header>
    {/* header section ends */}
    {/* home section starts  */}
    <section className="home" id="home">
      <div className="image">
        <img src="images/home-img.png" alt="" />
      </div>
      <div className="content">
        <span>fresh and organic</span>
        <h3>your daily need products</h3>
        <a href="#" className="btn">get started</a>
      </div>
    </section>
    {/* home section ends */}
    {/* banner section starts  */}
    <section className="banner-container">
      <div className="banner">
        <img src="images/banner-1.jpg" alt="" />
        <div className="content">
          <h3>special offer</h3>
          <p>upto 45% off</p>
          <a href="#" className="btn">check out</a>
        </div>
      </div>
      <div className="banner">
        <img src="images/banner-2.jpg" alt="" />
        <div className="content">
          <h3>limited offer</h3>
          <p>upto 50% off</p>
          <a href="#" className="btn">check out</a>
        </div>
      </div>
    </section>
    {/* banner section ends */}
    {/* category section starts  */}
    <section className="category" id="category">
      <h1 className="heading">shop by <span>category</span></h1>
      <div className="box-container">
        <div className="box">
          <h3>vegitables</h3>
          <p>upto 50% off</p>
          <img src="images/category-1.png" alt="" />
          <a href="#" className="btn">shop now</a>
        </div>
        <div className="box">
          <h3>juice</h3>
          <p>upto 44% off</p>
          <img src="images/category-2.png" alt="" />
          <a href="#" className="btn">shop now</a>
        </div>
        <div className="box">
          <h3>meat</h3>
          <p>upto 35% off</p>
          <img src="images/category-3.png" alt="" />
          <a href="#" className="btn">shop now</a>
        </div>
        <div className="box">
          <h3>fruite</h3>
          <p>upto 12% off</p>
          <img src="images/category-4.png" alt="" />
          <a href="#" className="btn">shop now</a>
        </div>
      </div>
    </section>
    {/* category section ends */}
    {/* product section starts  */}
    <section className="product" id="product">
      <h1 className="heading">latest <span>products</span></h1>
      <div className="box-container">
        {products.map((e, i) => <Product key={i} product={e} />)}
      </div>
    </section>
    {/* product section ends */}
    {/* deal section starts  */}
    <section className="deal" id="deal">
      <div className="content">
        <h3 className="title">deal of the day</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam possimus voluptates commodi laudantium! Doloribus sint voluptatibus quaerat sequi suscipit nulla?</p>
        <div className="count-down">
          <div className="box">
            <h3 id="day">00</h3>
            <span>day</span>
          </div>
          <div className="box">
            <h3 id="hour">00</h3>
            <span>hour</span>
          </div>
          <div className="box">
            <h3 id="minute">00</h3>
            <span>minute</span>
          </div>
          <div className="box">
            <h3 id="second">00</h3>
            <span>second</span>
          </div>
        </div>
        <a href="#" className="btn">check the deal</a>
      </div>
    </section>
    {/* deal section ends */}
    {/* contact section starts  */}
    <section className="contact" id="contact">
      <h1 className="heading"> <span>contact</span> us </h1>
      <form>
        <div className="inputBox">
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
        </div>
        <div className="inputBox">
          <input type="number" placeholder="number" />
          <input type="text" placeholder="subject" />
        </div>
        <textarea placeholder="message" cols={30} rows={10} defaultValue={""} />
        <input type="submit" defaultValue="send message" className="btn" />
        <button onClick={()=> {
           axios.post("http://localhost:3000/api/products");
        }}>create product</button>
      </form>
    </section>
    {/* contact section ends */}
    {/* newsletter section starts  */}
    <section className="newsletter">
      <h3>subscribe us for latest updates</h3>
      <form>
        <input className="box" type="email" placeholder="enter your email" />
        <input type="submit" defaultValue="subscribe" className="btn" />
      </form>
    </section>
    {/* newsletter section ends */}
    {/* footer section starts  */}
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <a href="#" className="logo"><i className="fas fa-shopping-basket" />groco</a>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam culpa sit enim nesciunt rerum laborum illum quam error ut alias!</p>
          <div className="share">
            <a href="#" className="btn fab fa-facebook-f" />
            <a href="#" className="btn fab fa-twitter" />
            <a href="#" className="btn fab fa-instagram" />
            <a href="#" className="btn fab fa-linkedin" />
          </div>
        </div>
        <div className="box">
          <h3>our location</h3>
          <div className="links">
            <a href="#">india</a>
            <a href="#">USA</a>
            <a href="#">france</a>
            <a href="#">japan</a>
            <a href="#">russia</a>
          </div>
        </div>
        <div className="box">
          <h3>quick links</h3>
          <div className="links">
            <a href="#">home</a>
            <a href="#">category</a>
            <a href="#">product</a>
            <a href="#">deal</a>
            <a href="#">contact</a>
          </div>
        </div>
        <div className="box">
          <h3>download app</h3>
          <div className="links">
            <a href="#">google play</a>
            <a href="#">window xp</a>
            <a href="#">app store</a>
          </div>
        </div>
      </div>
      <h1 className="credit"> created by <span> mr. web designer </span> | all rights reserved! </h1>
    </section>
  </div>
}