import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  const location = useLocation();
  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
