interface IRegionId {
  id: string;
}

interface IRegionData extends IRegionId {
  value_area: number;
  value_bar: number;
}

interface IRegionDataResponse {
  type: string;
  version: number;
  response: Record<string, IRegionData>;
}

type TRegionIdList = IRegionId[];
type TRegionDataList = IRegionData[];

export type {
  IRegionDataResponse,
  TRegionDataList,
  IRegionData,
  TRegionIdList,
};
