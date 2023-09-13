import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { regionData } from "../mocks/api/data/regionData";
import TimeSeriesChart from "../components/common/TimeSeriesChart";
import { convertToArray } from "../utils/convertToArray";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

export const renderWithTheme = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

describe("시계열 차트", () => {
  const mockData = convertToArray(regionData.response);

  beforeEach(() => {
    renderWithTheme(
      <TimeSeriesChart chartData={mockData} targetIdHandler={(id) => id} />
    );
  });

  it("xAxis을 그린다.", () => {
    const xAxis = screen.getByRole("xAxis");
    expect(xAxis).toBeInTheDocument();
  });

  it(`yLeftAxis을 "Bar"헤더와 함께 그린다.`, () => {
    const yLeftAxis = screen.getByRole("yLeftAxis");

    expect(screen.getByText("Bar")).toBeInTheDocument();
    expect(yLeftAxis).toBeInTheDocument();
  });

  it(`yRightAxis를 "Area"헤더와 함께 그린다.`, () => {
    const yRightAxis = screen.getByRole("yRightAxis");

    expect(screen.getByText("Area")).toBeInTheDocument();
    expect(yRightAxis).toBeInTheDocument();
  });
});
