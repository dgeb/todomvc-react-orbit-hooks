import React, { useState } from 'react';
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
    updateTodo(todo.id, e.target.value, todo.attributes.completed);
  };

  const handleKeydown = (e: any) => {
    if (e.keyCode === 13) {
      e.target.blur();
    } else if (e.keyCode === 27) {
      setState({ isEditing: false });
    }
  };

  const handleCompletedChange = (e: any) => {
    updateTodo(todo.id, todo.attributes.description, !!e.target.checked);
  };

  const handleRemove = (e: any) => {
    removeTodo(todo.id);
  };

  return (
    <li
      className={
        (state.isEditing && 'editing') + ' ' + (todo.attributes.completed && 'completed')
      }
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.attributes.completed}
          onChange={handleCompletedChange}
        />
        <label onDoubleClick={startEditing}>{todo.attributes.description}</label>
        <button className="destroy" onClick={handleRemove}></button>
      </div>
      {state.isEditing && (
        <input
          className="edit"
          value={todo.attributes.description}
          onChange={handleTextChange}
          onBlur={doneEditing}
          onKeyDown={handleKeydown}
        />
      )}
    </li>
  );
}

export default TodoItem;
