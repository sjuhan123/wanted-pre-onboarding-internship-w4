import styled from "styled-components";
import { useFilter } from "../../hooks/useFilter";
import FilterBar from "../common/FilterBar";
import TimeSeriesChart from "../common/TimeSeriesChart";
import { TRegionTimeDataList } from "../../types/region";
import { FILTER_NAME } from "../../constants/filterButtons";

interface FilterChartProps {
  chartData: TRegionTimeDataList;
  filterOptions: string[];
}

export const FilterChart = ({ chartData, filterOptions }: FilterChartProps) => {
  const options = [FILTER_NAME.All, ...filterOptions];
  const { currentOption, handleFilter } = useFilter();

  return (
    <Container>
      <FilterBar
        options={options}
        currentOption={currentOption}
        handleFilter={handleFilter}
      />
      <TimeSeriesChart
        chartData={chartData}
        ids={options}
        targetId={currentOption}
        targetIdHandler={handleFilter}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
