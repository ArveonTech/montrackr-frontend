import React from "react";
import SemiCircularProgress from "./SemiCircularProgress";
import GoalSummary from "./GoalSummary";
import { Pencil } from "lucide-react";

const GoalsCard = ({ currentAmount = 9000000, goalAmount = 12000000 }) => {
  return (
    <div className="w-full max-w-[105 rounded-xl bg-[#f5f7f7] p-4 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-base font-extrabold text-slate-900">Goals</div>

        <div className="flex items-center">
          <Pencil size={18} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center">
        <div className="flex flex-1 items-center justify-center">
          <SemiCircularProgress current={currentAmount} goal={goalAmount} />
        </div>

        <h1>Title</h1>
        <div className="mt-1.5">
          <GoalSummary current={currentAmount} goal={goalAmount} />
        </div>
      </div>
    </div>
  );
};

export default GoalsCard;
