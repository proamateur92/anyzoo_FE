import styled from 'styled-components';



import Background from '../elements/Background';

const Wrap = (props) => {
  return (
    // <Background>
      <Container>
        {props.children}
      </Container>
    // </Background> 
    );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  max-height: 100vh;
  overflow:scroll;
  min-height: 100vh;
  max-width: 599px;
  margin: auto;
  padding: 0 0 10vh 0;
  position: relative;
  border: 1px solid #ddd;
`;

export default Wrap;
