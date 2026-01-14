import Loading from "@/features/others/Loading";
import React from "react";

const formatCurrency = (value) => {
  if (typeof value !== "number") return value || "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function BudgetMoneySection({ amount = 0, budget = 0, loading = false }) {
  const overBudget = budget > 0 ? amount > budget : false;
  const ratio = budget > 0 ? amount / budget : 0;
  const barWidth = Math.min(100, Math.round(ratio * 100));

  if (loading) {
    return (
      <section className="w-full rounded-lg bg-[#f5f7f7] p-4">
        <Loading />
      </section>
    );
  }

  if (!budget || budget === 0) {
    return (
      <section className="w-130 rounded-lg bg-[#f5f7f7] p-4">
        <div className="text-lg font-bold">No budget set</div>
      </section>
    );
  }

  return (
    <section className="w-full rounded-lg bg-[#f5f7f7] p-4">
      {/* amount */}
      <div className="flex items-baseline gap-3">
        <div className="text-xl md:text-3xl font-bold">{formatCurrency(amount)}</div>
        <div className="text-sm text-slate-600">/ {formatCurrency(budget)} /month</div>
      </div>

      {/* progress */}
      <div className="mt-3">
        <div className="h-2.5 overflow-hidden rounded-md bg-[#e6edf0]">
          <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={barWidth} className={`h-full transition-all duration-300 ${overBudget ? "bg-red-500" : "bg-emerald-600"}`} style={{ width: `${barWidth}%` }} />
        </div>

        {overBudget && <div className="mt-2 text-sm text-red-700">Over budget</div>}
      </div>
    </section>
  );
}
