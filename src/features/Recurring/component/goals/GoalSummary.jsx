import React from "react";

const formatRupiah = (value) => {
  if (typeof value !== "number") return value;
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
};

const GoalSummary = ({ current = 0, goal = 0 }) => {
  const remaining = Math.max(0, goal - current);
  const achieved = current >= goal;

  return (
    <div style={{ textAlign: "center", marginTop: 12 }}>
      <div style={{ fontSize: 14, color: "#0f172a", fontWeight: 700 }}>{formatRupiah(goal)}</div>
      <div style={{ marginTop: 6, fontSize: 13, color: achieved ? "#16a34a" : "#475569" }}>
        {achieved ? "Goal achieved 🎉" : `You need ${formatRupiah(remaining)} to meet the goal`}
      </div>
    </div>
  );
};

export default GoalSummary;
