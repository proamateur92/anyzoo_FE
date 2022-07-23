import styled from 'styled-components';

const Wrap = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  max-width: 599px;
  margin: auto;
  padding: 0 0 10vh 0;
  position: relative;
  border: 1px solid black;
`;

export default Wrap;
