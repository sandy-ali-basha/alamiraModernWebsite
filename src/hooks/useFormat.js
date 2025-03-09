import { useMemo } from 'react';

const useFormat = (price, options = {}) => {
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      ...options,
    }).format(price);
  }, [price, options]);

  return formattedPrice;
};

export default useFormat;
