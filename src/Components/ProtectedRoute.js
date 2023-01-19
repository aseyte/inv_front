import { Navigate, Outlet, useLocation } from "react-router-dom";
import FetchLoader from "./FetchLoader";
import VerificationModal from "./VerificationModal";

const ProtectedRoute = ({ user, role }) => {
  const location = useLocation();

  if (user === null) {
    return <FetchLoader />;
  }

  if (user?.loggedIn && user?.userType === role) {
    return <Outlet />;
  }  else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
