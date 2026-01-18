const DialogSubscription = ({ item }) => {
  return (
    <>
      <p className="capitalize">
        <strong>Title</strong>: {item.title}
      </p>
      <p>
        <strong>Amount</strong>: Rp {Number(item?.amount).toLocaleString("id-ID")}
      </p>
      <p className="capitalize">
        <strong>Interval</strong>: {item.interval}
      </p>
      <p className="capitalize">
        <strong>Next Payment</strong>:{" "}
        {new Date(item?.nextPayment).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p>
        <strong>Joined:</strong>{" "}
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
        <strong>Status</strong>: {item.status}
      </p>
    </>
  );
};

export default DialogSubscription;
