import { useEffect, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import PlusIcon from '@assets/icons/plus.svg?react';

import Tabs from '@shared/components/partials/Tabs';
import TodoItem from '../components/TodoItem';
import { useDialog } from '@shared/contexts/dialog.context';
import DIALOG_TYPES from '@shared/constants/dialog-types';
import ACTION_TYPES from 'app/stores/action-types';
import TodoForm, { Todo } from '../components/TodoForm';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { getTodoList } from 'app/principal/slices/todoSlice';
import Loader from '@shared/components/partials/Loader';

const TodoList = () => {
  const todoFormRef = useRef<any>();
  const { addDialog } = useDialog();
  const dispatch = useAppDispatch();
  const [animationParent] = useAutoAnimate();
  const [isFetching, setFetching] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('new');
  const todo = useAppSelector((state) => state.todo);
  const todoStatus = ['new', 'in-progress', 'done'];

  useEffect(() => {
    dispatch(getTodoList());
  }, []);

  useEffect(() => {
    if (todo.type === ACTION_TYPES.TODO.LIST) {
      setFetching(todo.isLoading);
    }
  }, [todo.isLoading]);

  useEffect(() => {
    if (todo.data) {
      switch (todo.type) {
        case ACTION_TYPES.TODO.LIST:
          setTodoList(todo.data);
          break;
        case ACTION_TYPES.TODO.SAVE: {
          const isExisted = todoList.find((item) => item.id === todo.data.id);
          setTodoList((prev) => {
            return isExisted
              ? prev.map((item) => {
                  if (item.id === todo.data.id) {
                    item = { ...todo.data };
                  }
                  return item;
                })
              : [...[todo.data], ...prev];
          });
          break;
        }
        case ACTION_TYPES.TODO.DELETE:
          setTodoList((prev) =>
            prev.filter((item) => item.id !== todo.data.id)
          );
          break;
      }
    }
  }, [todo.data]);

  useEffect(() => {
    setFilteredTodoList((prev) =>
      todoList.filter((item) => item.status === selectedStatus)
    );
  }, [todoList, selectedStatus]);

  const changeTabCallback = (selectedIndex: number) => {
    setSelectedStatus(todoStatus[selectedIndex]);
  };

  const triggerSubmit = () => {
    todoFormRef.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  const openDialog = (todo?: Todo) => {
    addDialog({
      type: DIALOG_TYPES.CUSTOM,
      title: todo?.id ? 'Update Todo' : 'Create Todo',
      containComponent: true,
      pendingCloseDialog: true,
      content: <TodoForm formRef={todoFormRef} inputData={todo} />,
      button: {
        ok: todo?.id ? 'Update' : 'Create',
        cancel: 'Discard',
      },
      confirmHandler: triggerSubmit,
    });
  };

  return (
    <div className="todo-page">
      <button className="btn btn-primary" onClick={() => openDialog()}>
        <div className="btn-icon">
          <PlusIcon />
        </div>
        New Task
      </button>
      <Tabs tabs={todoStatus} callback={changeTabCallback}>
        <div className="flex flex-center">
          {isFetching ? (
            <div className="py-10">
              <Loader className="section-loader" />
            </div>
          ) : filteredTodoList?.length ? (
            <ul className="todo-list" ref={animationParent}>
              {filteredTodoList.map((todo) => (
                <TodoItem key={todo.id} todo={todo} openDetail={openDialog} />
              ))}
            </ul>
          ) : (
            <p className="txt-grey py-10">Nothing to show</p>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default TodoList;
