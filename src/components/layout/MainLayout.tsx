
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-grow">
        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <main
          className={cn(
            "flex-1 px-4 py-6 md:px-6 lg:px-8",
            isAuthenticated && "md:ml-64",
            isAuthenticated && !sidebarOpen && "md:ml-0"
          )}
        >
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
