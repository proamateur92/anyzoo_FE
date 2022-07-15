import React from "react";
import styled from "styled-components";

const PhotoSlide = (props) => {
  const photos = props.photos
  const setPhotoPg = props.setPhotoPg
  const clickAction = props.clickAction

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlide = photos?.length - 1;

  const showNext = () => {
    currentSlide < totalSlide ? setCurrentSlide(currentSlide + 1) : setCurrentSlide(0);
    setPhotoPg(currentSlide + 1)
  };

  const showPrev = () => {
    currentSlide > 0 ? setCurrentSlide(currentSlide - 1) : setCurrentSlide(photos?.length - 1);
    setPhotoPg(currentSlide - 1)
  };

  const moveSlide = (endX) => {
    const distance = Math.abs(startX - endX)

    if (distance > 10 && startX !== 0 && endX !== 0) {
      startX - endX > 0 ? showNext() : showPrev();
    } else if (distance < 20 && startX !== 0 && endX !== 0) {
      clickAction()
    }
  };

  const [startX, setStartX] = React.useState(0);

  return (
    photos ?
    <SliderWrap>
      <Slider
        currentSlide={currentSlide}
        onMouseDown={(e) => setStartX(e.clientX)}
        onMouseUp={(e) => moveSlide(e.clientX)}
        onTouchStart={(e) => setStartX(e.clientX)}
        onTouchEnd={(e) => moveSlide(e.clientX)}
      >
        {photos.map((v) => (
          <Photo key={v.id} img={v.url} />
        ))}
      </Slider>
    </SliderWrap> 
    : null
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
  min-width: 100%;
  background: ${(props) => (props.img ? `url(${props.img})` : "#ddd")} no-repeat center;
  background-size: cover;
  background-position: center;
`;