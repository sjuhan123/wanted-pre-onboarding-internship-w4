interface IRegionData {
  id: string;
  value_area: number;
  value_bar: number;
}

interface IRegionDataResponse {
  type: string;
  version: number;
  response: Record<string, IRegionData>;
}
type TRegionDataList = IRegionData[];

export type { IRegionDataResponse, TRegionDataList, IRegionData };
