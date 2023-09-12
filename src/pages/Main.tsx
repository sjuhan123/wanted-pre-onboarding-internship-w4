import styled from "styled-components";
import { useRegion } from "../hooks/useRegion";
import { FilterChart } from "../components/FilterChart.tsx/FilterChart";

export const Main = () => {
  const { regionList, regionIdList } = useRegion();

  return (
    <Container>
      <h2>시계열 차트</h2>
      {regionList && regionIdList && (
        <FilterChart chartData={regionList} filterOptions={regionIdList} />
      )}
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
