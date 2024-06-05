import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import CheckboxIcon from '@assets/icons/checkbox.svg?react';
import TrashIcon from '@assets/icons/trash.svg?react';
import EyeIcon from '@assets/icons/eyes-show.svg?react';

import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import ACTION_TYPES from 'app/stores/action-types';
import { deleteTodo } from '../slices/todoSlice';
import Loader from '@shared/components/partials/Loader';

const TodoItem = (props) => {
  const { todo, openDetail } = props;
  const [badgeClass, setBadgeClass] = useState('');
  const [isRequesting, setRequesting] = useState(false);
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo);
  const deletingId = useRef(null);

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

  useEffect(() => {
    if (todoState.type === ACTION_TYPES.TODO.DELETE && deletingId.current === todo.id) {
      setRequesting(todoState.isLoading);
    }
  }, [todoState.isLoading]);

  const onDeleteTodo = async (id: string) => {
    deletingId.current = id;
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
            <button className="btn btn-circle btn-outline-info mr-1" disabled={ isRequesting } onClick={ () => openDetail(todo) }>
              <EyeIcon />
            </button>
            <button className="btn btn-circle btn-outline-danger" onClick={ () => onDeleteTodo(todo.id) } disabled={ isRequesting }>
              { isRequesting ? <Loader className="loader-normal" /> : <TrashIcon /> }
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
