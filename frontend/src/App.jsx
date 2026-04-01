import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { AdminPanelPage } from "./pages/AdminPanelPage.jsx";
import { CharitySelectionPage } from "./pages/CharitySelectionPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.jsx";
import { ScoreEntryPage } from "./pages/ScoreEntryPage.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";
import { SubscriptionPage } from "./pages/SubscriptionPage.jsx";

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  const hideFooter = ["/login", "/signup", "/forgot-password", "/reset-password"].includes(location.pathname);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scores" element={<ScoreEntryPage />} />
          <Route path="/charities" element={<CharitySelectionPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Route>
        <Route element={<ProtectedRoute requireAdmin />}>
          <Route path="/admin" element={<AdminPanelPage />} />
        </Route>
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}
