import { Navigate, Outlet } from "react-router-dom";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";

const PublicLayout = () => {
  const { user } = UseAuthContext();

  if (user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PublicLayout;
