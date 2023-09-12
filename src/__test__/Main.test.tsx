import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Main } from "../pages/Main";
import { theme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { FILTER_NAME } from "../constants/filterButtons";

export const renderWithTheme = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

describe("메인 페이지", () => {
  it("헤더를 보여준다.", async () => {
    renderWithTheme(<Main />);

    const $header = await screen.findByText("시계열 차트");

    expect($header).toBeInTheDocument();
  });

  it(`"팔터링 바를 보여준다`, () => {
    renderWithTheme(<Main />);

    const $filterBar = screen.getByRole("button", { name: FILTER_NAME.All });

    expect($filterBar).toBeInTheDocument();
  });
});
