import React from 'react';
import TodoList from './TodoList';

interface AppProps {}

function App({}: AppProps) {
  return (
    <main>
      <section className="todoapp">
        <h1>todos</h1>
        <TodoList />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by
          <a href="http://github.com/dgeb">Dan Gebhardt</a>,
          <a href="http://github.com/addyosmani">Addy Osmani</a>
        </p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </main>
  );
}

export default App;
