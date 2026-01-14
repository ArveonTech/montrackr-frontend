import MainComponent from "@/features/Recurring/component/MainComponent";
import NavigationComponent from "@/features/Recurring/component/NavigationComponent";
import useGetBudget from "@/hooks/recurring/useGetBudget";

const RecurringPage = () => {
  const accessToken = localStorage.getItem("accessToken") || "";

  const { isError: isErrorGetBudget, error: errorGetBudget, data: dataGetBudget, isLoading: isLoadingGetBudget } = useGetBudget({ accessToken });

  return (
    <div>
      <NavigationComponent />
      <MainComponent isErrorGetBudget={isErrorGetBudget} errorGetBudget={errorGetBudget} dataGetBudget={dataGetBudget} isLoading={isLoadingGetBudget} />
    </div>
  );
};

export default RecurringPage;
