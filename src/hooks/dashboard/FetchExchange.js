import { useMutation } from "@tanstack/react-query";

const fetchExchange = async ({ amount, from }) => {
  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=IDR`);
  if (!res.ok) throw new Error("Failed convert");
  return res.json();
};

const useExchangeToIDR = () => {
  return useMutation({
    mutationFn: fetchExchange,
  });
};

export default useExchangeToIDR;
