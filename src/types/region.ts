interface IRegionData {
  id: string;
  value_area: number;
  value_bar: number;
}

export type TRegionDataList = Record<string, IRegionData>;

export interface IRegionDataResponse {
  type: string;
  version: number;
  response: TRegionDataList;
}
