import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import InstallIndex from "../components/InstallIndex";
import Layout from "../../../components/dashboard/Layout";
import { withAloi } from "ui";

const Install = (props) => {
  useEffect(() => {
    console.log("Demo page rendered..");
  });

  return (
    <Layout>
      <InstallIndex {...props} />
    </Layout>
  );
};

export default Install;
