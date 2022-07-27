import { Navigate, Outlet, useLocation } from "react-router-dom";
import FetchLoader from "./FetchLoader";
import VerificationModal from "./VerificationModal";

const ProtectedRoute = ({ user, verified }) => {
  const location = useLocation();

  if (user === null) {
    return <FetchLoader />;
  }

  if (user?.loggedIn && user?.verified) {
    return <Outlet />;
  } else if (user?.loggedIn && user?.verified === false) {
    return <VerificationModal />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
