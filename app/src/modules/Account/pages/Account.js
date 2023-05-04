import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import AccountProfile from "../components/AccountProfile";
import AccountProfileDetails from "../components/AccountProfileDetails";
import Layout from "../../../components/dashboard/Layout";

const Account = (props) => {
  useEffect(() => {
    console.log("Account page rendered..");
  });

  return (
    <Layout>
      <AccountProfile />
      <AccountProfileDetails />
    </Layout>
  );
};

export default Account;
