import { Card, Spinner, TextContainer } from "@shopify/polaris";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { GET_SHOP } from "../graphql/query";
import { withAloi } from "ui";

const GraphQlDemo = (props) => {
  useEffect(() => console.log("GraphQL demo rendered.."));

  const [shopName, setShopName] = useState(<Spinner size="small" />);
  const [shopData, setShopData] = useState(null);

  props.aloi
    .app("shopify")
    .graphql.query({
      query: GET_SHOP
    })
    .then((response) => {
      setShopName(response.data.shop.name);
    });

  useEffect(() => {
    props.aloi.get(`/__inspect`).then(async (response) => {
      const shopData = await response.json();
      setShopData(shopData);
    });
  }, []);

  const connectorVersion = shopData ? shopData.aloi.version : null;

  return (
    <Card title="GraphQL demo" sectioned>
      <TextContainer>Current shop: {shopName}</TextContainer>
      <TextContainer>Connector version: {connectorVersion}</TextContainer>
    </Card>
  );
};

export default connect()(withAloi(GraphQlDemo));
