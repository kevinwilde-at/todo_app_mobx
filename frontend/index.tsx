import { initializeBlock } from "@airtable/blocks/ui";
import React from "react";
import { observer } from "mobx-react";
import { observableTodoStore, Todo } from "./TodoStore";

// const TodoList = observer(({ store }) => {
//   const onNewTodo = () => {
//     store.addTodo(prompt("Enter a new todo:", "coffee plz"));
//   };

//   return (
//     <div>
//       {store.report}
//       <ul>
//         {store.todos.map((todo, idx) => (
//           <TodoView todo={todo} key={idx} />
//         ))}
//       </ul>
//       {store.pendingRequests > 0 ? <span>Loading...</span> : null}
//       <button onClick={onNewTodo}>New Todo</button>
//       <small> (double-click a todo to edit)</small>
//       <RenderCounter />
//     </div>
//   );
// });

// const TodoView = observer(({ todo }) => {
//   const onToggleCompleted = () => {
//     todo.completed = !todo.completed;
//   };

//   const onRename = () => {
//     todo.task = prompt("Task name", todo.task) || todo.task;
//   };

//   return (
//     <li onDoubleClick={onRename}>
//       <input
//         type="checkbox"
//         checked={todo.completed}
//         onChange={onToggleCompleted}
//       />
//       {todo.task}
//       {todo.assignee ? <small>{todo.assignee.name}</small> : null}
//       <RenderCounter />
//     </li>
//   );
// });

@observer
class TodoList extends React.Component<{ store: typeof observableTodoStore }> {
  render() {
    const { store } = this.props;
    const onNewTodo = () => {
      store.addTodo(prompt("Enter a new todo:", "coffee plz"));
    };

    return (
      <div>
        {store.report}
        <ul>
          {store.todos.map((todo, idx) => (
            <TodoView todo={todo} key={idx} />
          ))}
        </ul>
        {store.pendingRequests > 0 ? <span>Loading...</span> : null}
        <button onClick={onNewTodo}>New Todo</button>
        <small> (double-click a todo to edit)</small>
        <RenderCounter />
      </div>
    );
  }
}

@observer
class TodoView extends React.Component<{ todo: Todo }> {
  render() {
    const { todo } = this.props;

    const onToggleCompleted = () => {
      todo.completed = !todo.completed;
    };

    const onRename = () => {
      todo.task = prompt("Task name", todo.task) || todo.task;
    };

    return (
      <li onDoubleClick={onRename}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggleCompleted}
        />
        {todo.task}
        {todo.assignee ? <small>{todo.assignee.name}</small> : null}
        <RenderCounter />
      </li>
    );
  }
}

const RenderCounter = () => {
  return null;
};

initializeBlock(() => <TodoList store={observableTodoStore} />);
