import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import DashboardIndex from "../components/Dashboard";
import Layout from "../../../components/dashboard/Layout";

const Dashboard = (props) => {
  useEffect(() => {
    console.log("Demo page rendered..");
  });

  return (
    <Layout>
      <DashboardIndex />
    </Layout>
  );
};

export default Dashboard;
