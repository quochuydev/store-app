/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from "react";

import config from "../utils/config";
import OwlCarousel from "./OwlCarousel";
import Thumb from "./Thumb";

export default function Home({ setting }) {
  const [index, setIndex] = useState(0);
  const [mediaRef, setMediaRef] = useState(null);

  const mainSlider = {
    autoHeight: false,
    dots: false,
    nav: true,
  };

  useEffect(() => {
    if (mediaRef !== null && mediaRef.current !== null && index >= 0) {
      mediaRef.current.$car.to(index, 300, true);
    }
  }, [index, mediaRef]);

  const setIndexHandler = (mediaIndex) => {
    if (mediaIndex !== index) {
      setIndex(mediaIndex);
    }
  };

  const changeRefHandler = (carRef) => {
    if (carRef.current !== undefined) {
      setMediaRef(carRef);
    }
  };

  const events = {
    onTranslate: function (e) {
      if (!e.target) {
        return;
      }
    },
  };

  return (
    <>
      <OwlCarousel
        adClass="owl-theme owl-nav-inner"
        options={mainSlider}
        onChangeIndex={setIndexHandler}
        onChangeRef={changeRefHandler}
        events={events}
      >
        {setting.contents.map((e, i) => (
          <section key={i} className="home">
            <div className="image">
              <img src={setting.banner?.image} alt={setting.banner?.title} />
            </div>
            <div className="content">
              {setting.banner?.title && setting.banner?.title !== "" && (
                <h3>{setting.banner?.title}</h3>
              )}
              {setting.banner?.description &&
                setting.banner?.description !== "" && (
                  <p>{setting.banner?.description}</p>
                )}
            </div>
          </section>
        ))}
      </OwlCarousel>

      <div className="m-t-md"></div>

      {useMemo(
        () => (
          <Thumb
            thumbs={setting.contents}
            index={index}
            onChangeIndex={setIndexHandler}
          />
        ),
        []
      )}
    </>
  );
}
