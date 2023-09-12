import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import FilterBar from "../components/common/FilterBar";
import { renderWithTheme } from "./Main.test";
import { FILTER_NAME } from "../constants/filterButtons";

const TEST_FILTER_BUTTONS = ["서울", "대전", "대구", "울산"];
const DEFAULT_FILTER_INDEX = 0;

describe("필터바", () => {
  const filterOptions = TEST_FILTER_BUTTONS;

  beforeEach(() => {
    renderWithTheme(
      <FilterBar
        options={filterOptions}
        currentOption={DEFAULT_FILTER_INDEX}
        handleFilter={(option) => option}
      />
    );
  });

  it("모든 옵션의 필터 버튼을 보여준다.", () => {
    const optionButtons = screen.getAllByRole("button", {
      name: (content) => filterOptions.includes(content),
    });
    const filterButtons = [FILTER_NAME.All, ...optionButtons];

    expect(filterButtons).toHaveLength(filterButtons.length);
  });
});
