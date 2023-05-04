import { Card, Layout, Link, Page } from "@shopify/polaris";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { selectors } from "../../../modules/Home";

const DemoPage = (props) => {
  useEffect(() => {
    console.log("Demo page routing rendered..");
  });

  const fullName = useSelector(selectors.getFullName);

  const primaryFooterAction = {
    content: "Back to Home",
    url: "/home"
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Demo Page for Routing" sectioned primaryFooterAction={primaryFooterAction}>
            <p>Hello {fullName} 👋</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default DemoPage;
