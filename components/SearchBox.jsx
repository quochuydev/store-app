import React, { useState } from "react";
import Router from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import useTranslation from "@locales/useTranslation";

export default function SearchBox() {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");

  return (
    <div className="search-box-container">
      <div className="max-w-lg flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          <SearchIcon
            className="w-4 h-4"
            aria-hidden="true"
            onClick={() => Router.push(`/search?q=${keyword}`)}
          />
        </span>
        <input
          type="text"
          name="q"
          placeholder={t("label.search")}
          onChange={(e) => setKeyword(e.target.value)}
          id="username"
          autoComplete="username"
          className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
        />
      </div>
    </div>
  );
}
