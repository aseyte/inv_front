import { Navigate, Outlet, useLocation } from "react-router-dom";
import FetchLoader from "./FetchLoader";

const ProtectedRoute = ({ user }) => {
  const location = useLocation();

  if (user === null) {
    return <FetchLoader />;
  }

  if (user?.loggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
