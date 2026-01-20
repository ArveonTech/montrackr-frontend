import { useSearchParams } from "react-router-dom";

const typeList = ["income", "expense"];

const useAnalyticsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = ({ type, startRange, endRange }) => {
    const newParams = new URLSearchParams(searchParams);

    if (type === "all") {
      newParams.delete("type");
    } else if (typeList.includes(type)) {
      newParams.set("type", type);
    }

    newParams.set("startRange", startRange);
    newParams.set("endRange", endRange);

    setSearchParams(newParams);
  };

  return { setFilter };
};

export default useAnalyticsFilter;
