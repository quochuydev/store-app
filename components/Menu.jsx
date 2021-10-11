import React from "react";
import Link from "next/link";

import MegaMenu from "./MegaMenu";
import config from "../utils/config";
import useTranslation from "../locales/useTranslation";

export default function Menu() {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Link href="/#home">home</Link>
      <Link href="/#category">{t("navigation.category")}</Link>
      <MegaMenu />
      <Link href="/#product">{t("navigation.product")}</Link>
      {config.tickets && <Link href="/tickets">tickets</Link>}
    </nav>
  );
}
