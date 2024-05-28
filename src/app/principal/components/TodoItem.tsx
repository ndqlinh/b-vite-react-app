import { useEffect, useState } from 'react';
import moment from 'moment';

import CheckboxIcon from '@assets/icons/checkbox.svg?react';
import TrashIcon from '@assets/icons/trash.svg?react';
import EyeIcon from '@assets/icons/eyes-show.svg?react';
import { useAppDispatch } from 'app/stores/hook';
import { deleteTodo } from '../slices/todoSlice';

const TodoItem = (props) => {
  const { todo } = props;
  const [badgeClass, setBadgeClass] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todo.priority) {
      switch (todo.priority) {
        case 'low':
          setBadgeClass('badge-tertiary');
          break;
        case 'medium':
          setBadgeClass('badge-warning');
          break;
        case 'high':
          setBadgeClass('badge-danger');
          break;
      }
    }
  }, [todo.priority]);

  const onDeleteTodo = async (id: string) => {
    await dispatch(deleteTodo({ id }));
  }

  return (
    <li className="todo-item">
      <div className="card full-width">
        <div className="flex flex-center-between">
          <div className="card-content">
            <div className="checkbox mb-1">
              <input type="checkbox" name="remember" id={ todo.id } className="checkbox-input" />
              <label htmlFor={ todo.id } className="checkbox-label">
                <span className="mr-3"><CheckboxIcon className="checked-icon" /></span>
                <span className="label-text todo-title">{ todo.title }</span>
                <span className={ `badge ${badgeClass}` }>{ todo.priority }</span>
              </label>
            </div>
            <p className="todo-due-date">{ moment(todo.dueDate).format('DD MMMM YYYY') }</p>
          </div>
          <div className="card-action">
            <button className="btn btn-circle btn-outline-info mr-1">
              <EyeIcon />
            </button>
            <button className="btn btn-circle btn-outline-danger" onClick={ () => onDeleteTodo(todo.id) }>
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
