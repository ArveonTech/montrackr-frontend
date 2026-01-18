import MainComponent from "@/features/Recurring/component/MainComponent";
import NavigationComponent from "@/features/Recurring/component/NavigationComponent";
import useAddBudget from "@/hooks/recurring/useAddBudget";
import useGetBudget from "@/hooks/recurring/useGetBudget";
import useGetGoal from "@/hooks/recurring/useGetGoal";
import useAddGoal from "@/hooks/recurring/useAddGoal";
import useEditGoal from "@/hooks/recurring/useEditGoal";
import useDeleteGoal from "@/hooks/recurring/useDeleteGoal";
import useContributeGoal from "@/hooks/recurring/useContributeGoal";
import useGetSubscriptions from "@/hooks/recurring/useGetSubscriptions";
import useAddSubscription from "@/hooks/recurring/useAddSubscription";
import useEditSubscription from "@/hooks/recurring/useEditSubscription";
import useDeleteSubscription from "@/hooks/recurring/useDeleteSubscription";
import usePaySubscription from "@/hooks/recurring/usePaySubscription";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import useGetUserIdFromLocalStorage from "@/hooks/others/useGetUserIdFromLocalStorage ";
import validateBudget from "@/utils/budget/validateBudget";
import useEditBudget from "@/hooks/recurring/useEditBudget";
import useParamsControllers from "@/hooks/others/useParamsControllers";

