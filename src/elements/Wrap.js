import styled from 'styled-components';

const Wrap = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-width: 599px;
  margin: auto;
  position: relative;
`;

export default Wrap;
