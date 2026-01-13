import SkeletonCard from "@/features/others/SkeletonCard";

import CardComponent from "../../others/CardComponent";
import RecentTransactionsEmpty from "./RecentTransactionsEmpty";

const RecentTransactions = ({ dataTransactions, isLoading }) => {
  return (
    <div className="flex justify-center flex-col items-center gap-10 lg:gap-5">
      {/* SKELETON (shadcn) */}
      {isLoading && <SkeletonCard />}

      {/* DATA */}
      {!isLoading && dataTransactions?.length > 0 ? dataTransactions?.map((item, index) => <CardComponent item={item} key={index} className={`w-96 max-w-md lg:w-full `} />) : <RecentTransactionsEmpty />}
    </div>
  );
};

export default RecentTransactions;
