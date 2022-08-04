import React from "react";
import styled from "styled-components";

// icons
import { FiMaximize } from 'react-icons/fi';

import PhotoModal from "../elements/PhotoModal";

const PhotoSlide = (props) => {
  const photos = props.photos;
  const clickAction = props.clickAction;
  const maxRef = React.useRef([])

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlide = photos?.length - 1;

  const showNext = () => {
    currentSlide < totalSlide
      ? setCurrentSlide(() => currentSlide + 1)
      : setCurrentSlide(() => 0);
  };

  const showPrev = () => {
    currentSlide > 0
      ? setCurrentSlide(() => currentSlide - 1)
      : setCurrentSlide(() => photos?.length - 1);
  };

  const moveSlide = (e, endX) => {
    const distance = Math.abs(startX - endX);
    if (distance > 20 && startX !== 0 && endX !== 0) {
      startX - endX > 0 ? showNext() : showPrev();
    } else if (distance < 20 && startX !== 0 && endX !== 0) {
      if (!maxRef.current.includes(e.target) && clickAction) {
        clickAction();
      }
    }
  };

  const [startX, setStartX] = React.useState(0);

  const [modalOn, setModalOn] = React.useState(false);
  const [photoMax, setPhotoMax] = React.useState(null);

  const openPhotoModal = (img) =>{
    setPhotoMax(() => img)
    setModalOn(true)
  }

  return photos ? (
    <SliderWrap>
      { modalOn ? <PhotoModal photo={photoMax} setModalOn={setModalOn}/> : null }

      <Slider
        currentSlide={currentSlide}
        onMouseDown={(e) => setStartX(e.clientX)}
        onMouseUp={(e) => moveSlide(e, e.clientX)}
        onTouchStart={(e) => setStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => moveSlide(e, e.changedTouches[0].clientX)}
      >
        {photos.map((v, i) => (
          <Photo key={v.id} img={v.url}>
            <span id="maximize" >
              <FiMaximize/>
              <div ref={(el) => maxRef.current[i] = el} onClick={() => openPhotoModal(v.url)}/>
            </span>

            <span id="imgcount">
              {i + 1}/{totalSlide + 1}
            </span>
          </Photo>
        ))}
      </Slider>
    </SliderWrap>
  ) : null;
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
  background: ${(props) => (props.img ? `url(${props.img})` : "#ddd")} no-repeat
    center;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  #imgcount {
    font-size: 1.2rem;
    margin-bottom: 3.33%;
    margin-right: 6.67%;
    height: 15.88%;
    width: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
  }

  #maximize{
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 1.8rem;
    padding: 0.3rem;
    border-radius: 0.5rem;
    margin-bottom: 3.33%;
    margin-left: 6.67%;
    cursor: pointer;

    position: relative;

    div {
      position: absolute;
      width: 100%;
      height: 100%;
      top:0;
      left:0;
    }
  }
  
`;
