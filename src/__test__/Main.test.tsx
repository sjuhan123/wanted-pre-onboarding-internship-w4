import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Main } from "../pages/Main";

describe("메인 페이지", () => {
  it("헤더를 보여준다.", async () => {
    render(<Main />);

    const $header = await screen.findByText("시계열 차트");

    expect($header).toBeInTheDocument();
  });

  it(`"전체" 버튼이 선택되어 있는 피터링 바를 보여준다`, () => {
    render(<Main />);

    const $filter = screen.getByRole("button", { name: "전체" });

    expect($filter).toHaveClass("selected");
  });
});
