import styled from "styled-components";

const Content = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 33.3%;
  }
`;

export default Content;
