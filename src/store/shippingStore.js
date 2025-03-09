import create from "zustand";

export const AddressStore = create((set) => ({
  shippingAddress: undefined,

  setShippingAddress: (data) => {
    set(() => ({ shippingAddress: data }));
  },
}));
