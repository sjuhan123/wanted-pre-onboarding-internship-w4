interface IRegionData {
  id: string;
  value_area: number;
  value_bar: number;
}

type IRegionTimeData = Record<string, IRegionData>;

interface IRegionDataResponse {
  type: string;
  version: number;
  response: IRegionTimeData;
}
type TRegionDataList = IRegionData[];
type TRegionTimeDataList = IRegionTimeData[];

export type {
  IRegionDataResponse,
  TRegionTimeDataList,
  TRegionDataList,
  IRegionData,
};
