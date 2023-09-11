import { rest } from "msw";
import { regionData } from "./data/regionData";
import { API_PATH } from "../../constants/api";

const handlers = [
  rest.get(API_PATH.REGION, (_req, res, ctx) => {
    return res(ctx.json(regionData));
  }),
];

export default handlers;
