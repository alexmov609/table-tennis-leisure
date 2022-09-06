import { Navigate, Outlet } from "react-router-dom";

//Component that is responsible for letting authenticated user to switch to
// every page the user has permission for
const PermissionRequired = ({ hasPermission, redirectPath = "/" }) => {
  if (!hasPermission) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PermissionRequired;
