import { _AuthApi } from "api/auth";
import { Navigate } from "react-router-dom";

const ShouldNotBeLogged = ({ children }) => {

  if (_AuthApi.getToken()) {
    return <Navigate to="/login" />
  }

  return children;
};

export default ShouldNotBeLogged;
