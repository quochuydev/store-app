/* eslint-disable @next/next/no-img-element */
import React from "react";
import useTranslation from "@locales/useTranslation";

export default function Category({ setting }) {
  const { t } = useTranslation();

  return (
    <section className="category" id="category">
      <h1 className="heading">
        {t("label.shopBy")} <span>{t("label.category")}</span>
      </h1>

      <div className="box-container">
        {(setting?.categories || []).map((item, i) => (
          <div key={i} className="box">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={item.image} alt="" />
            <a href={item.url} className="btn">
              shop now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
