import React, { useState } from 'react';
import memorySource from './orbit/memorySource';
import type { Todo } from './records/todo';
import { cloneRecordIdentity } from '@orbit/data';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const [state, setState] = useState({
    isEditing: false
  });

  function startEditing(e: any) {
    setState({ isEditing: true });
  }

  function doneEditing(e: any) {
    setState({ isEditing: false });
  }

  async function replaceAttribute(attribute: string, value: unknown) {
    await memorySource.update((t) =>
      t.replaceAttribute(cloneRecordIdentity(todo), attribute, value)
    );
  }

  async function removeRecord() {
    await memorySource.update((t) => t.removeRecord(cloneRecordIdentity(todo)));
  }

  function handleTextChange(e: any) {
    replaceAttribute('description', e.target.value);
  }

  function handleKeydown(e: any) {
    if (e.keyCode === 13) {
      e.target.blur();
    } else if (e.keyCode === 27) {
      setState({ isEditing: false });
    }
  }

  function handleCompletedChange(e: any) {
    replaceAttribute('completed', !!e.target.checked);
  }

  function handleRemove(e: any) {
    removeRecord();
  }

  return (
    <li
      className={
        (state.isEditing && 'editing') +
        ' ' +
        (todo.attributes.completed && 'completed')
      }
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.attributes.completed}
          onChange={handleCompletedChange}
        />
        <label onDoubleClick={startEditing}>
          {todo.attributes.description}
        </label>
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
