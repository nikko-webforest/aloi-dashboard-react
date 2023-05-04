import { Card, Layout, Link, Page } from "@shopify/polaris";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { selectors } from "../../../modules/Home";
import ContextDemo from "../components/ContextDemo";
import ReduxDemo from "../components/ReduxDemo";
import TodoList from "../components/TodoList";
import GraphQlDemo from "../components/GraphQlDemo";

const Home = (props) => {
  useEffect(() => {
    console.log("Demo page rendered..");
  });

  const fullName = useSelector(selectors.getFullName);

  const primaryFooterAction = {
    content: "Routing Demo",
    url: "/demo-page"
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Aloi Shopify App Demo" sectioned primaryFooterAction={primaryFooterAction}>
            <p>Hello {fullName} 👋</p>
          </Card>

          <ReduxDemo />
          <GraphQlDemo />
          <ContextDemo />
          <TodoList />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
