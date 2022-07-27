import styled from 'styled-components';

const Content = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  /* height: 100vh; */
  background-color: red;
  img {
    width: 33.3%;
    /* height: 18%; */
  }
`;

export default Content;
