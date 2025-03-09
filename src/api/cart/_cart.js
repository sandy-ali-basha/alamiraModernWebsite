import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
export const _cart = {
  index: async (id) => {
    try {
      const response = await _axios.get(`/cart/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  },

  uploadData: async ({ data, quantity, product_id, color, size }) => {
    const encodedColor = encodeURIComponent(color);
    return _axios
      .get(
        `user/cart/addProduct/${product_id}?quantity=${quantity}&size=${size}&color=${encodedColor}`,
        data
      )
      .then((res) => res.data);
  },
  AddToCart: async ({ data, cart_id }) => {
    try {
      const response = await _axios.post(
        `cart${cart_id ? "/" + cart_id : ""}`,
        data,
        {
          headers: {
            ...HttpRequestInterceptor(),
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle or throw the error as needed
      console.error("Error adding to cart:", error);
      throw error;
    }
  },
  UpdateCart: async ({ data, cart_id }) => {
    return _axios
      .post(`cart${cart_id ? "/" + cart_id : ""}`, data)
      .then((res) => res.data);
  },

  delete: async ({ id, cart_id }) => {
    return _axios
      .delete(`cart/${cart_id}`, {
        data: {
          product_id: id,
        },
      })
      .then((res) => res.data);
  },
  coupon: async ({ data }) => {
    return _axios.post(`/coupon`, data).then((res) => res.data);
  },
  points: async ({ data }) => {
    return _axios.post(`/use-points`, data).then((res) => res.data);
  },
};
