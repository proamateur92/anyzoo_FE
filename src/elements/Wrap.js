import styled from 'styled-components';

const Wrap = props => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  width: 100%;
  max-width: 599px;
  height: 100%;
  margin: 0 auto 12.2vh;
  border: 1px solid #ddd;
  position: relative;
`;

export default Wrap;
