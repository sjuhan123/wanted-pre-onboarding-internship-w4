import styled from "styled-components";
import { useFilter } from "../../hooks/useFilter";
import FilterBar from "../common/FilterBar";

interface FilterChartProps<D, O> {
  chartData: D;
  filterOptions: O;
}

export const FilterChart = <D, O extends string[] | number[]>({
  // chartData,
  filterOptions,
}: FilterChartProps<D, O>) => {
  const { currentOption, handleFilter } = useFilter();

  return (
    <Container>
      <FilterBar
        options={filterOptions}
        currentOption={currentOption}
        handleFilter={handleFilter}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
