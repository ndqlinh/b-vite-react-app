import { useEffect, useState } from 'react';

import Tabs from '@shared/components/partials/Tabs';
import TodoItem from '../components/TodoItem';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [dummyTabs, setDummytabs] = useState([
    {
      label: 'new',
      paneElm: <div>Tab 1 content</div>
    },
    {
      label: 'in-progress',
      paneElm: <div>Tab 2 content</div>
    },
    {
      label: 'done',
      paneElm: <div>Tab 3 content</div>
    }
  ]);

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

  useEffect(() => {
    if (todoList.length) {
      dummyTabs.map(tab => {
        const todos = todoList.filter(item => item.status === tab.label);
        tab.paneElm = <ul className="todo-list">
          {
            todos.map(item => (
              <TodoItem
                id={ item.id }
                key={ item.id }
                title={ item.title }
                status={ item.status }
              />
            ))
          }
        </ul>
      });

      setDummytabs(prev => dummyTabs);
    }
  }, [todoList.length]);

  return (
    <div className="todo-page">
      {
        todoList.length && <Tabs tabs={ dummyTabs } />
      }
    </div>
  )
};

export default TodoList;
