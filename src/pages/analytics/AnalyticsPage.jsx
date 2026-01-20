import HeaderComponent from "@/features/analytics/components/HeaderComponent";
import MainComponent from "@/features/analytics/components/MainComponent";
import NavigationComponent from "@/features/analytics/components/NavigationComponent";
import useGetAnalytics from "@/hooks/analytics/useGetAnalytics";
import useGetComparassion from "@/hooks/analytics/useGetComparassion";
import useParamsControllers from "@/hooks/others/useParamsControllers";
import { useState } from "react";

const AnalyticsPage = () => {
  const { getParam } = useParamsControllers();

  const yearNow = new Date().getFullYear();
  const defaultStartRangeQuery = new Date(yearNow, 0, 1, 0, 0, 0, 0);
  const defaultEndRangeQuery = new Date(yearNow, 11, 31, 23, 59, 59, 999);

  const type = decodeURIComponent(getParam("type") || "");
  const startRange = decodeURIComponent(getParam("startRange") || defaultStartRangeQuery.toISOString());
  const endRange = decodeURIComponent(getParam("endRange") || defaultEndRangeQuery.toISOString());

  const [isGetAnalyticsLoading, setIsGetAnalyticsLoading] = useState(false);

  const handleLoading = (value) => {
    setIsGetAnalyticsLoading(value);
  };

  const { isError: isErrorGetAnalytics, error: errorGetAnalytics, data: dataGetAnalytics, mutate: mutateGetAnalytics } = useGetAnalytics({ handleLoading });
  const { isError: isErrorGetcomparassion, error: errorGetcomparassion, data: dataGetcomparassion, mutate: mutateGetcomparassion } = useGetComparassion({ handleLoading });

  return (
    <>
      <NavigationComponent />
      <HeaderComponent type={type} startRange={startRange} endRange={endRange} mutateGetAnalytics={mutateGetAnalytics} />
      <MainComponent
        responseDataAnalytics={dataGetAnalytics}
        isErrorGetDataAnalytics={isErrorGetAnalytics}
        loadingGetData={isGetAnalyticsLoading}
        isErrorGetDataComparassion={isErrorGetcomparassion}
        responseDataComparassion={dataGetcomparassion}
        type={type}
      />
    </>
  );
};

export default AnalyticsPage;
