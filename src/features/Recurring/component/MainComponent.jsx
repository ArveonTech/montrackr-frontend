import { useEffect, useState } from "react";
import BudgetMoneySection from "./budget/budget-money-section";
import CategorySection from "@/features/Recurring/component/budget/CategorySection";
import SomethingWentWrong from "@/features/others/SomethingWentWrong";
import GoalsCard from "./goals/GoalsCard";
import AddBudgetCard from "./budget/AddBudgetCard";
import BudgetDialog from "./budget/BudgetDialog";

const MainComponent = ({ isErrorGetBudget, errorGetBudget, dataGetBudget, isLoading }) => {
  const [activeTab, setActiveTab] = useState("budget");
  const [monthExpense, setMonthExpense] = useState(0);
  const [isBudgetEmpty, setIsBudgetEmpty] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  const [budget, setBudget] = useState(0);
  const [categoryBudget, setCategoryBudget] = useState({
    essentials: 0,
    lifestyle: 0,
    health: 0,
    "family & social": 0,
    financial: 0,
    others: 0,
  });

  // Update state when dataGetBudget changes
  useEffect(() => {
    if (dataGetBudget && dataGetBudget.data && dataGetBudget.data.amountExpenseMonth) {
      setMonthExpense(dataGetBudget.data.amountExpenseMonth || 0);
    }

    if (dataGetBudget && dataGetBudget.data && dataGetBudget.data.hasBudget === false) {
      setIsBudgetEmpty(true);
    }

    if (dataGetBudget && dataGetBudget.data && dataGetBudget.data.resultGetBudget?.budget) {
      setBudget(dataGetBudget.data.resultGetBudget.budget || 0);
    }

    if (dataGetBudget && dataGetBudget.data && dataGetBudget.data.resultGetBudget?.categories) {
      setCategoryBudget(
        dataGetBudget.data.resultGetBudget.categories || {
          essentials: 0,
          lifestyle: 0,
          health: 0,
          "family & social": 0,
          financial: 0,
          others: 0,
        }
      );
    }
  }, [dataGetBudget]);

  const handleOpenAddBudget = () => {
    setOpenBudget(true);
  };

  return (
    <main className="mx-10 mt-20">
      <header className="flex gap-4 relative">
        <h4 className="mx-2.5 mt-0.5 cursor-pointer" onClick={() => setActiveTab("budget")}>
          Budget
        </h4>
        <h4 className="mt-0.5 cursor-pointer" onClick={() => setActiveTab("subscription")}>
          Subscription
        </h4>
        <div className={`border border-b-0 h-6.5 rounded-t-lg absolute transition-all duration-700 ${activeTab === "subscription" ? "translate-x-22 w-30" : "translate-x-0 w-20"}`}></div>
      </header>

      {openBudget && <BudgetDialog openBudget={openBudget} setOpenBudget={setOpenBudget} onClose={() => setOpenBudget(false)} />}

      <section className={`border transition-all duration-700 ${activeTab === "subscription" ? "rounded-t-lg" : ""}`}>
        {activeTab === "budget" ? (
          <div className="p-4">
            {isErrorGetBudget ? (
              <SomethingWentWrong />
            ) : (
              <div className="p-4 grid lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                  {isBudgetEmpty ? (
                    <AddBudgetCard onClick={handleOpenAddBudget} />
                  ) : (
                    <>
                      <BudgetMoneySection amount={monthExpense} budget={budget} loading={isLoading} />
                      <CategorySection categoryBudget={categoryBudget} />
                    </>
                  )}
                </div>
                <div className="lg:col-span-1 mx-auto mt-20 lg:my-auto">
                  <GoalsCard currentAmount={monthExpense} goalAmount={budget} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">Subscription Content</div>
        )}
      </section>
    </main>
  );
};

export default MainComponent;
