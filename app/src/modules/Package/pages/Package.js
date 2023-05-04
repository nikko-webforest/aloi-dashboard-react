import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import PackageIndex from "../components/PackageIndex";
import Layout from "../../../components/dashboard/Layout";
import { withAloi } from "ui";

const Package = (props) => {
  useEffect(() => {
    console.log("Demo page rendered..");
  });

  return (
    <Layout>
      <PackageIndex {...props} />
    </Layout>
  );
};

export default Package;
