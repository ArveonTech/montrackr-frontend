import { useSearchParams } from "react-router-dom";
import useParamsControllers from "../others/useParamsControllers";

const typeList = ["income", "expense"];

const categoriesIncome = ["all", "salary", "bonus", "freelance", "business", "gift", "others"];
const categoriesExpense = ["all", "essentials", "lifestyle", "health", "family & social", "financial", "others"];

const useTransactionFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAllParam, setManyParam, deleteParam } = useParamsControllers();

  const setSearchInputParam = (debounceValue) => {
    const current = getAllParam();
    setManyParam({
      ...current,
      search: debounceValue,
    });
  };

  const setFilterInputParam = ({ type, category }) => {
    const newParams = new URLSearchParams(searchParams);
    let cateSelect = [];

    if (type === "all") {
      newParams.delete("type");
    } else if (typeList.includes(type)) {
      newParams.set("type", type);
    }

    if (type === "income") {
      cateSelect = categoriesIncome;
    } else if (type === "expense") {
      cateSelect = categoriesExpense;
    }

    if (category === "all") {
      newParams.delete("category");
    } else if (cateSelect.includes(category)) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }

    newParams.set("page", 1);
    newParams.set("limit", 10);

    setSearchParams(newParams);
  };

  const setLayoutInputParam = (inputValue) => {
    const current = getAllParam();
    setManyParam({
      ...current,
      layout: inputValue,
    });
  };
  const setSortByParam = (inputValue) => {
    const nextSort = inputValue === "latest" ? "oldest" : "latest";
    const current = getAllParam();
    setManyParam({
      ...current,
      sortBy: nextSort,
      page: 1,
      limit: 10,
    });
  };

  return { setSearchInputParam, setFilterInputParam, setLayoutInputParam, setSortByParam };
};

export default useTransactionFilter;
