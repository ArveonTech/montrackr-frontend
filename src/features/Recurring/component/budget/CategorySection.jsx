import { useState } from "react";
import CategoryItem from "./CategoryItem";
import { Ellipsis, HeartPlus, Pencil, Sparkles, Users, Wallet, ShoppingCart } from "lucide-react";

const CategorySection = ({ categoryBudget }) => {
  const [addBudgetOpen, setAddBudgetOpen] = useState(false);

  const data = [
    { name: "Essentials", amount: categoryBudget?.essentials, icon: <ShoppingCart size={18} />, value: "essentials" },
    { name: "Lifestyle", amount: categoryBudget?.lifestyle, icon: <Sparkles size={18} />, value: "lifestyle" },
    { name: "Family & Social", amount: categoryBudget?.["family & social"], icon: <Users size={18} />, value: "family & social" },
    { name: "Health", amount: categoryBudget?.health, icon: <HeartPlus size={18} />, value: "health" },
    { name: "Financial", amount: categoryBudget?.financial, icon: <Wallet size={18} />, value: "financial" },
    { name: "Others", amount: categoryBudget?.others, icon: <Ellipsis size={18} />, value: "others" },
  ];

  const total = data.reduce((s, i) => s + i.amount, 0);

  return (
    <section className="rounded-xl bg-[#F4FAFA] p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <h5 className="text-lg font-semibold text-slate-700">Category</h5>
        <Pencil size={16} className="cursor-pointer text-slate-500" />
      </div>

      {/* Category list */}
      <div className="grid sm:grid-cols-2 gap-3">
        {data.map((c) => (
          <CategoryItem key={c.name} name={c.name} amount={c.amount} icon={c.icon} value={c.value} />
        ))}
      </div>

      {/* Total */}
      <div className="rounded-lg bg-destructive text-destructive-foreground px-4 py-3 mt-4">
        <div className="text-sm">Total Category :</div>
        <div className="text-lg font-semibold">{`Rp ${new Intl.NumberFormat("id-ID").format(total)}`}</div>
      </div>
    </section>
  );
};

export default CategorySection;
