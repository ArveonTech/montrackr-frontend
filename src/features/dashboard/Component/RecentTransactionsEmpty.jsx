const RecentTransactionsEmpty = () => {
  return (
    <div className="rounded-xl border p-4 shadow-sm w-96 max-w-md lg:w-full ">
      <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>

      <div className="py-5 text-center text-gray-500">
        <p className="text-sm">Transactions not found</p>
      </div>
    </div>
  );
};

export default RecentTransactionsEmpty;
