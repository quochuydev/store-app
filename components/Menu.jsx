import React from "react";
import Link from "next/link";

export default function Menu() {
  return (
    <nav className="navbar">
      <Link href="/#home">home</Link>
      <Link href="/#category">category</Link>
      <Link href="/#product">product</Link>
      <Link href="/tickets">tickets</Link>
    </nav>
  );
}
