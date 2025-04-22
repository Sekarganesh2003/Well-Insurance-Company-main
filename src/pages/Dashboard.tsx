
import { useAuth } from "@/hooks/useAuth";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import HospitalDashboard from "@/components/dashboard/HospitalDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case 'patient':
      return <PatientDashboard />;
    case 'hospital':
      return <HospitalDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p>Unknown user role.</p>
        </div>
      );
  }
};

export default Dashboard;
