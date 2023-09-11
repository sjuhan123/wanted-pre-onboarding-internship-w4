import { rest } from "msw";
import { chartData } from "./data/chartData";

const handlers = [
  rest.get("/api/chart", (_req, res, ctx) => {
    return res(ctx.json(chartData));
  }),
];

export default handlers;
