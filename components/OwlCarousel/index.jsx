import React, { useRef, useEffect } from "react";
import Carousel from "react-owl-carousel2";

function OwlCarousel(props) {
  const { adClass, options } = props;
  const carouselRef = useRef(null);
  const defaultOptions = {
    items: 1,
    loop: false,
    margin: 0,
    responsiveClass: "true",
    nav: true,
    navElement: "button",
    dots: true,
    smartSpeed: 400,
    autoplay: false,
  };

  useEffect(() => {
    if (props.onChangeRef) {
      props.onChangeRef(carouselRef);
    }
  }, [carouselRef]);

  let events = {
    onTranslated: function (e) {
      if (!e.target) return;
      if (props.onChangeIndex) {
        props.onChangeIndex(e.item.index);
      }
    },
  };

  events = Object.assign({}, events, props.events);
  const settings = Object.assign({}, defaultOptions, options);

  return (
    <Carousel
      ref={carouselRef}
      className={`owl-carousel ${adClass}`}
      options={settings}
      events={events}
    >
      {props.children}
    </Carousel>
  );
}

export default React.memo(OwlCarousel);
