import { Badge, Card, FormLayout, Stack, TextContainer, TextField } from "@shopify/polaris";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { subscribe } from "src/util";
import { selectors, actions, factories } from "..";

import { Consumer as AloiConsumer } from "ui";

// Component should not rerender on context change when using render() in Consumer
const _TodoConsumer = (props) => {
  useEffect(() => console.log(`todo ${props.id} consumer rendered`));

  return (
    <AloiConsumer>
      {(aloi) => (
        <>
          <Stack vertical={true}>
            <TextContainer>
              <Badge>{aloi.context.counter}</Badge> clicks
            </TextContainer>
          </Stack>
        </>
      )}
    </AloiConsumer>
  );
};

// Memoizing the component will prevent it from recomputing everytime the parent rerenders (see console)

// Memoized component
const TodoConsumer = React.memo(_TodoConsumer);

// Unmemoized component
// const TodoConsumer = _TodoConsumer;

const _Todo = (props) => {
  const { id, content } = props.todo;

  useEffect(() => console.log(`todo rendered ${id}`));

  const todoSaveHandler = (content, id) => {
    props.updateTodo({ id, content });
  };

  return (
    <>
      <Stack vertical={true}>
        <TodoConsumer id={id} />

        <FormLayout>
          <TextField label={""} value={content} onChange={(v) => todoSaveHandler(v, id)} multiline={2} />
        </FormLayout>
      </Stack>
    </>
  );
};

// Memoizing the selector will prevent it from recomputing everytime the component rerenders (see console)

// Memoized selectors (using factories)
const Todo = connect(subscribe(null, { todo: factories.getTodoFactory }), actions)(_Todo);

// Unmemoized selectors
// const Todo = connect(subscribe({ todo: selectors.getTodo }), actions)(_Todo)

const TodoList = (props) => {
  const cardActionPrimary = {
    content: "Add Todo",
    onAction: () => {
      props.newTodo();
    }
  };

  const listTodos = props.todos.map((todo) => {
    return <Todo key={todo.id} id={todo.id} />;
  });

  return (
    <Card title="Multiple instanced component demo" sectioned primaryFooterAction={cardActionPrimary}>
      <Stack vertical={true}>
        <TextContainer>Each "todo" item should only render itself not the whole list (see console)</TextContainer>
        <TextContainer>Each "todo" item is under the Aloi Context above</TextContainer>
        {listTodos}
      </Stack>
    </Card>
  );
};

export default connect(
  subscribe({
    todos: (state) => state.home.todos
  }),
  actions
)(TodoList);
