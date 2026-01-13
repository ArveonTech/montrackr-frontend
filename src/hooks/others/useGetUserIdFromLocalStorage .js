const useGetUserIdFromLocalStorage = () => {
  const token = localStorage.getItem("access-token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded._id || null;
  } catch (err) {
    return null;
  }
};

export default useGetUserIdFromLocalStorage;
