
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Upload,
  ClipboardCheck,
  Search,
  Settings,
  ChevronRight,
  ChevronLeft,
  Users,
  AlertTriangle,
  HelpCircle,
  BarChart3
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  // Links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { name: "Dashboard", path: "/dashboard", icon: Home },
    ];

    const patientLinks = [
      { name: "My Claims", path: "/claims", icon: FileText },
      { name: "Upload Claim", path: "/upload-claim", icon: Upload },
      { name: "Policy Information", path: "/policy", icon: ClipboardCheck },
    ];

    const hospitalLinks = [
      { name: "Claims", path: "/claims", icon: FileText },
      { name: "Submit Claim", path: "/upload-claim", icon: Upload },
      { name: "Patient Search", path: "/patient-search", icon: Search },
    ];

    const adminLinks = [
      { name: "All Claims", path: "/claims", icon: FileText },
      { name: "Fraud Alerts", path: "/fraud-alerts", icon: AlertTriangle },
      { name: "Users", path: "/users", icon: Users },
      { name: "Analytics", path: "/analytics", icon: BarChart3 },
    ];

    const settingsLinks = [
      { name: "Settings", path: "/settings", icon: Settings },
      { name: "Help & Support", path: "/support", icon: HelpCircle },
    ];

    let roleSpecificLinks = [];

    switch (user?.role) {
      case "patient":
        roleSpecificLinks = patientLinks;
        break;
      case "hospital":
        roleSpecificLinks = hospitalLinks;
        break;
      case "admin":
        roleSpecificLinks = adminLinks;
        break;
      default:
        roleSpecificLinks = [];
    }

    return {
      mainLinks: [...commonLinks, ...roleSpecificLinks],
      settingsLinks,
    };
  };

  const { mainLinks, settingsLinks } = getNavLinks();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-4">
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold tracking-tight">
              {user ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal` : 'Navigation'}
            </h2>
          </div>
          
          <nav className="flex flex-col space-y-1">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActiveRoute(link.path) && "bg-accent text-accent-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="space-y-4">
          <div className="px-4 py-2">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Support</h2>
          </div>
          <nav className="flex flex-col space-y-1">
            {settingsLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActiveRoute(link.path) && "bg-accent text-accent-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-6 hidden h-8 w-8 rounded-full border md:flex"
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
