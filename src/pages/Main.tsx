import styled from "styled-components";
import { useRegion } from "../hooks/useRegion";
import { FilterChart } from "../components/FilterChart.tsx/FilterChart";

export const Main = () => {
  const { regionTimeDataList, regionIdList } = useRegion();

  return (
    <Container>
      <h2>시계열 차트</h2>
      {regionTimeDataList && regionIdList && (
        <FilterChart
          chartData={regionTimeDataList}
          filterOptions={regionIdList}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
