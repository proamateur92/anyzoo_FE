import styled from 'styled-components';

const Background = (props) => {

  return(
    <Base>
      <Title>
        <h1>ANYZOO</h1>
        <h2>누구나 참여할 수 있는 반려동물 커뮤니티</h2>
      </Title>

      <MobileDummy>
        <Content>
          {props.children}
        </Content>
      </MobileDummy>
    </Base>
  )
}


export default Background


const Base = styled.div`
  z-index: 1000;
  background: #4ADDD0;
  width: 100%;
  height: 100%;
  position: fixed;
  right:0;
  top:0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div`
  color: #fff;
  margin-left: 11.25%;
  margin-right: 2rem;
  word-break:keep-all;

  padding-top: 11.62%;

  h1{
    font-weight: 700;
    font-size: 6rem;
    line-height: 97px;
  }

  h2{
    font-weight: 700;
    font-size: 2rem;
    line-height: 36px;
  }
`

const MobileDummy = styled.div`
  width: 27.8%;
  min-width: 320px;
  max-width: 400px;
  height: 85.16%;
  background: #fff;
  margin-right: 11.25%;

  background: #F8F8F8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

`

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 4% 3%;
`