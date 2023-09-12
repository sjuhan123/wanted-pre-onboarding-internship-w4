import { useContext } from "react";
import { RegionContext } from "../contexts/regionContext";

export const useRegion = () => {
  const regionData = useContext(RegionContext);

  if (!regionData) {
    throw new Error("Cannot find RegionProvider");
  }

  return {
    regionList: regionData.regionList,
    regionIdList: regionData.regionIdList,
  };
};
