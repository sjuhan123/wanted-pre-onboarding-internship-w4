import styled from "styled-components";

interface FilterBarProps {
  options: string[];
  currentOption: number;
  handleFilter: (option: number) => void;
}

const FilterBar = ({
  options,
  currentOption,
  handleFilter,
}: FilterBarProps) => {
  return (
    <Container>
      {options.map((option, index) => {
        return (
          <Button
            key={option}
            selected={index === currentOption}
            onClick={() => handleFilter(index)}
          >
            {option}
          </Button>
        );
      })}
    </Container>
  );
};

export default FilterBar;

const Container = styled.div`
  display: flex;
  padding: 1rem;
`;

const Button = styled.button<{ selected: boolean }>`
  ${({ theme, selected }) => {
    return selected
      ? `
        border: 1px solid ${theme.COLORS.LIGHT_BLUE};
        color: #fff;
        background-color: ${theme.COLORS.LIGHT_BLUE};
      `
      : `
        border: 1px solid gray;
        color: #000;
        background-color: #fff;
      `;
  }};

  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    background-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;
