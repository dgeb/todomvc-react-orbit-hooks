import React, { useRef, useEffect, RefObject } from 'react';
import type { Todo } from './records/todo';
import TodoItem from './TodoItem';
import memorySource from './orbit/memorySource';
import useSyncLiveQuery from './hooks/useSyncLiveQuery';
import useQuery from './hooks/useQuery';
import useSyncQuery from './hooks/useSyncQuery';

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
    // retry();
    // reset((q) => q.findRecords('todo').sort('-created'));
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

  // Sync liveQuery of memorySource.cache
  const { data: todos, reset } = useSyncLiveQuery(memorySource.cache, (q) =>
    q.findRecords('todo').sort('created')
  );

  // Async query of memorySource
  // const { data: todos, retry, reset } = useQuery(memorySource, (q) =>
  //   q.findRecords('todo').sort('created')
  // );

  // Sync query of memorySource.cache
  // const { data: todos, retry, reset } = useSyncQuery(memorySource.cache, (q) =>
  //   q.findRecords('todo').sort('created')
  // );

  // Direct sync query of memorySource.cache (with no hook)
  // const todos = memorySource.cache.query((q) =>
  //   q.findRecords('todo').sort('created')
  // );

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
          {((todos || []) as Todo[]).map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TodoList;
