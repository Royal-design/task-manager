import { Navigate, Outlet } from "react-router-dom";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";

export const ProtectedPages = () => {
  const { user, userLoading, setUserLoading } = UseAuthContext();
  //   useEffect(() => {
  //     setTimeout(() => {
  //       if (!user) {
  //         setUserLoading(false);
  //       }
  //     }, 1000);
  //   }, []);

  if (userLoading && !user) return <div>Loading...</div>;
  if (!user) {
    <Navigate to="/login" />;
    setUserLoading(false);
  }

  return <Outlet />;
};
