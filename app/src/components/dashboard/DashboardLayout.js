import { useState } from "react";
import { Outlet } from "react-router-dom";
import { experimentalStyled } from "@mui/material";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="jive">
      <div className="dashboard-layout">
        <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <div className="dashboard-wrapper">
          <div className="dashboard-sidebar">
            <DashboardSidebar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
          </div>
          <div className="dashboard-container">
            <div className="dashboard-content ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
