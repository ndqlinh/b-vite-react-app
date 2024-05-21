import { useEffect, useState } from 'react';

import PlusIcon from '@assets/icons/plus.svg?react';

import Tabs from '@shared/components/partials/Tabs';
import TodoItem from '../components/TodoItem';
import { useDialog } from '@shared/contexts/dialog.context';
import DIALOG_TYPES from '@shared/constants/dialog-types';

const TodoList = () => {
  const { addDialog } = useDialog();
  const [todoList, setTodoList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('new');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const todoStatus = ['new', 'in-progress', 'done'];

  useEffect(() => {
    setTodoList([
      {
        id: 1,
        title: 'Hello world',
        description: 'lorem ipsum dolor sit amet, consectetur adip',
        dueDate: new Date(),
        priority: 'low',
        status: 'done'
      },
      {
        id: 2,
        title: 'Estimate Sugi tasks',
        description: 'lorem ipsum dolor sit amet, consectetur adip',
        dueDate: new Date(),
        priority: 'medium',
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Implement login SSO',
        description: 'lorem ipsum dolor sit amet, consectetur adip',
        dueDate: new Date(),
        priority: 'high',
        status: 'new'
      }
    ])
  }, []);

  const changeTabCallback = (selectedIndex: number) => {
    setSelectedStatus(todoStatus[selectedIndex]);
  };

  useEffect(() => {
    if (todoList.length && selectedStatus) {
      const result = todoList.filter(item => item.status === selectedStatus);
      setFilteredTodos(prev => result);
    }
  }, [todoList.length, selectedStatus]);

  const openDialog = () => {
    addDialog({
      type: DIALOG_TYPES.CUSTOM,
      title: 'Dialog title',
      content: 'lorem ipsum dolor sit amet, consectetur adip',
      button: {
        ok: 'Ok',
        cancel: 'Cancel',
      }
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
        {
          todoList.length &&
          <ul className="todo-list">
            {
              filteredTodos.map(item => <TodoItem key={ item.id } todo={ item } />)
            }
          </ul>
        }
      </Tabs>
    </div>
  )
};

export default TodoList;
