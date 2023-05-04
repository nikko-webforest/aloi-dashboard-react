import { Card } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import Counter from "../../../components/Counter";
import { actions, selectors } from "..";

const ReduxDemo = () => {
  useEffect(() => {
    console.log("redux demo rendered..");
  });

  const counter = useSelector(selectors.getCounter);
  const dispatch = useDispatch();

  const cardActionPrimary = {
    content: "Press me!",
    onAction: () => {
      dispatch(actions.setCounter(counter + 1));
    }
  };

  let cardActionsExtra = [
    {
      content: "clear",
      onAction: () => {
        dispatch(actions.setCounter(0));
      }
    }
  ];

  if (counter <= 0) {
    cardActionsExtra = [];
  }

  return (
    <Card
      title="Redux demo"
      sectioned
      primaryFooterAction={cardActionPrimary}
      secondaryFooterActions={cardActionsExtra}>
      <>
        <p>Data from redux store:</p>
        <Counter value={counter} />
      </>
    </Card>
  );
};

export default ReduxDemo;
