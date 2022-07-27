import { Navigate, Outlet, useLocation } from "react-router-dom";
import VerificationModal from "./VerificationModal";


const ProtectedLoginRoute = ({ user, verified }) => {
  const location = useLocation();
  if (user === null) {
    return null;
  }

  if (user?.loggedIn && user?.verified) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (user?.loggedIn && user?.verified === false) {
    return <VerificationModal />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedLoginRoute;
