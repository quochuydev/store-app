import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Menu() {
  return (
    <nav className="navbar">
      <Link href="/#home">home</Link>
      <Link href="/#category">category</Link>
      <Link href="/#product">product</Link>
      <Link href="/#deal">deal</Link>
      <Link href="/#contact">contact</Link>
    </nav>
  );
}
