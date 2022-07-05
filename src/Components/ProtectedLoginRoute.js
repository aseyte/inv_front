import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedLoginRoute = ({ user }) => {
  const location = useLocation();
  if (user === null) {
    return null;
  }

  if (user?.loggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }  else {
    return <Outlet />;
  }
};

export default ProtectedLoginRoute;
