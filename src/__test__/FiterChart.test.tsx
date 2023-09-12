import "@testing-library/jest-dom";
import { FilterChart } from "../components/FilterChart.tsx/FilterChart";
import { render, screen, fireEvent } from "@testing-library/react";

describe("필터차트", () => {
  const filterOptions = ["전체", "서울", "대전", "대구"];

  beforeEach(() => {
    render(<FilterChart filterOptions={filterOptions} />);
  });

  it("모든 옵션의 필터 버튼을 보여준다.", () => {
    const filterButtons = screen.getAllByRole("button", {
      name: (content) => filterOptions.includes(content),
    });

    expect(filterButtons).toHaveLength(filterOptions.length);
  });

  it("필터 버튼을 선택하면 하이라이트 처리된다.", () => {
    const filterButtons = screen.getAllByRole("button", {
      name: (content) => filterOptions.includes(content),
    });

    filterButtons.forEach((filterButton) => {
      expect(filterButton).not.toHaveClass("selected");

      fireEvent.click(filterButton);

      expect(filterButton).toHaveClass("selected");
    });
  });
});
