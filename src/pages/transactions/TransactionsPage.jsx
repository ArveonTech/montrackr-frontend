import HeaderComponent from "@/features/transactions/Component/HeaderComponent";
import MainComponent from "@/features/transactions/Component/MainComponent";
import NavigationComponent from "@/features/transactions/Component/NavigationComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useGetTransactions from "@/hooks/transactions/useGetTransactions";
import SkeletonCard from "@/features/others/SkeletonCard";
import SkeletonList from "@/features/others/SkeletonList";
import useParamsControllers from "@/hooks/others/useParamsControllers";
import useTransactionFilter from "@/hooks/transactions/useTransactionFilters";
import { errorTransactionsPage } from "@/features/transactions/errorTransactions";
import FooterComponent from "@/features/transactions/Component/FooterComponent";
import convertToParams from "@/utils/transactions/convertToParams";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import useDeleteTransactions from "@/hooks/transactions/useDeleteTransactions";
import useGetUserIdFromLocalStorage from "@/hooks/others/useGetUserIdFromLocalStorage ";

const typeList = [
  { title: "All", value: "all" },
  { title: "Income", value: "income" },
  { title: "Expense", value: "expense" },
];

const categorieIncome = [
  { title: "All", value: "all" },
  { title: "Salary", value: "salary" },
  { title: "Bonus", value: "bonus" },
  { title: "Freelance", value: "freelance" },
  { title: "Business", value: "business" },
  { title: "Gift", value: "gift" },
  { title: "Others", value: "others" },
];

const categoriesExpense = [
  { title: "All", value: "all" },
  { title: "Essential", value: "essentials" },
  { title: "Lifestyle", value: "lifestyle" },
  { title: "Health", value: "health" },
  { title: "Family & Social", value: "family & social" },
  { title: "Financial", value: "financial" },
  { title: "Others", value: "others" },
];

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const statusAddTransactions = useSelector((state) => state.addTransactions);
  const statusEditTransactions = useSelector((state) => state.editTransactions);
  const user_id = useGetUserIdFromLocalStorage();
  const { getParam, getAllParam } = useParamsControllers();
  const { setFilterInputParam } = useTransactionFilter();
  const accessToken = localStorage.getItem("access-token");

  // params/query
  const pageParams = parseInt(getParam("page")) || 1;
  const limitPageParams = parseInt(getParam("limit")) || 10;
  const searchParams = getParam("search") || "";
  const typeParam = getParam("type") ? decodeURIComponent(getParam("type")) : null;
  const categoryParam = getParam("category") ? decodeURIComponent(getParam("category")) : null;
  const layoutParam = decodeURIComponent(getParam("layout") || "grid");
  const sortByParam = decodeURIComponent(getParam("sortBy") || "latest");

  // filter tag
  const [filter, setFilter] = useState({
    type: typeParam ? typeParam : "all",
    category: categoryParam ? categoryParam : "all",
  });

  const [typeCategory, setTypeCategory] = useState([]);
  const [query, setQuery] = useState(null);

  // re-render when type changes
  useEffect(() => {
    if (filter.type === "income") {
      setTypeCategory(categorieIncome);
    } else if (filter.type === "expense") {
      setTypeCategory(categoriesExpense);
    } else {
      setTypeCategory([]);
      setFilter((prev) => ({ ...prev, category: "all" }));
    }
  }, [filter.type]);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessDelete, setIsSucessDelete] = useState(false);

  const handleLoading = (value) => {
    setIsLoadingDelete(value);
  };

  const handleSuccess = (value) => {
    setIsSucessDelete(value);
  };

  const { isLoading: loadingGetTransactions, isError: isErrorGetTransactions, error: errorGetTransactions, data: dataGetTransactions } = useGetTransactions({ accessToken: accessToken, query });
  const { isError: isErrorDeleteTransactions, error: errorDeleteTransactions, mutate: mutateDeleteTransactions } = useDeleteTransactions({ handleLoading, handleSuccess });

  // if data summary,enter into state
  const dataTransactions = dataGetTransactions?.data?.items || [];
  const pageMeta = {
    total: dataGetTransactions?.data?.total ?? 0,
    page: dataGetTransactions?.data?.page ?? 1,
    limit: dataGetTransactions?.data?.limit ?? 10,
  };

  // if success delete transactions sonner
  useEffect(() => {
    if (!isSuccessDelete) return;

    toast.success("Transaction deleted successfully.");
  }, [isSuccessDelete]);

  // if failed delete transactions sonner
  useEffect(() => {
    if (!isErrorGetTransactions) return;

    if (isErrorGetTransactions) dispatch(errorTransactionsPage(errorGetTransactions.message));
  }, [isErrorGetTransactions]);

  // if failed delete transactions sonner
  useEffect(() => {
    if (!isErrorDeleteTransactions) return;

    if (isErrorDeleteTransactions) toast.error("Failed to delete transaction.");
  }, [isErrorDeleteTransactions]);

  let skeletonLoop = [];
  const countSkeleton = layoutParam === "grid" ? 12 : 8;
  for (let i = 0; i < countSkeleton; i++) {
    if (layoutParam === "grid") {
      skeletonLoop.push(<SkeletonCard key={i} className={`col-span-1 w-full md:max-w-90 2xs:w-70`} />);
    } else {
      skeletonLoop.push(<SkeletonList key={i} />);
    }
  }

  useEffect(() => {
    const resultConverter = convertToParams({ type: typeParam, category: categoryParam, sort: sortByParam, search: searchParams, page: pageParams, limit: limitPageParams });
    setQuery(resultConverter);
  }, [pageParams, limitPageParams, typeParam, categoryParam, sortByParam, searchParams, pageParams, limitPageParams]);

  useEffect(() => {
    if (statusAddTransactions.status === false) {
      toast.error(statusAddTransactions.message, {
        style: {
          background: "red",
          color: "white",
        },
      });
    } else if (statusAddTransactions.status === true) {
      toast.success(statusAddTransactions.message);
    }
  }, [statusAddTransactions]);

  useEffect(() => {
    if (statusEditTransactions.status === false) {
      toast.error(statusEditTransactions.message, {
        style: {
          background: "red",
          color: "white",
        },
      });
    } else if (statusEditTransactions.status === true) {
      toast.success(statusEditTransactions.message);
    }
  }, [statusEditTransactions]);

  const handleDeleteTransactions = (id) => {
    const idTransactions = id;

    mutateDeleteTransactions({ dataTransactions: { user_id }, idTransactions });
  };

  return (
    <div>
      <NavigationComponent />
      <HeaderComponent />
      <MainComponent
        data={{ filter, typeList, typeCategory, pageMeta, loadingGetTransactions, isErrorGetTransactions, layoutParam, skeletonLoop, dataTransactions, setFilterInputParam, setFilter, isLoadingDelete, handleDeleteTransactions }}
      />
      <FooterComponent data={{ isErrorGetTransactions, dataTransactions, pageMeta }} />
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default TransactionsPage;
