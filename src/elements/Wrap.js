import styled from 'styled-components';

const Wrap = props => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  width: 599px;
  margin: auto;
  border: 2px solid black;
`;

export default Wrap;
