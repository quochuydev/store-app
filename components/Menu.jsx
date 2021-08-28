import React, { useState, useEffect } from "react";

export default function Menu() {
  return (
    <nav className="navbar">
      <a href="#home">home</a>
      <a href="#category">category</a>
      <a href="#product">product</a>
      <a href="#deal">deal</a>
      <a href="#contact">contact</a>
    </nav>
  );
}
