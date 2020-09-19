import React, { useRef, useEffect, RefObject } from 'react';
import type { Todo } from './records/todo';
import TodoItem from './TodoItem';
import memorySource from './orbit/memorySource';
import useLiveQuery from './hooks/useLiveQuery';

interface TodoListProps {}

function TodoList({}: TodoListProps) {
  async function addTodo(description: string): Promise<void> {
    await memorySource.update((t) =>
      t.addRecord({
        type: 'todo',
        id: memorySource.schema.generateId(),
        attributes: {
          description,
          completed: false,
          created: Date.now()
        }
      })
    );
    retry();
  }

  function handleKeyDown(e: any): void {
    if (e.keyCode === 13 && e.target.value !== '') {
      addTodo(e.target.value);
      e.target.value = '';
    }
  }

  const textInput: RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const todos = useLiveQuery(
    memorySource.cache.liveQuery((q) =>
      q.findRecords('todo').sort({ attribute: 'created' }),
    ),
  );

  return (
    <div>
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={handleKeyDown}
          ref={textInput}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {(todos as Todo[]).map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TodoList;
