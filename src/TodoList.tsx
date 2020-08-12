import React, { useRef, useEffect, useState, RefObject } from 'react';
import type { Todo } from './todo';
import TodoItem from './TodoItem';
import memorySource from './orbit/memorySource';
import useLiveQuery from './hooks/useLiveQuery';

interface TodoListProps {}

let gid = 0;

function generateId() {
  return `${gid++}`;
}

function TodoList({}: TodoListProps) {
  const textInput: RefObject<HTMLInputElement> = useRef(null);

  const updateTodo = (
    id: string,
    description: string,
    completed: boolean,
  ): void => {
    memorySource.cache.patch((t) =>
      t.updateRecord({
        type: 'todo',
        id,
        attributes: {
          description,
          completed,
        },
      }),
    );
  };

  const addTodo = (description: string): void => {
    memorySource.cache.patch((t) =>
      t.updateRecord({
        type: 'todo',
        id: generateId(),
        attributes: {
          description,
          completed: false,
        },
      }),
    );
  };

  const removeTodo = (id: string): void => {
    memorySource.cache.patch((t) =>
      t.removeRecord({
        type: 'todo',
        id,
      }),
    );
  };

  const onKeyDown = (e: any): void => {
    if (e.keyCode === 13 && e.target.value !== '') {
      addTodo(e.target.value);
      e.target.value = '';
    }
  };

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const [todos] = useLiveQuery(
    memorySource.cache.liveQuery((q) => q.findRecords('todo'))
  );

  return (
    <div>
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={onKeyDown}
          ref={textInput}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {(todos as Todo[]).map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TodoList;
