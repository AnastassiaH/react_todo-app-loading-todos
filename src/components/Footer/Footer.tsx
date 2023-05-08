import React, { useState, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { FILTER_OPTIONS } from '../../utils/constants';

type Props = {
  todos: Todo[],
  todosToRender: Todo[]
  setTodosToRender: (arr: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  todosToRender,
  setTodosToRender,
}) => {
  const [selectedButton, setSelectedButton] = useState('All');
  const itemsLeft = useMemo(() => {
    return todos.reduce((acc, item) => (!item.completed ? acc + 1 : acc), 0);
  }, [todos]);

  // console.log(itemsLeft);

  const filterTodos = (value: string) => {
    setTodosToRender(todos.filter(({ completed }) => {
      switch (value) {
        case 'All':
          return true;
        case 'Active':
          return !completed;
        case 'Completed':
          return completed;
        default:
      }

      return false;
    }));
    setSelectedButton(value);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        {FILTER_OPTIONS.map(item => (
          <a
            href={`#/${item !== 'All' ? item.toLowerCase() : ''}`}
            className={`filter__link${selectedButton === item ? ' selected' : ''}`}
            onClick={() => filterTodos(item)}
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!todosToRender.some((item: Todo) => item.completed)}
      >
        Clear completed
      </button>

    </footer>
  );
};