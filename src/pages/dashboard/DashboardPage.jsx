import FinancialSummary from "@/features/dashboard/Component/FinancialSummary";
import IncomeExpenseChart from "@/features/dashboard/Component/IncomeExpenseChart";
import NavigationComponent from "@/features/dashboard/Component/NavigationComponent";
import RecentTransactions from "@/features/dashboard/Component/RecentTransactions";
import { errorDashboardPage } from "@/features/dashboard/errorDashboard";
import Loading from "@/features/others/Loading";
import SomethingWentWrong from "@/features/others/SomethingWentWrong";
import useGetProfile from "@/hooks/dashboard/useGetProfile";
import useGetSummaryFinancial from "@/hooks/dashboard/useGetSummaryFinancial";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const errorDashboard = useSelector((state) => state.errorDashboard);
  const [profileUser, setProfileUser] = useState(null);
  const [dataSummary, setDataSummary] = useState(null);
  const [dataChart, setDataChart] = useState();
  const accessToken = localStorage.getItem("access-token");

  const [isLoading, setIsLoading] = useState(false);

  // init loading during the data retrieval process
  const handleLoading = (value) => {
    setIsLoading(value);
  };

  const { isError: isErrorGetProfile, error: errorGetProfile, data: dataGetProfile } = useGetProfile({ accessToken });
  const { isError: isErrorSummaryFinancial, error: errorSummaryFinancial, data: dataSummaryFinancial, mutate: mutateSummaryFinancial } = useGetSummaryFinancial({ accessToken, handleLoading });

  // set error if error get profile user
  useEffect(() => {
    if (isErrorGetProfile) dispatch(errorDashboardPage(errorGetProfile.message));
    if (isErrorSummaryFinancial) dispatch(errorDashboardPage(errorSummaryFinancial.message));
  }, [isErrorGetProfile, isErrorSummaryFinancial]);

  // enter data profile into state
  useEffect(() => {
    if (dataGetProfile) {
      if (dataGetProfile.tokens?.accessToken) {
        localStorage.setItem("access-token", dataGetProfile.tokens.accessToken);
      }

      return setProfileUser(dataGetProfile.data);
    }
  }, [dataGetProfile]);

  // when the profile data already exists, take the dashboard data
  useEffect(() => {
    if (profileUser) mutateSummaryFinancial({ dataTransactions: { user_id: profileUser._id } });
  }, [profileUser]);

  // if data summary,enter into state
  useEffect(() => {
    if (profileUser)
      if (dataSummaryFinancial) {
        setDataChart(dataSummaryFinancial.data.itemsChart);
        return setDataSummary(dataSummaryFinancial.data);
      }
  }, [dataSummaryFinancial, profileUser]);

  return (
    <div>
      <NavigationComponent dataUser={profileUser} />
      {isLoading ? (
        <Loading />
      ) : errorDashboard ? (
        <SomethingWentWrong classname={`mt-70`} />
      ) : (
        <div className="grid grid-cols-4 mt-20 mx-10 gap-10 mb-20 lg:mb-0">
          <div className="col-span-4 lg:col-span-3 space-y-10">
            <FinancialSummary balanceUser={dataSummary?.balanceUser} incomeUser={dataSummary?.incomeUser} expenseUser={dataSummary?.expenseUser} />
            <IncomeExpenseChart dataAnalytics={dataChart} />
          </div>
          <div className="col-span-4 lg:col-span-1">
            <RecentTransactions dataTransactions={dataSummary?.previousTwoData} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
