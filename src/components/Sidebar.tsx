
import { Link, useLocation } from "react-router-dom";
import { PhoneCall, Users, BarChart3, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/",
    },
    {
      title: "Calls",
      icon: <PhoneCall className="h-5 w-5" />,
      path: "/calls",
    },
    {
      title: "Agents",
      icon: <Users className="h-5 w-5" />,
      path: "/agents",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    }
  ];

  return (
    <div 
      className={cn(
        "bg-sidebar flex flex-col h-screen transition-all duration-300 border-r border-sidebar-border sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          <div className="bg-sidebar-primary rounded-md p-1.5 mr-2">
            <PhoneCall className="h-5 w-5 text-white" />
          </div>
          {!collapsed && <h1 className="font-bold text-xl text-white">CallAdmin</h1>}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "hidden"
          )} 
          onClick={toggleSidebar}
        >
          <X className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
            !collapsed && "hidden"
          )} 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pt-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors",
                location.pathname === item.path 
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary",
                collapsed ? "justify-center" : ""
              )}
            >
              {item.icon}
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border flex items-center">
        <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
          <span className="text-sidebar-foreground text-xs font-medium">AD</span>
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sidebar-foreground font-medium text-sm">Admin User</p>
            <p className="text-sidebar-foreground text-xs opacity-70">admin@example.com</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
