import { _axios } from "interceptor/http-config";

export const _AuthApi = {
  login: (data) => {
    return _axios.post("/login", data).then((res) => {
      return res;
    });
  },

  getUserData: (data) => {
    return _axios.post("/auth/google/callback", data).then((res) => res.data);
  },
  

  register: (data) => {
    return _axios.post("/register", data).then((res) => {
      return res;
    });
  },
  update: (id, data) => {
    return _axios.post("/customers/" + id, data).then((res) => {
      return res;
    });
  },

  verifyEmail: (data) => {
    return _axios.post("/forgot-password", data).then((res) => {
      return res;
    });
  },

  storeToken: (access_token) => {
    localStorage.setItem("access_token", access_token);
  },

  getToken: () => localStorage.getItem("access_token"),

  destroyToken: () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  },

  resetPass: (token, data) => {
    return _axios
      .post(`/reset-password/${token}`, data)
      .then((res) => res?.data);
  },
  forgetPass: (data) => {
    return _axios.post("/forgot-password", data).then((res) => res?.data);
  },

  verifyCode: (data) => {
    return _axios
      .post("/checkCode", data)
      .then((res) => {
        console.log("done");
        return res;
      })
      .catch((error) => {
        console.error("Verify code error:", error);
        throw error;
      });
  },

  passEdit: (data) => {
    return _axios
      .post("/change-password", data)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error("Edit password error:", error);
        throw error;
      });
  },
  delete : (id)=>{
    return _axios
      .delete(`/customers/${id}`)
      .then((res) => {
        return res;
      })
  }
};
