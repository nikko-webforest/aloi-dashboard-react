import { experimentalStyled } from "@mui/material";
import MainNavbar from "./MainNavbar";

const MainIndex = ({ children }) => (
  <div className="aloi">
    <MainNavbar />
    <div className="main-layout-wrapper">
      <div className="main-layout-container ">
        <div className="main-layout-content">{children}</div>
      </div>
    </div>
  </div>
);

export default MainIndex;
