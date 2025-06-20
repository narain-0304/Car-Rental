import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// 1. Create the context
const AppContext = createContext();

// 2. Create a provider component
export const AppProvider = ({ children }) => {
  // Global states
  const [showUserLogin, setShowUserLogin] = useState(true);
  const [user,setUser] = useState(null);
  const[isAdmin,setIsAdmin]=useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
        setShowUserLogin(false);
    }
  },[user]);
  
  const fetchUserStatus = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
              setUser(data.user);
              setShowUserLogin(false);
            }
            else{
              setUser(null);
            }
        } catch(error) {
          console.log(error.message);
  }
}

const fetchAdminStatus = async () => {
      try {
          const {data} = await axios.get('/api/admin/is-auth');
          if(data.success){
            setIsAdmin(true);
          }
          else{
            setIsAdmin(false);
          }
      } catch(error) {
        console.log(error.message);
        setIsAdmin(false);
      }
    }

useEffect(()=>{
    fetchUserStatus();
  },[]);

  const logout = async() => {
    const { data } = await axios.get('/api/user/logout');
    if(data.success) {
      setUser(null);
      setShowUserLogin(true);
      toast.success(data.message);
    }
    else{
      toast.error(data.message);
    }
  }

  const value = {
      showUserLogin,
      setShowUserLogin,user,setUser,logout,axios,setIsAdmin,fetchAdminStatus,navigate,isAdmin
    };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);