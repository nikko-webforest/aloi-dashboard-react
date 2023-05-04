import { Card } from "@shopify/polaris";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import Counter from "../../../components/Counter";
import { Consumer as AloiConsumer, useAloiContext } from "ui";
import { actions } from "../../../modules/Home";

const ContextDemo = (props) => {
  const aloi = useAloiContext();
  useEffect(() => console.log("Aloi context consumer rendered..", aloi));

  const cardActionPrimary = {
    content: "Press me!",
    onAction: () => {
      aloi.context.setCounterAction(aloi.context.counter + 1);
    }
  };

  let cardActionsExtra = [
    {
      content: "clear",
      onAction: () => {
        aloi.context.setCounterAction(0);
      }
    }
  ];

  return (
    <AloiConsumer>
      {(aloi) => (
        <Card
          title="React Context demo"
          sectioned
          primaryFooterAction={cardActionPrimary}
          secondaryFooterActions={aloi.context.counter > 0 ? cardActionsExtra : []}>
          <p>Data from Aloi Context:</p>
          <Counter value={aloi.context.counter} />
        </Card>
      )}
    </AloiConsumer>
  );
};

export default connect(null, actions)(ContextDemo);
