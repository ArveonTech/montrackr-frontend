const DialogTransactions = ({ item }) => {
  return (
    <>
      <p className="capitalize">
        <strong>Title</strong>: {item.title}
      </p>
      <p>
        <strong>Amount</strong>: Rp.{Number(item?.amount).toLocaleString("id-ID")}
      </p>
      <p className="capitalize">
        <strong>Type</strong>: {item.type}
      </p>
      <p className="capitalize">
        <strong>Category</strong>: {item.category}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(item?.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="capitalize">
        <strong>Payment Method</strong>: {item.paymentMethod}
      </p>
      <p className="capitalize">
        <strong>Description</strong>: {item.description}
      </p>
    </>
  );
};

export default DialogTransactions;
