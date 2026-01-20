import Loading from "@/features/others/Loading";
import SomethingWentWrong from "@/features/others/SomethingWentWrong";
import ChartAnalytics from "./ChartAnalytics";

const MainComponent = ({ responseDataAnalytics, loadingGetData, isErrorGetDataAnalytics, responseDataComparassion, isErrorGetDataComparassion, type }) => {
  return (
    <main className="mx-10">
      {loadingGetData ? (
        <div className="mt-52">
          <Loading />
        </div>
      ) : (
        <div>
          {isErrorGetDataAnalytics || isErrorGetDataComparassion ? (
            <div className="mt-52">
              <SomethingWentWrong />
            </div>
          ) : (
            <div>
              <div className="mt-20">
                <ChartAnalytics dataAnalytics={responseDataAnalytics?.data?.resultChart} type={type} />
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default MainComponent;
