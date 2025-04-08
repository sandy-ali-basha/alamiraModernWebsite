import create from "zustand";

export const ValueStore = create((set) => ({
  value: 'paypal',
  setValue: (id) => {
    set(() => ({ value: id }));
  },
}));

export const orderStore = create((set) => ({
  orderData: null,
  setOrderData: (id) => {
    set(() => ({ orderData: id }));
  },
}));
