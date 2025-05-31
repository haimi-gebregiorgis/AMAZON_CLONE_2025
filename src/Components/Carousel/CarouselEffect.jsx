import React from "react";


import { img } from "./img/data";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
      >
        {img.map((imgItem) => {
          return <img src={imgItem} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
