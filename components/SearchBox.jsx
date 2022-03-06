import React, { useState } from "react";
import Router from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import useTranslation from "@locales/useTranslation";

export default function SearchBox() {
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState("");

  const search = (q) => {
    Router.push(`/search?q=${q}`);
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        name="q"
        placeholder={t("label.search")}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchIcon
        className="w-6 h-6"
        aria-hidden="true"
        onClick={() => search(keyword)}
      />
    </div>
  );
}
