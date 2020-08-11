import React, { useRef, useEffect, useState, RefObject } from 'react';
import TodoItem from './TodoItem';
import type { Todo } from './todo';
import { getNodeText } from '@testing-library/react';

interface TodoListProps {}

let gid = 0;

function generateId() {
  return `${gid++}`;
}

function TodoList({}: TodoListProps) {
  const textInput: RefObject<HTMLInputElement> = useRef(null);

  const [todos, setTodos] = useState([] as Todo[]);

  const updateTodo = (id: string, text: string, completed: boolean): void => {
    // Prepare new todos state
    const newTodos: Todo[] = [...todos];

    const updatedTodo = newTodos.find((todo: Todo) => todo.id === id);
    updatedTodo!.text = text;
    updatedTodo!.completed = completed;

    setTodos(newTodos);
  };

  const addTodo = (text: string): void => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: string): void => {
    const newTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const onKeyDown = (e: any): void => {
    if (e.keyCode === 13 && e.target.value !== '') {
      addTodo(e.target.value);
      e.target.value = '';
    }
  }

  useEffect(() => {
    textInput.current?.focus();
  }, []);

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
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              updateTodo={updateTodo}
              removeTodo={removeTodo} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TodoList;
