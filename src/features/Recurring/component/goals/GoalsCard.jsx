import SemiCircularProgress from "./SemiCircularProgress";
import GoalSummary from "./GoalSummary";
import { Pencil, Trash2 } from "lucide-react";

const GoalsCard = ({ currentAmount = 0, goalAmount = 1000000, onEdit = () => {}, onDelete = () => {}, title, onContribute }) => {
  return (
    <div className="w-full max-w-[105 rounded-xl bg-[#f5f7f7] p-4 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-base font-extrabold text-slate-900">Goals</div>

        <div className="flex items-center gap-3">
          <div className="cursor-pointer" onClick={onEdit}>
            <Pencil size={18} />
          </div>
          <div className="cursor-pointer text-red-500" onClick={onDelete}>
            <Trash2 size={18} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center">
        <div className="flex flex-1 items-center justify-center">
          <SemiCircularProgress current={currentAmount} goal={goalAmount} />
        </div>
        <h1 className="mt-4">{title}</h1>
        <div className="mt-1.5">
          <GoalSummary current={currentAmount} goal={goalAmount} />
        </div>

        <div className="mt-4 w-full flex justify-center">
          <button type="button" onClick={onContribute} className="px-3 py-1 rounded bg-primary text-white">
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsCard;
