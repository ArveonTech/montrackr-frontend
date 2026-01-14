const formatRupiah = (value) => {
  if (typeof value !== "number") return value;
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
};

const CategoryItem = ({ name, amount, icon, value }) => {
  const href = `/transactions?type=expense&page=1&limit=10&category=${encodeURIComponent(value)}`;

  return (
    <a href={href} className="block rounded-xl text-inherit no-underline">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-slate-50">
        {/* left */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">{icon ?? <div className="h-4.5 w-4.5 rounded bg-slate-400" />}</div>

          <div className="text-sm font-semibold text-slate-900">{name}</div>
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* amount */}
        <div className="ml-3 text-sm font-bold text-emerald-700">{formatRupiah(amount)}</div>
      </div>
    </a>
  );
};

export default CategoryItem;
