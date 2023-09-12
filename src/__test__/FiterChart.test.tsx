import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FilterBar from "../components/common/FilterBar";

describe("필터차트", () => {
  const filterOptions = ["전체", "서울", "대전", "대구"];

  beforeEach(() => {
    render(
      <FilterBar
        options={filterOptions}
        currentOption="전체"
        handleFilter={(option) => option}
      />
    );
  });

  it("모든 옵션의 필터 버튼을 보여준다.", () => {
    const filterButtons = screen.getAllByRole("button", {
      name: (content) => filterOptions.includes(content),
    });

    expect(filterButtons).toHaveLength(filterOptions.length);
  });
});
