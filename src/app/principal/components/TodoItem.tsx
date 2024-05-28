import CheckboxIcon from '@assets/icons/checkbox.svg?react';

const TodoItem = (props) => {
  const { todo } = props;

  return (
    <li className="todo-item">
      <div className="card full-width">
        <div className="checkbox">
          <input type="checkbox" name="remember" id={ todo.id } className="checkbox-input" />
          <label htmlFor={ todo.id } className="checkbox-label">
            <span className="mr-3"><CheckboxIcon className="checked-icon" /></span>
            <span>{ todo.title }</span>
          </label>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
