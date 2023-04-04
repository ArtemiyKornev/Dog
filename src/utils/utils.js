import { useEffect, useState } from "react";

export const getIssues = (numb) => {
  const tmp = numb % 10;
  if (tmp === 1) return " товар";
  if (tmp > 1 && tmp < 5) return " товара";
  if (tmp > 4 || !numb) return " товаров";
};

export const useDebounce = (searchQuery, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(searchQuery);
 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, delay);

    return () => clearTimeout(timeout);
  }, [searchQuery]);
  return debounceValue;
};

export const findLike = (product, currentUser) =>
product?.likes?.some((el) => el === currentUser._id);