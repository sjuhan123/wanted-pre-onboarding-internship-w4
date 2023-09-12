import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "./Main.test";
import { regionData } from "../mocks/api/data/regionData";
import TimeSeriesChart from "../components/common/TimeSeriesChart";

describe("시계열 차트", () => {
  const mockData = Object.values(regionData.response);

  beforeEach(() => {
    renderWithTheme(<TimeSeriesChart chartData={mockData} />);
  });

  it("xAxis을 그린다.", () => {
    const xAxis = screen.getByRole("xAxis");
    expect(xAxis).toBeInTheDocument();
  });

  it("xAxis의 헤더는 Area다 ", () => {
    const xAxis = screen.getByRole("xAxis");
    expect(xAxis).toHaveTextContent("Area");
  });

  it("yAxis을 2개 그린다.", () => {
    const yAxis = screen.getAllByRole("yAxis");
    expect(yAxis).toHaveLength(2);
  });

  it("yAxis의 헤더는 Bar다.", () => {
    const yAxis = screen.getAllByRole("yAxis");
    expect(yAxis[0]).toHaveTextContent("Bar");
  });
});
