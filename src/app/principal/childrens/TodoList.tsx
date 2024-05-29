import { useEffect, useRef, useState } from 'react';

import PlusIcon from '@assets/icons/plus.svg?react';

import Tabs from '@shared/components/partials/Tabs';
import TodoItem from '../components/TodoItem';
import { useDialog } from '@shared/contexts/dialog.context';
import DIALOG_TYPES from '@shared/constants/dialog-types';
import TodoForm from '../components/TodoForm';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { getTodoList } from 'app/principal/slices/todoSlice';
import { TYPE_PREFIX } from '../slices/todo-slice-prefix';
import Loader from '@shared/components/partials/Loader';

const TodoList = () => {
  const todoFormRef = useRef<any>();
  const { addDialog } = useDialog();
  const dispatch = useAppDispatch();
  const [todoList, setTodoList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('new');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const todo = useAppSelector((state) => state.todo);
  const todoStatus = ['new', 'in-progress', 'done'];

  useEffect(() => {
    dispatch(getTodoList());
  }, []);

  useEffect(() => {
    if (todo.type === TYPE_PREFIX.TODO.LIST && !todo.isLoading) {
      setTodoList(todo.data);
    }
  }, [todo]);

  useEffect(() => {
    if (todoList?.length && selectedStatus) {
      const result = todoList.filter(item => item.status === selectedStatus);
      setFilteredTodos(prev => result);
    }
  }, [todoList?.length, selectedStatus]);

  const changeTabCallback = (selectedIndex: number) => {
    setSelectedStatus(todoStatus[selectedIndex]);
  };

  const triggerSubmit = () => {
    todoFormRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const openDialog = () => {
    addDialog({
      type: DIALOG_TYPES.CUSTOM,
      title: 'Dialog title',
      containComponent: true,
      pendingCloseDialog: true,
      content: <TodoForm formRef={ todoFormRef } />,
      button: {
        ok: 'Ok',
        cancel: 'Cancel',
      },
      confirmHandler: triggerSubmit
    });
  };

  return (
    <div className="todo-page">
      <button className="btn btn-primary" onClick={ openDialog }>
        <div className="btn-icon">
          <PlusIcon />
        </div>
        New Task
      </button>
      <Tabs tabs={ todoStatus } callback={ changeTabCallback }>
        <div className="flex flex-center">
          {
            (todo.type === TYPE_PREFIX.TODO.LIST && todo.isLoading) &&
            <div className="py-10">
              <Loader className="section-loader" />
            </div>
          }
          {
            !!todoList?.length &&
            <ul className="todo-list">
              {
                filteredTodos.map(item => <TodoItem key={ item.id } todo={ item } />)
              }
            </ul>
          }
        </div>
      </Tabs>
    </div>
  )
};

export default TodoList;