const RecurringPage = () => {
  const { getParam } = useParamsControllers();
  const accessToken = localStorage.getItem("accessToken") || "";
  const user_id = useGetUserIdFromLocalStorage();

  const pageParams = parseInt(getParam("page")) || 1;
  const limitPageParams = parseInt(getParam("limit")) || 10;

  // loading states
  const [isLoadingBudget, setIsLoadingBudget] = useState(false);
  const [isLoadingGoal, setIsLoadingGoal] = useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  // form error states
  const [errorFormBudget, setErrorFormBudget] = useState({ isValidate: true, budget: "", categories: {} });
  const [errorFormGoal, setErrorFormGoal] = useState({ isValidate: true, title: "", targetGoal: "" });

  // success states
  const [successAddBudget, setSuccessAddBudget] = useState(false);
  const [successEditBudget, setSuccessEditBudget] = useState(false);
  const [successAddGoal, setSuccessAddGoal] = useState(false);
  const [successEditGoal, setSuccessEditGoal] = useState(false);
  const [errorFormContribute, setErrorFormContribute] = useState({ isValidate: true, amount: "" });

  const handleLoading = (loadingState) => {
    setIsLoadingBudget(loadingState);
  };

  const handleLoadingSubscription = (loadingState) => {
    setIsLoadingSubscription(loadingState);
  };

  // budget hooks
  const { isError: isErrorGetBudget, error: errorGetBudget, data: dataGetBudget, isLoading: isLoadingGetBudget } = useGetBudget({ accessToken });
  const { isError: isErrorAddBudget, error: errorAddBudget, data: dataAddBudget, mutate: mutateAddBudget } = useAddBudget({ handleLoading });
  const { isError: isErrorEditBudget, error: errorEditBudget, data: dataEditBudget, mutate: mutateEditBudget } = useEditBudget({ handleLoading });
  const { isError: isErrorGetGoal, error: errorGetGoal, data: dataGetGoal, isLoading: isLoadingGetGoal } = useGetGoal({ accessToken });
  const { isError: isErrorAddGoal, error: errorAddGoal, data: dataAddGoal, mutate: mutateAddGoal } = useAddGoal({ handleLoading: (s) => setIsLoadingGoal(s) });
  const { isError: isErrorEditGoal, error: errorEditGoal, data: dataEditGoal, mutate: mutateEditGoal } = useEditGoal({ handleLoading: (s) => setIsLoadingGoal(s) });
  const { isError: isErrorDeleteGoal, error: errorDeleteGoal, data: dataDeleteGoal, mutate: mutateDeleteGoal } = useDeleteGoal({ handleLoading: (s) => setIsLoadingGoal(s) });
  const { isError: isErrorContributeGoal, error: errorContributeGoal, data: dataContributeGoal, mutate: mutateContributeGoal } = useContributeGoal({ handleLoading: (s) => setIsLoadingGoal(s) });

  // subscription hooks
  const { isError: isErrorGetSubscriptions, error: errorGetSubscriptions, data: dataGetSubscriptions, isLoading: isLoadingGetSubscriptions } = useGetSubscriptions({ accessToken, page: pageParams, limit: limitPageParams });
  const { isError: isErrorAddSubscription, error: errorAddSubscription, data: dataAddSubscription, mutate: mutateAddSubscription } = useAddSubscription({ handleLoading: handleLoadingSubscription });
  const { isError: isErrorEditSubscription, error: errorEditSubscription, data: dataEditSubscription, mutate: mutateEditSubscription } = useEditSubscription({ handleLoading: handleLoadingSubscription });
  const { isError: isErrorDeleteSubscription, error: errorDeleteSubscription, data: dataDeleteSubscription, mutate: mutateDeleteSubscription } = useDeleteSubscription({ handleLoading: handleLoadingSubscription });
  const { isError: isErrorPaySubscription, error: errorPaySubscription, data: dataPaySubscription, mutate: mutatePaySubscription } = usePaySubscription({ handleLoading: handleLoadingSubscription });

  // handlers submit badget and goal
  const handleSubmitBudget = (e, totalBudget, formBudget, status) => {
    e.preventDefault();
    if (!formBudget || !totalBudget) return;

    const resutlValidate = validateBudget(totalBudget, formBudget);

    if (!resutlValidate.isValidate) return setErrorFormBudget(resutlValidate);

    setErrorFormBudget({ budget: "", categories: {} });

    const dataTransactions = { user_id, budget: totalBudget, categories: formBudget };

    if (status === "edit") {
      mutateEditBudget({ dataTransactions });
    } else {
      mutateAddBudget({ dataTransactions });
    }
  };

  // goal submit handler
  const handleSubmitGoal = (e, formGoal, status) => {
    e.preventDefault();
    if (!formGoal) return;

    // minimal validation: title and targetGoal required
    if (!formGoal.title || !formGoal.title.trim()) return setErrorFormGoal({ isValidate: false, title: "Title is required", targetGoal: "" });

    if (!formGoal.targetGoal || !formGoal.targetGoal.trim()) return setErrorFormGoal({ isValidate: false, title: "", targetGoal: "Target goal is required" });

    setErrorFormGoal({ isValidate: true, title: "", targetGoal: "" });

    const dataTransactions = { user_id, title: formGoal.title, targetGoal: formGoal.targetGoal, currentBalance: formGoal.currentBalance || "0" };

    if (status === "edit") {
      mutateEditGoal({ dataTransactions });
    } else {
      mutateAddGoal({ dataTransactions });
    }
  };

  // subscription submit handler
  const handleSubmitSubscription = (e, formSubcription, status, idSubscription) => {
    e.preventDefault();

    if (!formSubcription) return;

    const dataTransactions = {
      user_id,
      title: formSubcription.title,
      amount: String(formSubcription.amount),
      interval: formSubcription.interval,
      paymentMethod: formSubcription.paymentMethod,
      date: formSubcription.date,
      status: formSubcription.status,
    };

    if (status === "edit") {
      mutateEditSubscription({ dataTransactions, idSubscription });
    } else {
      mutateAddSubscription({ dataTransactions });
    }
  };

  // if success add budget sooner
  useEffect(() => {
    if (dataAddBudget) {
      setSuccessAddBudget(true);
      toast.success("Budget added successfully.");
    }
  }, [dataAddBudget]);

  // if error add budget sooner
  useEffect(() => {
    if (isErrorAddBudget) {
      toast.error("Failed to add budget. Please try again.");
    }
  }, [isErrorAddBudget]);

  // if success edit budget sooner
  useEffect(() => {
    if (dataEditBudget) {
      setSuccessEditBudget(true);
      toast.success("Budget edited successfully.");
    }
  }, [dataEditBudget]);

  // if error edit budget sooner
  useEffect(() => {
    if (isErrorEditBudget) {
      toast.error("Failed to edit budget. Please try again.");
    }
  }, [isErrorEditBudget]);

  // if success add goal sooner
  useEffect(() => {
    if (dataAddGoal) {
      setSuccessAddGoal(true);
      toast.success("Goal added successfully.");
    }
  }, [dataAddGoal]);

  // subscription success handlers
  useEffect(() => {
    if (dataAddSubscription) {
      toast.success("Subscription added successfully.");
    }
  }, [dataAddSubscription]);

  useEffect(() => {
    if (dataEditSubscription) {
      toast.success("Subscription edited successfully.");
    }
  }, [dataEditSubscription]);

  useEffect(() => {
    if (dataDeleteSubscription) {
      toast.success("Subscription canceled.");
    }
  }, [dataDeleteSubscription]);

  useEffect(() => {
    if (dataPaySubscription) {
      toast.success("Subscription payment successful.");
    }
  }, [dataPaySubscription]);

  // subscription error handlers
  useEffect(() => {
    if (isErrorAddSubscription || isErrorEditSubscription || isErrorDeleteSubscription || isErrorPaySubscription) {
      toast.error("Subscription action failed. Please try again.");
    }
  }, [isErrorAddSubscription, isErrorEditSubscription, isErrorDeleteSubscription, isErrorPaySubscription]);

  // if error add goal sooner
  useEffect(() => {
    if (isErrorAddGoal) {
      toast.error("Failed to add goal. Please try again.");
    }
  }, [isErrorAddGoal]);

  // if success edit goal sooner
  useEffect(() => {
    if (dataEditGoal) {
      setSuccessEditGoal(true);
      toast.success("Goal edited successfully.");
    }
  }, [dataEditGoal]);

  // if error edit goal sooner
  useEffect(() => {
    if (isErrorEditGoal) {
      toast.error("Failed to edit goal. Please try again.");
    }
  }, [isErrorEditGoal]);

  // delete goal
  useEffect(() => {
    if (dataDeleteGoal) {
      toast.success("Goal deleted.");
    }
  }, [dataDeleteGoal]);

  // if contribute goal sooner
  useEffect(() => {
    if (dataContributeGoal) {
      toast.success("Contributed to goal successfully.");
    }
  }, [dataContributeGoal]);

  // if error delete goal sooner
  useEffect(() => {
    if (isErrorDeleteGoal) {
      toast.error("Failed to delete goal. Please try again.");
    }
  }, [isErrorDeleteGoal]);

  // if error contribute goal sooner
  useEffect(() => {
    if (isErrorContributeGoal) {
      toast.error("Failed to contribute to goal. Please try again.");
    }
  }, [isErrorContributeGoal]);

  // delete goal handler
  const handleDeleteGoal = () => {
    mutateDeleteGoal({ dataTransactions: { user_id } });
  };

  // contribute goal handler
  const handleSubmitContribute = (e, amount) => {
    e.preventDefault();
    if (!amount || !amount.toString().trim()) return setErrorFormContribute({ isValidate: false, amount: "Amount is required" });

    setErrorFormContribute({ isValidate: true, amount: "" });
    const dataTransactions = { user_id, amount };
    mutateContributeGoal({ dataTransactions });
  };

  return (
    <div>
      <NavigationComponent />
      <MainComponent
        // budget props
        isErrorGetBudget={isErrorGetBudget}
        dataGetBudget={dataGetBudget}
        isLoading={isLoadingGetBudget}
        isLoadingBudget={isLoadingBudget}
        handleSubmitBudget={handleSubmitBudget}
        errorFormBudget={errorFormBudget}
        successAddBudget={successAddBudget}
        successEditBudget={successEditBudget}
        // goal props
        isErrorGetGoal={isErrorGetGoal}
        dataGetGoal={dataGetGoal}
        isLoadingGetGoal={isLoadingGetGoal}
        isLoadingGoal={isLoadingGoal}
        handleSubmitGoal={handleSubmitGoal}
        errorFormGoal={errorFormGoal}
        // contribution props
        successAddGoal={successAddGoal}
        successEditGoal={successEditGoal}
        handleDeleteGoal={handleDeleteGoal}
        handleSubmitContribute={handleSubmitContribute}
        errorFormContribute={errorFormContribute}
        // subscription props
        isErrorGetSubscriptions={isErrorGetSubscriptions}
        dataGetSubscriptions={dataGetSubscriptions}
        isLoadingGetSubscriptions={isLoadingGetSubscriptions}
        mutatePaySubscription={mutatePaySubscription}
        mutateDeleteSubscription={mutateDeleteSubscription}
        handleSubmitSubscription={handleSubmitSubscription}
        isLoadingSubscription={isLoadingSubscription}
      />
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default RecurringPage;
