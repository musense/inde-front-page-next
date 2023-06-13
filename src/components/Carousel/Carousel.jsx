import React, { useMemo, useEffect, useState, useRef } from "react";
import styles from './carousel.module.css'
// reactstrap components
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl
} from "reactstrap";

import mobileItemCarousel from "@assets/img/mobile/index/banner.png";
import desktopCarousel from "@assets/img/index/banner.png";
// console.log("🚀 ~ file: Carousel.jsx:13 ~ desktopCarousel:", desktopCarousel)

const mobileItem = {
  image: mobileItemCarousel,
  altText: "The most popular games in India",
}


const desktopItem = {
  image: desktopCarousel,
  altText: "The most popular games in India",
}



function CarouselSection() {

  const carouselRef = useRef(null)
  const [carouselItems, setCarouselItems] = useState(null);
  useEffect(() => {
    const clientWidth = localStorage.getItem("clientWidth");
    if (clientWidth > 768) {
      setCarouselItems([{
        src: desktopItem.image.src,
        altText: desktopItem.altText,
      }])
    } else {
      setCarouselItems([{
        src: mobileItem.image.src,
        altText: mobileItem.altText,
      }])
    }
  }, []);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    if (carouselItems.length === 1) return
    const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    if (carouselItems.length === 1) return
    const nextIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = useMemo(() => {
    if (!carouselItems) return
    const mappedImages = [...carouselItems];
    return mappedImages.map((item) => {
      return (
        <CarouselItem
          onExiting={onExiting}
          onExited={onExited}
          key={item.src}
          className={styles.carouselItem}
        >
          <a href={'https://zoobet168.com/'} className={styles.carouselAnchor} target="_blank" rel="noopener noreferrer" />
          <img src={item.src} alt={item.altText} className={styles.carouselImg} width={'100%'} />
          {/* <div className="carousel-caption d-none d-md-block">
            <h5>{item.caption}</h5>
          </div> */}
        </CarouselItem>
      );
    });
  }, [carouselItems])

  return carouselItems
    ? carouselItems.length > 1
      ? (
        <Carousel
          id={carouselRef}
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className={`${styles.carousel}`}
        >
          <CarouselIndicators
            items={carouselItems} activeIndex={activeIndex} onClickHandler={goToIndex} className={styles.indicator} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      )
      : (
        <Carousel
          id={carouselRef}
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className={`${styles.carousel}`}
        >
          {slides}
        </Carousel>
      )
    : <></>

}
export default CarouselSection;
