
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ClaimsProvider } from "./hooks/useClaims";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadClaim from "./pages/UploadClaim";
import ClaimDetails from "./pages/ClaimDetails";
import AdminReview from "./pages/AdminReview";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Policy from "./pages/Policy";
import Claims from "./pages/Claims";
import PatientSearch from "./pages/PatientSearch";
import FraudAlerts from "./pages/FraudAlerts";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Users from "./pages/Users";
import PatientDetails from "./pages/PatientDetails";
import PatientClaims from "./pages/PatientClaims";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ClaimsProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload-claim" element={<UploadClaim />} />
                <Route path="/claim/:claimId" element={<ClaimDetails />} />
                <Route path="/admin/review/:claimId" element={<AdminReview />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="/policy" element={<Policy />} />
                {/* Patient and Claims routes */}
                <Route path="/claims" element={<Claims />} />
                <Route path="/patient-search" element={<PatientSearch />} />
                <Route path="/fraud-alerts" element={<FraudAlerts />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/users" element={<Users />} />
                <Route path="/patient/:patientId" element={<PatientDetails />} />
                <Route path="/patient/:patientId/claims" element={<PatientClaims />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ClaimsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
