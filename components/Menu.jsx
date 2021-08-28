import React, { useState, useEffect } from 'react';
import axios from "axios";

import Product from "./Product";

export default function Menu(){
  return  <nav className="navbar">
    <a href="#home">home</a>
    <a href="#category">category</a>
    <a href="#product">product</a>
    <a href="#deal">deal</a>
    <a href="#contact">contact</a>
    </nav>
}