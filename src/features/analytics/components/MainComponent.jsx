import Loading from "@/features/others/Loading";
import SomethingWentWrong from "@/features/others/SomethingWentWrong";
import ChartAnalytics from "./ChartAnalytics";
import MonthComparassion from "./MonthComparassion";
import PieChartAnalytics from "./PieChartAnalytics";

const incomeCategory = [
  { label: "salary", value: 0, fill: "#22c55e" },
  { label: "bonus", value: 0, fill: "#4ade80" },
  { label: "freelance", value: 0, fill: "#16a34a" },
  { label: "business", value: 0, fill: "#15803d" },
  { label: "gift", value: 0, fill: "#86efac" },
  { label: "others", value: 0, fill: "#bbf7d0" },
];

const expenseCategory = [
  { label: "essentials", value: 0, fill: "#ef4444" },
  { label: "lifestyle", value: 0, fill: "#f97316" },
  { label: "health", value: 0, fill: "#eab308" },
  { label: "family & social", value: 0, fill: "#ec4899" },
  { label: "financial", value: 0, fill: "#8b5cf6" },
  { label: "others", value: 0, fill: "#9ca3af" },
];

const chartConfigIncome = {
  salary: {
    label: "Salary",
    color: "#22c55e",
  },
  bonus: {
    label: "Bonus",
    color: "#4ade80",
  },
  freelance: {
    label: "Freelance",
    color: "#16a34a",
  },
  business: {
    label: "Business",
    color: "#15803d",
  },
  gift: {
    label: "Gift",
    color: "#86efac",
  },
  others: {
    label: "Others",
    color: "#bbf7d0",
  },
};

const chartConfigExpense = {
  essentials: {
    label: "Essentials",
    color: "#ef4444",
  },
  lifestyle: {
    label: "Lifestyle",
    color: "#f97316",
  },
  health: {
    label: "Health",
    color: "#eab308",
  },
  "family & social": {
    label: "Family & Social",
    color: "#ec4899",
  },
  financial: {
    label: "Financial",
    color: "#8b5cf6",
  },
  others: {
    label: "Others",
    color: "#9ca3af",
  },
};

const MainComponent = ({ responseDataAnalytics, loadingGetData, isErrorGetDataAnalytics, responseDataComparassion, isErrorGetDataComparassion, type, startRange, endRange, period }) => {
  const resultCategory = responseDataAnalytics?.data.resultCategory || {
    income: incomeCategory,
    expense: expenseCategory,
  };

  console.info(responseDataAnalytics?.data?.resultCategory);

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
              <div className="mt-10">
                <ChartAnalytics dataAnalytics={responseDataAnalytics?.data?.resultChart} type={type} startRange={startRange} endRange={endRange} />
              </div>
              <div className="space-y-20 md:space-y-0 md:flex my-20 items-center">
                <MonthComparassion dataComparassion={responseDataComparassion?.data} period={period} />
                {Object.entries(resultCategory).map(([key, value]) => {
                  if (key === "income") {
                    return <PieChartAnalytics key={key} chartConfig={chartConfigIncome} chartData={value} />;
                  }

                  if (key === "expense") {
                    return <PieChartAnalytics key={key} chartConfig={chartConfigExpense} chartData={value} />;
                  }

                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default MainComponent;
