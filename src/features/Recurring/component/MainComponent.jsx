import { Activity, useEffect, useState } from "react";
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
import { Plus } from "lucide-react";
import CardComponent from "./subscription/CardComponent";
import FormSubscription from "./subscription/FormSubscription";
import { cn } from "@/lib/utils";
import FooterComponent from "./subscription/FooterComponent";

const MainComponent = ({
  // budget props
  isErrorGetBudget,
  dataGetBudget,
  isLoading,
  isLoadingBudget,
  handleSubmitBudget,
  errorFormBudget,
  successAddBudget,
  successEditBudget,
  // goal props
  isErrorGetGoal,
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
  // subscription props
  isErrorGetSubscriptions,
  dataGetSubscriptions,
  isLoadingGetSubscriptions,
  mutatePaySubscription,
  mutateDeleteSubscription,
  handleSubmitSubscription,
  isLoadingSubscription,
}) => {
  const [activeTab, setActiveTab] = useState("subscriptions");

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

  // state for subscribing goal
  const [openSubscription, setOpenSubscription] = useState(false);

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
        },
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

  // open budget dialogs handlers
  const handleOpenAddBudget = () => {
    setOpenBudget(true);
  };

  // open goal dialog handler
  const handleOpenAddGoal = () => {
    setOpenGoal(true);
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

  // close contribute dialog when contributed
  useEffect(() => {
    if (successAddGoal) {
      setOpenContribute(false);
    }
  }, [successAddGoal]);

  return (
    <div className={cn(`mx-5 md:mx-10 mt-20`)}>
      <header className="flex justify-between items-center">
        <div className="flex md:gap-4">
          <h4 className={cn(`cursor-pointer p-1.5 md:p-2`, activeTab === "budget" && "bg-primary text-primary-foreground rounded")} onClick={() => setActiveTab("budget")}>
            Budget
          </h4>
          <h4 className={cn(`cursor-pointer p-1.5 md:p-2`, activeTab === "subscriptions" && "bg-primary text-primary-foreground rounded")} onClick={() => setActiveTab("subscriptions")}>
            Subscription
          </h4>
        </div>
        <Activity mode={activeTab === "subscriptions" ? "visible" : "hidden"}>
          <div className="flex items-center gap-2 bg-primary rounded px-4 h-fit my-auto py-1 cursor-pointer" onClick={() => setOpenSubscription(true)}>
            <Plus />
            ADD
          </div>
        </Activity>
      </header>

      <main className={cn(activeTab === "subscription" ? "rounded-t-lg" : "")}>
        {openBudget && <BudgetDialog openBudget={openBudget} setOpenBudget={setOpenBudget} onClose={() => setOpenBudget(false)} isLoadingBudget={isLoadingBudget} handleSubmitBudget={handleSubmitBudget} errorFormBudget={errorFormBudget} />}

        {openSubscription && <FormSubscription openSubcription={openSubscription} setOpenSubcription={setOpenSubscription} handleSubmitSubscription={handleSubmitSubscription} onClose={() => setOpenSubscription(false)} />}

        <section className={cn()}>
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
            <div className="p-4 mb-10">
              {isErrorGetSubscriptions ? (
                <SomethingWentWrong />
              ) : isLoadingGetSubscriptions ? (
                <Loading />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
                  {(dataGetSubscriptions?.data?.items || [])
                    .slice()
                    .sort((a, b) => {
                      if (a.status === "canceled" && b.status !== "canceled") return 1;
                      if (a.status !== "canceled" && b.status === "canceled") return -1;

                      const today = new Date();
                      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const da = new Date(a.nextPayment || a.date);
                      const db = new Date(b.nextPayment || b.date);
                      const diffA = Math.ceil((da - startOfToday) / (1000 * 60 * 60 * 24));
                      const diffB = Math.ceil((db - startOfToday) / (1000 * 60 * 60 * 24));

                      return diffA - diffB;
                    })
                    .map((item) => (
                      <CardComponent
                        key={item._id}
                        item={item}
                        mutatePaySubscription={mutatePaySubscription}
                        mutateDeleteSubscription={mutateDeleteSubscription}
                        isLoadingDelete={isLoadingSubscription}
                        handleSubmitSubscription={handleSubmitSubscription}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </section>
        {activeTab === "subscriptions" && <FooterComponent data={dataGetSubscriptions} error={isErrorGetSubscriptions} />}
      </main>
    </div>
  );
};

export default MainComponent;
