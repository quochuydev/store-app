import React, { useState, useEffect } from 'react';
import axios from "axios";

import Header from "./Header";
import Products from "./Products";
import Banner from "./Banner";
import Home from "./Home";
import Category from "./Category";
import Deal from "./Deal";
import Contact from "./Contact";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function Layout({ products }){
  
  return <div>
    <Header />
    <Home />
    <Banner />
    <Category />
    <Products products={products}/>
    <Deal />
    <Contact />
    <Newsletter />
    <Footer />
  </div>
}