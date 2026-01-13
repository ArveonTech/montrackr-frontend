import { useState, useEffect } from "react";

const useDebounce = ({ value, delay }) => {
  const [debunceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debunceValue;
};

export default useDebounce;
