import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../AppContext/Context";
import { useEffect, useState } from "react";


const RequireAdmin = () => {
  const { isAdmin, fetchAdminStatus } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      await fetchAdminStatus(); 
      setLoading(false);        
    };
    checkAdmin();
  }, []);
 
  if (loading) {
    return <div className="text-center mt-10">Checking admin access...</div>;
  }


  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};


export default RequireAdmin;


