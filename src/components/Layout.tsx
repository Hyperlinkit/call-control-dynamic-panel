
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
