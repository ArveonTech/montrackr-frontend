import { useEffect, useState } from "react";
import BudgetMoneySection from "./budget/budget-money-section";
import CategorySection from "@/features/Recurring/component/budget/CategorySection";
import SomethingWentWrong from "@/features/others/SomethingWentWrong";
import GoalsCard from "./goals/GoalsCard";
import AddGoalCard from "./goals/AddGoalCard";
import GoalDialog from "./goals/GoalDialog";
import ContributeGoalDialog from "./goals/ContributeGoalDialog";
import AddBudgetCard from "./budget/AddBudgetCard";
import BudgetDialog from "./budget/BudgetDialog";
import Loading from "@/features/others/Loading";

const MainComponent = ({
  isErrorGetBudget,
  errorGetBudget,
  dataGetBudget,
  isLoading,
  isLoadingBudget,
  handleSubmitBudget,
  errorFormBudget,
  successAddBudget,
  successEditBudget,
  // goal props
  isErrorGetGoal,
  errorGetGoal,
  dataGetGoal,
  isLoadingGetGoal,
  isLoadingGoal,
  handleSubmitGoal,
  errorFormGoal,
  // contribute
  handleSubmitContribute,
  errorFormContribute,
  successAddGoal,
  successEditGoal,
  handleDeleteGoal,
}) => {
  const [activeTab, setActiveTab] = useState("budget");

  // State for budget and expenses
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

  // state for goals
  const [isGoalEmpty, setIsGoalEmpty] = useState(false);
  const [openGoal, setOpenGoal] = useState(false);
  const [openContribute, setOpenContribute] = useState(false);
  const [goalData, setGoalData] = useState(null);

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

  // Update goal state when dataGetGoal changes
  useEffect(() => {
    if (dataGetGoal && dataGetGoal.data && dataGetGoal.data.hasBudget === true) {
      setGoalData(dataGetGoal.data.items || null);
      setIsGoalEmpty(false);
    }

    if (dataGetGoal && dataGetGoal.data && dataGetGoal.data.hasBudget === false) {
      setIsGoalEmpty(true);
      setGoalData(null);
    }
  }, [dataGetGoal]);

  const handleOpenAddBudget = () => {
    setOpenBudget(true);
  };

  const handleOpenAddGoal = () => {
    setOpenGoal(true);
  };

  const handleOpenContribute = () => {
    setOpenContribute(true);
  };

  // Close budget dialog when budget is successfully added or edited
  useEffect(() => {
    if (successAddBudget) {
      setIsBudgetEmpty(false);
      setOpenBudget(false);
    }
  }, [successAddBudget]);

  // close goal dialog when added
  useEffect(() => {
    if (successAddGoal) {
      setIsGoalEmpty(false);
      setOpenGoal(false);
    }
  }, [successAddGoal]);

  // close goal dialog when edited
  useEffect(() => {
    if (successEditGoal) {
      setOpenGoal(false);
    }
  }, [successEditGoal]);

  useEffect(() => {
    if (successAddGoal) {
      setOpenContribute(false);
    }
  }, [successAddGoal]);

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

      {openBudget && <BudgetDialog openBudget={openBudget} setOpenBudget={setOpenBudget} onClose={() => setOpenBudget(false)} isLoadingBudget={isLoadingBudget} handleSubmitBudget={handleSubmitBudget} errorFormBudget={errorFormBudget} />}

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
                  ) : isLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <BudgetMoneySection amount={monthExpense} budget={budget} />
                      <CategorySection
                        categoryBudget={categoryBudget}
                        dataEditBudget={dataGetBudget}
                        errorFormBudget={errorFormBudget}
                        handleSubmitBudget={handleSubmitBudget}
                        isLoadingBudget={isLoadingBudget}
                        successEditBudget={successEditBudget}
                      />
                    </>
                  )}
                </div>

                <div className="lg:col-span-1 mx-auto mt-20 lg:my-auto">
                  {isErrorGetGoal ? (
                    <SomethingWentWrong />
                  ) : isGoalEmpty ? (
                    <AddGoalCard onClick={handleOpenAddGoal} />
                  ) : isLoadingGetGoal ? (
                    <Loading />
                  ) : (
                    <GoalsCard
                      title={goalData?.title}
                      currentAmount={goalData?.currentBalance || 0}
                      goalAmount={goalData?.targetGoal || 0}
                      onEdit={() => setOpenGoal(true)}
                      onDelete={handleDeleteGoal}
                      onContribute={() => setOpenContribute(true)}
                    />
                  )}

                  {openGoal && (
                    <GoalDialog
                      openGoal={openGoal}
                      setOpenGoal={setOpenGoal}
                      onClose={() => setOpenGoal(false)}
                      isLoadingGoal={isLoadingGoal}
                      handleSubmitGoal={handleSubmitGoal}
                      errorFormGoal={errorFormGoal}
                      dataEditGoal={goalData ? dataGetGoal : null}
                    />
                  )}

                  {openContribute && (
                    <ContributeGoalDialog
                      openContribute={openContribute}
                      setOpenContribute={setOpenContribute}
                      onClose={() => setOpenContribute(false)}
                      isLoadingContribute={isLoadingGoal}
                      handleSubmitContribute={handleSubmitContribute}
                      errorFormContribute={errorFormContribute}
                    />
                  )}
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
