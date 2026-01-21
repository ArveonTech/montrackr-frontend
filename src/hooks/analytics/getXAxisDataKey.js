const getXAxisDataKey = ({ startRange, endRange }) => {
  const yearNow = new Date().getFullYear();
  const defaultStartRangeQuery = new Date(yearNow, 0, 1, 0, 0, 0, 0);
  const defaultEndRangeQuery = new Date(yearNow, 11, 31, 23, 59, 59, 999);
  const startRangeQuery = startRange || defaultStartRangeQuery;
  const endRangeQuery = endRange || defaultEndRangeQuery;
  const dateStartMonth = new Date(startRangeQuery).getFullYear() * 12 + new Date(startRangeQuery).getMonth();
  const dateEndMonth = new Date(endRangeQuery).getFullYear() * 12 + new Date(endRangeQuery).getMonth();
  const monthDifference = dateEndMonth - dateStartMonth;

  if (monthDifference < 0) {
    return "";
  } else if (monthDifference >= 0 && monthDifference <= 1) {
    return "day";
  } else if (monthDifference > 1 && monthDifference <= 12) {
    return "month";
  } else {
    return "year";
  }
};

export default getXAxisDataKey;
