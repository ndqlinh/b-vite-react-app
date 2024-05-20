const TodoItem = (props) => {
  const { id, title, status } = props;

  return (
    <li className="todo-item">
      { title }
    </li>
  );
};

export default TodoItem;
