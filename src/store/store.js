import { configureStore } from "@reduxjs/toolkit";

import errorDashboardPageSlice from "@/features/dashboard/errorDashboard";
import errorTransactionsPageSlice from "@/features/transactions/errorTransactions";
import addTransactionsPageSlice from "@/features/transactions/addTransactions";
import editTransactionsPageSlice from "@/features/transactions/editTransactions";

export const store = configureStore({
  reducer: { errorDashboard: errorDashboardPageSlice, errorTransactions: errorTransactionsPageSlice, addTransactions: addTransactionsPageSlice, editTransactions: editTransactionsPageSlice },
});
