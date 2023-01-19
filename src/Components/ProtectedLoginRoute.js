import { Navigate, Outlet, useLocation } from "react-router-dom";
import FetchLoader from "./FetchLoader";


const ProtectedLoginRoute = ({ user }) => {
  const location = useLocation();
  if (user === null) {
    return <FetchLoader />;
  }



  if (user.loggedIn && user.userType === "admin") {
    return (
      <Navigate to="/admin/dashboard" state={{ from: location }} replace />
    );
  } else if (user.loggedIn && user.userType === "user") {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (user.loggedIn && user.userType === "navigator") {
    return <Navigate to="/navigator/dashboard" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedLoginRoute;
