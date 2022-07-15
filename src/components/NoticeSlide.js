// react
import React from 'react';

// style
import styled from 'styled-components';

// redux
import { useSelector } from 'react-redux';

const NoticeSlide = () => {
  const notices = useSelector(state => state.notice.list);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlide = notices.length - 1;

  // const showNext = () => {
  //   currentSlide < totalSlide ? setCurrentSlide(currentSlide + 1) : setCurrentSlide(0);
  // };

  // const showPrev = () => {
  //   currentSlide > 0 ? setCurrentSlide(currentSlide - 1) : setCurrentSlide(notices.length - 1);
  // };

  // const moveSlide = () => {
  //   console.log("start?", startX, " &end?", endX);
  //   const distance = Math.abs(startX - endX)

  //   if (distance > 10 && startX !== 0 && endX !== 0) {
  //     startX - endX > 0 ? showNext() : showPrev();
  //   } else if (distance < 10 && startX !== 0 && endX !== 0) {
  //     console.log('이때는 공지 상세로 이동')
  //   }
  // };

  const [startX, setStartX] = React.useState(0);
  const [endX, setEndX] = React.useState(0);


  // React.useEffect(() => {
  //   moveSlide();
  //   // console.log('작동중')
  // }, [endX]);

  return (
    <NoticeWrap>
      <Slider
        currentSlide={currentSlide}
        onMouseDown={e => setStartX(e.clientX)}
        onMouseUp={e => setEndX(e.clientX)}
        onTouchStart={e => setStartX(e.clientX)}
        onTouchEnd={e => setEndX(e.clientX)}
      >
        {notices.map(v => (
          <Banner key={v.id} img={v.img} />
        ))}


      </Slider>
      
      <Dots>
      {notices.map((v,i) => (
          <Dot key={v.id} order={i} currentSlide={currentSlide} />
        ))}
      </Dots>
    </NoticeWrap>
  );
};


export default NoticeSlide;

const NoticeWrap = styled.div`
  height: 40vw;
  max-height: 24rem;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Slider = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  transition: all 0.5s ease-in-out;

  transform: ${props => `translateX(${props.currentSlide * -100}%)`};
`;

const Banner = styled.div`
  height: 100%;
  min-width: 100%;
  background: ${props => (props.img ? `url(${props.img})` : '#ddd')} no-repeat center;
  background-size: cover;

  cursor: pointer;
`;

const Dots = styled.div`
position: absolute;
bottom: 6.7%;
left: 50%;
transform: translate(-50%, 0);

display: flex;
gap: 0.5rem;
`

const Dot = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  background: ${(props)=> props?.order === props?.currentSlide ? '#34d8ce': '#EDEDED'};
`