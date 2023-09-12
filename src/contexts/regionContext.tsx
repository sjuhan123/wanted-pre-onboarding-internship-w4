import { createContext, useEffect, useState } from "react";
import { RegionServiceImpl } from "../services/regionService";
import { TRegionTimeDataList } from "../types/region";
import { convertToArray } from "../utils/convertToArray";

interface IRegionContext {
  regionTimeDataList: TRegionTimeDataList | undefined;
  regionIdList: string[] | undefined;
}

interface RegionProviderProps {
  children: React.ReactNode;
  regionService: RegionServiceImpl;
}

export const RegionContext = createContext<IRegionContext>({
  regionTimeDataList: [
    {
      "": {
        id: "",
        value_area: 0,
        value_bar: 0,
      },
    },
  ],
  regionIdList: [""],
});

export const RegionProvider = ({
  children,
  regionService,
}: RegionProviderProps) => {
  const [regionTimeDataList, setRegionTimeDataList] =
    useState<TRegionTimeDataList>();
  const [regionIdList, setRegionIdList] = useState<string[]>();

  useEffect(() => {
    const getRegionData = async () => {
      const regionData = await regionService.get();
      const regionDataArray = convertToArray(regionData.response);
      const regionIdsSet = new Set(
        regionDataArray.map(([, regionInfo]) => regionInfo.id)
      );
      const regionIdList = Array.from(regionIdsSet);

      setRegionTimeDataList(regionDataArray);
      setRegionIdList(regionIdList);
    };

    getRegionData();
  }, [regionService, setRegionIdList]);

  return (
    <RegionContext.Provider value={{ regionTimeDataList, regionIdList }}>
      {children}
    </RegionContext.Provider>
  );
};
