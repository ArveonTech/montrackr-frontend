const typeList = ["income", "expense"];
const categoryList = ["essentials", "lifestyle", "health", "family & social", "financial", "salary", "bonus", "freelance", "business", "gift", "others"];

const convertToParams = ({ type, category, sort, search, page, limit }) => {
  let params = `page=${page}&limit=${limit}`;

  if (type) params += `&type=${type}`;

  if (category) params += `&category=${category}`;

  if (search) params += `&searchQuery=${search}`;

  if (sort) params += `&sortBy=${sort}`;

  return params;
};

export default convertToParams;
