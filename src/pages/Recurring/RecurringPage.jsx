import MainComponent from "@/features/Recurring/component/MainComponent";
import NavigationComponent from "@/features/Recurring/component/NavigationComponent";
import useAddBudget from "@/hooks/recurring/useAddBudget";
import useGetBudget from "@/hooks/recurring/useGetBudget";
import useGetGoal from "@/hooks/recurring/useGetGoal";
import useAddGoal from "@/hooks/recurring/useAddGoal";
import useEditGoal from "@/hooks/recurring/useEditGoal";
import useDeleteGoal from "@/hooks/recurring/useDeleteGoal";
import useContributeGoal from "@/hooks/recurring/useContributeGoal";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import useGetUserIdFromLocalStorage from "@/hooks/others/useGetUserIdFromLocalStorage ";
import validateBudget from "@/utils/budget/validateBudget";
import useEditBudget from "@/hooks/recurring/useEditBudget";

const RecurringPage = () => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const user_id = useGetUserIdFromLocalStorage();
  const [isLoadingBudget, setIsLoadingBudget] = useState(false);
  const [isLoadingGoal, setIsLoadingGoal] = useState(false);
  const [errorFormBudget, setErrorFormBudget] = useState({ isValidate: true, budget: "", categories: {} });
  const [errorFormGoal, setErrorFormGoal] = useState({ isValidate: true, title: "", targetGoal: "" });
  const [successAddBudget, setSuccessAddBudget] = useState(false);
  const [successEditBudget, setSuccessEditBudget] = useState(false);
  const [successAddGoal, setSuccessAddGoal] = useState(false);
  const [successEditGoal, setSuccessEditGoal] = useState(false);
  const [errorFormContribute, setErrorFormContribute] = useState({ isValidate: true, amount: "" });

  const handleLoading = (loadingState) => {
    setIsLoadingBudget(loadingState);
  };

  const { isError: isErrorGetBudget, error: errorGetBudget, data: dataGetBudget, isLoading: isLoadingGetBudget } = useGetBudget({ accessToken });
  const { isError: isErrorAddBudget, error: errorAddBudget, data: dataAddBudget, mutate: mutateAddBudget } = useAddBudget({ handleLoading });
  const { isError: isErrorEditBudget, error: errorEditBudget, data: dataEditBudget, mutate: mutateEditBudget } = useEditBudget({ handleLoading });
  const { isError: isErrorGetGoal, error: errorGetGoal, data: dataGetGoal, isLoading: isLoadingGetGoal } = useGetGoal({ accessToken });
  const { isError: isErrorAddGoal, error: errorAddGoal, data: dataAddGoal, mutate: mutateAddGoal } = useAddGoal({ handleLoading: (s) => setIsLoadingGoal(s) });
  const { isError: isErrorEditGoal, error: errorEditGoal, data: dataEditGoal, mutate: mutateEditGoal } = useEditGoal({ handleLoading: (s) => setIsLoadingGoal(s) });
  const { isError: isErrorDeleteGoal, error: errorDeleteGoal, data: dataDeleteGoal, mutate: mutateDeleteGoal } = useDeleteGoal({ handleLoading: (s) => setIsLoadingGoal(s) });
  const { isError: isErrorContributeGoal, error: errorContributeGoal, data: dataContributeGoal, mutate: mutateContributeGoal } = useContributeGoal({ handleLoading: (s) => setIsLoadingGoal(s) });

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

  // if success add budget sooner
  useEffect(() => {
    if (dataAddBudget) {
      setSuccessAddBudget(true);
      toast.success("Budget added successfully.");
    }
  }, [dataAddBudget]);

  useEffect(() => {
    if (dataAddGoal) {
      setSuccessAddGoal(true);
      toast.success("Goal added successfully.");
    }
  }, [dataAddGoal]);

  // if error add budget sooner
  useEffect(() => {
    if (isErrorAddBudget) {
      toast.error("Failed to add budget. Please try again.");
    }
  }, [isErrorAddBudget]);

  useEffect(() => {
    if (isErrorAddGoal) {
      toast.error("Failed to add goal. Please try again.");
    }
  }, [isErrorAddGoal]);

  // if success edit budget sooner
  useEffect(() => {
    if (dataEditBudget) {
      setSuccessEditBudget(true);
      toast.success("Budget edited successfully.");
    }
  }, [dataEditBudget]);

  useEffect(() => {
    if (dataEditGoal) {
      setSuccessEditGoal(true);
      toast.success("Goal edited successfully.");
    }
  }, [dataEditGoal]);

  // if error edit budget sooner
  useEffect(() => {
    if (isErrorEditBudget) {
      toast.error("Failed to edit budget. Please try again.");
    }
  }, [isErrorEditBudget]);

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

  useEffect(() => {
    if (dataContributeGoal) {
      toast.success("Contributed to goal successfully.");
    }
  }, [dataContributeGoal]);

  useEffect(() => {
    if (isErrorDeleteGoal) {
      toast.error("Failed to delete goal. Please try again.");
    }
  }, [isErrorDeleteGoal]);

  useEffect(() => {
    if (isErrorContributeGoal) {
      toast.error("Failed to contribute to goal. Please try again.");
    }
  }, [isErrorContributeGoal]);

  const handleDeleteGoal = () => {
    mutateDeleteGoal({ dataTransactions: { user_id } });
  };

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
        isErrorGetBudget={isErrorGetBudget}
        errorGetBudget={errorGetBudget}
        dataGetBudget={dataGetBudget}
        isLoading={isLoadingGetBudget}
        isLoadingBudget={isLoadingBudget}
        handleSubmitBudget={handleSubmitBudget}
        errorFormBudget={errorFormBudget}
        successAddBudget={successAddBudget}
        successEditBudget={successEditBudget}
        // goal props
        isErrorGetGoal={isErrorGetGoal}
        errorGetGoal={errorGetGoal}
        dataGetGoal={dataGetGoal}
        isLoadingGetGoal={isLoadingGetGoal}
        isLoadingGoal={isLoadingGoal}
        handleSubmitGoal={handleSubmitGoal}
        errorFormGoal={errorFormGoal}
        successAddGoal={successAddGoal}
        successEditGoal={successEditGoal}
        handleDeleteGoal={handleDeleteGoal}
        handleSubmitContribute={handleSubmitContribute}
        errorFormContribute={errorFormContribute}
      />
      <Toaster position="top-center" richColors />;
    </div>
  );
};

export default RecurringPage;
