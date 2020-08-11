import React, { useRef, useEffect, useState, RefObject } from 'react';
import type { Todo } from './todo';

interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: string, text: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
}

function TodoItem({ todo, updateTodo, removeTodo }: TodoItemProps) {
  const [state, setState] = useState({
    isEditing: false,
  });

  const startEditing = (e: any) => {
    setState({ isEditing: true });
  };

  const doneEditing = (e: any) => {
    setState({ isEditing: false });
  };

  const handleTextChange = (e: any) => {
    updateTodo(todo.id, e.target.value, todo.completed);
  };

  const handleKeydown = (e: any) => {
    if (e.keyCode === 13) {
      e.target.blur();
    } else if (e.keyCode === 27) {
      setState({ isEditing: false });
    }
  };

  const handleCompletedChange = (e: any) => {
    updateTodo(todo.id, todo.text, !!e.target.checked);
  };

  const handleRemove = (e: any) => {
    removeTodo(todo.id);
  };

  return (
    <li
      className={
        (state.isEditing && 'editing') + ' ' + (todo.completed && 'completed')
      }
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleCompletedChange}
        />
        <label onDoubleClick={startEditing}>{todo.text}</label>
        <button className="destroy" onClick={handleRemove}></button>
      </div>
      {state.isEditing && (
        <input
          className="edit"
          value={todo.text}
          onChange={handleTextChange}
          onBlur={doneEditing}
          onKeyDown={handleKeydown}
        />
      )}
    </li>
  );
}

export default TodoItem;
