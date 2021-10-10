import React, { useEffect, useState } from "react";

import OwlCarousel from "../OwlCarousel";

function Thumb(props) {
  const { thumbs = [], index = 0 } = props;

  const [thumbRef, setThumbRef] = useState(null);

  const mainSlider15 = {
    items: 3,
    nav: true,
    autoHeight: false,
  };

  const doc = document;

  useEffect(() => {
    if (thumbRef !== null && index >= 0) {
      thumbRef.current.$car.to(index, 300, true);
    }
  }, [index]);

  const thumbActiveHandler = (e, thumbIndex) => {
    props.onChangeIndex(thumbIndex);
    doc.querySelector(".thumb.active").classList.remove("active");
    e.currentTarget.classList.add("active");
  };

  const changeRefHandler = (carRef) => {
    if (carRef.current !== undefined && thumbRef === null) {
      setThumbRef(carRef);
    }
  };

  return (
    <div>
      <OwlCarousel
        adClass="thumbs banner-container"
        options={mainSlider15}
        onChangeRef={changeRefHandler}
      >
        {thumbs.map((thumb, i) => (
          <div
            className={`thumb ${i === 0 ? "active" : ""}`}
            onClick={(e) => thumbActiveHandler(e, i)}
            key={thumb + "-2-" + i}
          >
            <div key={i} className="banner">
              <img src={thumb.image} alt={thumb.title} />

              <div className="content">
                <h3>{thumb.title}</h3>
                <p>{thumb.description}</p>
                <a href={thumb.url} className="btn">
                  check out
                </a>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}

export default React.memo(Thumb);
