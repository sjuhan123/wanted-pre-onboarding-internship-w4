import { useState } from "react";

export const useFilter = () => {
  const [currentOption, setcurrentOption] = useState(0);

  const handleFilter = (index: number) => {
    if (index === currentOption) return;
    setcurrentOption(index);
  };

  return { currentOption, handleFilter };
};
