import { Navigate, Outlet } from "react-router-dom";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";

const PublicLayout = () => {
  const { user } = UseAuthContext();
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!user) {
  //       setUserLoading(false);
  //     }
  //   }, 1000);
  // }, []);
  // if (userLoading) return <div>Loading...</div>;

  if (user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PublicLayout;
