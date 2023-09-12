import { createContext, useEffect, useState } from "react";
import { RegionServiceImpl } from "../services/regionService";
import { TRegionDataList, TRegionIdList } from "../types/region";
import { convertToArray } from "../utils/convertToArray";

interface IRegionContext {
  regionList: TRegionDataList | undefined;
  regionIdList: TRegionIdList | undefined;
}

interface RegionProviderProps {
  children: React.ReactNode;
  regionService: RegionServiceImpl;
}

export const RegionContext = createContext<IRegionContext | undefined>(
  undefined
);

export const RegionProvider = ({
  children,
  regionService,
}: RegionProviderProps) => {
  const [regionList, setRegionList] = useState<TRegionDataList>();
  const [regionIdList, setRegionIdList] = useState<TRegionIdList>();

  useEffect(() => {
    const getRegionData = async () => {
      const data = await regionService.get();
      const regionList = convertToArray(data.response);

      const regionIdsSet = new Set(regionList.map((item) => item.id));
      const regionIdList = Array.from(regionIdsSet);

      setRegionList(regionList);
      setRegionIdList(regionIdList);
    };

    getRegionData();
  }, [regionService, setRegionIdList]);

  return (
    <RegionContext.Provider value={{ regionList, regionIdList }}>
      {children}
    </RegionContext.Provider>
  );
};
