import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Beranda } from "./components/pages/Beranda";
import { DaftarUnit } from "./components/pages/DaftarUnit";
import { DetailUnit } from "./components/pages/DetailUnit";
import { Booking } from "./components/pages/Booking";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { PortalPenyewa } from "./components/pages/PortalPenyewa";
import { PortalPengelola } from "./components/pages/PortalPengelola";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { TenantProfile } from "./components/pages/TenantProfile";
import { AdminCRUD } from "./components/pages/AdminCRUD";
import { AdminDashboardDetail } from "./components/pages/AdminDashboardDetail";
import { AdminBookingDetail } from "./components/pages/AdminBookingDetail";
import { AdminUnitDetail } from "./components/pages/AdminUnitDetail";
import { AdminUnitEdit } from "./components/pages/AdminUnitEdit";
import { AdminFinanceReport } from "./components/pages/AdminFinanceReport";
import { PengelolaUnitDetail } from "./components/pages/PengelolaUnitDetail";
import { PengelolaBookingApproval } from "./components/pages/PengelolaBookingApproval";
import { PengelolaFinanceEdit } from "./components/pages/PengelolaFinanceEdit";
import { Fasilitas } from "./components/pages/Fasilitas";
import { Lokasi } from "./components/pages/Lokasi";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("beranda");
  const [pageData, setPageData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setPageData(data);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (userType: string, userData: any) => {
    setCurrentUser({ ...userData, type: userType });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate("beranda");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "beranda":
      case "tentang":
      case "kontak":
        return <Beranda onNavigate={handleNavigate} />;
      case "unit":
        return <DaftarUnit onNavigate={handleNavigate} />;
      case "fasilitas":
        return <Fasilitas onNavigate={handleNavigate} />;
      case "lokasi":
        return <Lokasi onNavigate={handleNavigate} />;
      case "detail-unit":
        return <DetailUnit onNavigate={handleNavigate} unitData={pageData} />;
      case "booking":
        return <Booking onNavigate={handleNavigate} unitData={pageData} />;
      case "login":
        return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "register":
        return <Register onNavigate={handleNavigate} />;
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "admin-crud":
        return <AdminCRUD onNavigate={handleNavigate} />;
      case "admin-dashboard-detail":
        return <AdminDashboardDetail onNavigate={handleNavigate} detailType={pageData?.detailType || "units"} />;
      case "admin-booking-detail":
        return <AdminBookingDetail onNavigate={handleNavigate} bookingData={pageData?.booking} />;
      case "admin-unit-detail":
        return <AdminUnitDetail onNavigate={handleNavigate} unitData={pageData} />;
      case "admin-unit-edit":
        return <AdminUnitEdit onNavigate={handleNavigate} unitData={pageData} mode={pageData ? "edit" : "create"} />;
      case "admin-finance-report":
        return <AdminFinanceReport onNavigate={handleNavigate} />;
      case "portal-penyewa":
        return <PortalPenyewa onNavigate={handleNavigate} onLogout={handleLogout} userData={currentUser} />;
      case "tenant-profile":
        return <TenantProfile onNavigate={handleNavigate} userData={currentUser} />;
      case "portal-pengelola":
        return <PortalPengelola onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "pengelola-unit-detail":
        return <PengelolaUnitDetail onNavigate={handleNavigate} unitData={pageData} />;
      case "pengelola-unit-edit":
        return <AdminUnitEdit onNavigate={handleNavigate} unitData={pageData} mode={pageData ? "edit" : "create"} />;
      case "pengelola-booking-approval":
        return <PengelolaBookingApproval onNavigate={handleNavigate} bookingData={pageData} />;
      case "pengelola-finance-edit":
        return <PengelolaFinanceEdit onNavigate={handleNavigate} financeData={pageData} />;
      default:
        return <Beranda onNavigate={handleNavigate} />;
    }
  };

  const showNavbarAndFooter = ![
    "admin", 
    "admin-crud", 
    "admin-dashboard-detail", 
    "admin-booking-detail", 
    "admin-unit-detail",
    "admin-unit-edit",
    "admin-finance-report",
    "portal-penyewa", 
    "tenant-profile", 
    "portal-pengelola",
    "pengelola-unit-detail",
    "pengelola-unit-edit",
    "pengelola-booking-approval",
    "pengelola-finance-edit",
    "login", 
    "register"
  ].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbarAndFooter && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {showNavbarAndFooter && <Footer />}
      <Toaster position="top-right" richColors />
    </div>
  );
}
