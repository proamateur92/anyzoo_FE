import React from 'react'

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const NoticeSlide = () => {
  const notices = useSelector((state) => state.notice.list) 

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const totalSlide = notices.length -1

  const showNext = () => {
    currentSlide < totalSlide ? setCurrentSlide(currentSlide+1) : setCurrentSlide(0)
  }

  const showPrev = () => {
    currentSlide > 0 ? setCurrentSlide(currentSlide-1) : setCurrentSlide(notices.length -1)
  }

  const moveSlide = () => {
    
  }

  const slideRef = React.useRef()
  React.useEffect(()=>{
    slideRef.current.addEventListener()
  },[])

  return (
    <NoticeWrap>
      <Slider ref={slideRef} currentSlide={currentSlide} onClick={showPrev} >
      {
        notices.map(v => <Banner key={v.id} img={v.img}/>)
      }
      </Slider>
    </NoticeWrap>
  )
}

export default NoticeSlide

const NoticeWrap = styled.div`
  height: 240px;
  width: 100%;
  overflow:hidden;
`

const Slider = styled.div`
  height: 240px;
  width: 100%;
  display: flex;
  transition: all 0.5s ease-in-out;

  transform: ${ props => `translateX(${(props.currentSlide) * -100}%)`};
`

const Banner = styled.div`
  height: 240px;
  min-width:100%;
  background: ${ props => props.img ? `url(${props.img})` : '#ddd' } no-repeat center;
  background-size: cover;
`