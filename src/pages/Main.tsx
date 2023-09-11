import styled from "styled-components";

export const Main = () => {
  return (
    <Container>
      <h2>시계열 차트</h2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 5rem auto;
    font-size: 2rem;
  }
`;
