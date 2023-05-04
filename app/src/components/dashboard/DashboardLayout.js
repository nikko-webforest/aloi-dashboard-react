import { useState } from "react";
import { Outlet } from "react-router-dom";
import { experimentalStyled } from "@mui/material";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="aloi">
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-content ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
