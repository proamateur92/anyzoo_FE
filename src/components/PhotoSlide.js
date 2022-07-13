import React from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const PhotoSlide = (props) => {
  const photos = []

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlide = photos.length - 1;

  const showNext = () => {
    currentSlide < totalSlide ? setCurrentSlide(currentSlide + 1) : setCurrentSlide(0);
  };

  const showPrev = () => {
    currentSlide > 0 ? setCurrentSlide(currentSlide - 1) : setCurrentSlide(photos.length - 1);
  };

  const moveSlide = () => {
    // console.log("start?", startX, " &end?", endX);
    const distance = Math.abs(startX - endX)

    if (distance > 10 && startX !== 0 && endX !== 0) {
      startX - endX > 0 ? showNext() : showPrev();
    } else if (distance < 10 && startX !== 0 && endX !== 0) {
      console.log('이때는 공지 상세로 이동')
    }
  };

  const [startX, setStartX] = React.useState(0);
  const [endX, setEndX] = React.useState(0);

  React.useEffect(() => {
    moveSlide();
  }, [endX]);

  return (
    <SliderWrap>
      <Slider
        currentSlide={currentSlide}
        onMouseDown={(e) => setStartX(e.clientX)}
        onMouseUp={(e) => setEndX(e.clientX)}
        onTouchStart={(e) => setStartX(e.clientX)}
        onTouchEnd={(e) => setEndX(e.clientX)}
      >
        {photos.map((v) => (
          <Photo key={v.id} img={v.img} />
        ))}
      </Slider>
    </SliderWrap>
  );
};

export default PhotoSlide;

const SliderWrap = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Slider = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  transition: all 0.5s ease-in-out;

  transform: ${(props) => `translateX(${props.currentSlide * -100}%)`};
`;

const Photo = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => (props.img ? `url(${props.img})` : "#ddd")} no-repeat center;
  background-size: cover;
`;
