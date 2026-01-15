import MainComponent from "@/features/Recurring/component/MainComponent";
import NavigationComponent from "@/features/Recurring/component/NavigationComponent";
import useAddBudget from "@/hooks/recurring/useAddBudget";
import useGetBudget from "@/hooks/recurring/useGetBudget";
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
  const [errorFormBudget, setErrorFormBudget] = useState({ isValidate: true, budget: "", categories: {} });
  const [successAddBudget, setSuccessAddBudget] = useState(false);
  const [successEditBudget, setSuccessEditBudget] = useState(false);

  const handleLoading = (loadingState) => {
    setIsLoadingBudget(loadingState);
  };

  const { isError: isErrorGetBudget, error: errorGetBudget, data: dataGetBudget, isLoading: isLoadingGetBudget } = useGetBudget({ accessToken });
  const { isError: isErrorAddBudget, error: errorAddBudget, data: dataAddBudget, mutate: mutateAddBudget } = useAddBudget({ handleLoading });
  const { isError: isErrorEditBudget, error: errorEditBudget, data: dataEditBudget, mutate: mutateEditBudget } = useEditBudget({ handleLoading });

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
      />
      <Toaster position="top-center" richColors />;
    </div>
  );
};

export default RecurringPage;
