import React from "react";
import Link from "next/link";

import MegaMenu from "./MegaMenu";

export default function Menu() {
  return (
    <nav className="navbar">
      <Link href="/#home">home</Link>
      <Link href="/#category">category</Link>
      <MegaMenu />
      <Link href="/#product">product</Link>
      <Link href="/tickets">tickets</Link>
    </nav>
  );
}
