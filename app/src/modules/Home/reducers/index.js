export default {
  initialState: {
    counter: 0,
    todos: [],
    user: {
      firstName: "John",
      lastName: "Doe"
    }
  },
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    newTodo: (state, action) => {
      const _todos = [...state.todos];
      _todos.push({ id: _todos.length + 1, content: "" });
      state.todos = _todos;
    },
    updateTodo: (state, action) => {
      const _todos = [...state.todos];
      const index = _todos.findIndex((t) => t.id === action.payload.id);
      _todos[index]["content"] = action.payload.content;
      state.todos = _todos;
    }
  }
};
