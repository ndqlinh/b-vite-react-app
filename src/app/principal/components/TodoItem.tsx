const TodoItem = (props) => {
  const { todo } = props;

  return (
    <li className="todo-item">
      { todo.title }
    </li>
  );
};

export default TodoItem;
