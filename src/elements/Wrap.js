import styled from 'styled-components';

const Wrap = props => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  max-width: 599px;
  height: 100vh;
  font-size: inherit;
`;

export default Wrap;
