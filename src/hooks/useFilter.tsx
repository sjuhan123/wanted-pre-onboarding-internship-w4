import { useCallback, useState } from "react";

export const useFilter = () => {
  const [currentOption, setcurrentOption] = useState(0);

  const handleFilter = useCallback(
    (index: number) => {
      if (index === currentOption) return;
      setcurrentOption(index);
    },
    [currentOption]
  );

  return { currentOption, handleFilter };
};
