import { _AuthApi } from "api/auth";
import { Navigate, useLocation } from "react-router-dom";

const ShouldBeLogged = ({ children }) => {
  let location = useLocation();

  if (!_AuthApi.getToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};


export default ShouldBeLogged