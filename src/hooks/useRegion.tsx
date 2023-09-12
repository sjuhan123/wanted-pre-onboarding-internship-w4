import { useContext } from "react";
import { RegionContext } from "../contexts/regionContext";

export const useRegion = () => {
  const regionData = useContext(RegionContext);

  if (!regionData) {
    throw new Error("Cannot find RegionProvider");
  }

  return {
    regionTimeDataList: regionData.regionTimeDataList,
    regionIdList: regionData.regionIdList,
  };
};
