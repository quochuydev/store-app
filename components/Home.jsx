/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from "react";

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
    console.log({ index, mediaIndex });
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
    <div>
      <OwlCarousel
        adClass="owl-theme owl-nav-inner"
        options={mainSlider}
        onChangeIndex={setIndexHandler}
        onChangeRef={changeRefHandler}
        events={events}
      >
        {(setting.contents || []).map((content, i) => (
          <section key={i} className="home">
            <div className="image">
              <img src={content?.image} alt={content?.title} />
            </div>
            <div className="content">
              {content?.title && <h3>{content?.title}</h3>}
              {setting.banner?.description && (
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
    </div>
  );
}
