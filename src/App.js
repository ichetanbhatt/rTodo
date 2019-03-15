import React, { Component } from "react";
import ls from "local-storage";
import uuid from "uuid/v4";

import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import "./App.css";
import Todos from "./components/Todos";


class App extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(uuid());
    // Fetch TodoArray from Localstorage, else store []
    this.state = {
      todos: ls.get("TodoArray") || []
    };
  }

  addTodo = title => {
    const genId = uuid();
    const newTodo = {
      id: uuid(),
      title: title,
      completed: false
    };

    this.setState({ todos: [...this.state.todos, newTodo] }, () => {
      this.saveState();
    });
  };

  deleteTodo = id => {
    this.setState(
      { todos: [...this.state.todos.filter(todo => todo.id !== id)] },
      () => {
        this.saveState();
      }
    );
  };

  // Toggle TodoItem
  markComplete = id => {
    this.setState(
      {
        todos: this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      },
      () => {
        this.saveState();
      }
    );
  };

  // Save state to Localstorage
  saveState = () => {
    ls.set("TodoArray", this.state.todos);
  };

  render() {
    return (
      <div className="App">
        {/* <TodoForm /> */}
        <Header />

        <AddTodo addTodo={this.addTodo} />

        <Todos
          todos={this.state.todos}
          markComplete={this.markComplete}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

export default App;
