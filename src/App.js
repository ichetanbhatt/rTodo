import React, { Component } from "react";
// Third-party libs
import ls from "local-storage";
import uuid from "uuid/v4";
import * as jsSearch from "js-search";

// Md-bootstrap Imports
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import "./App.css";
import Todos from "./components/Todos";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    // Fetch TodoArray from Localstorage, else store []
    this.state = {
      ongoingTodos: ls.get("ongoingTodoArray") || [],
      completedTodos: ls.get("completedTodoArray") || []
    };
  }

  searchTodo = keywords => {
    var search = new jsSearch.Search("id");
    search.indexStrategy = new jsSearch.ExactWordIndexStrategy();
    search.addIndex("title");

    let updatedList = [
      ...this.state.ongoingTodos,
      ...this.state.completedTodos
    ];

    search.addDocuments(updatedList);

    console.log(search.search(keywords));
  };

  addTodo = title => {
    let hashtags = title.match(/(^|\s)(#[a-z\d-]+)/gi);
    console.log(hashtags);

    const newTodo = {
      id: uuid(),
      title: title,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
      hashtags: hashtags || []
    };

    // Appending latest on front to avoid sorting
    let newOngoingTodos = [newTodo, ...this.state.ongoingTodos];

    // Update State and store to storage
    this.setState({ ongoingTodos: newOngoingTodos }, () =>
      ls.set("ongoingTodoArray", this.state.ongoingTodos)
    );
  };

  // Mark Todo as complete
  markComplete = id => {
    //  Find todo and push to completed
    let selectedTodo = this.state.ongoingTodos[
      this.state.ongoingTodos.findIndex(todo => todo.id === id)
    ];
    selectedTodo.completed = true;
    let newCompletedTodos = [selectedTodo, ...this.state.completedTodos];

    this.setState({ completedTodos: newCompletedTodos }, () =>
      ls.set("completedTodoArray", this.state.completedTodos)
    );

    // Pop from ongoing
    this.deleteTodo(id, true);
  };

  markOngoing = id => {
    console.log("Mark ongoing", id);
    //  Find todo and push to completed
    let selectedTodo = this.state.completedTodos[
      this.state.completedTodos.findIndex(todo => todo.id === id)
    ];
    selectedTodo.completed = false;
    let newOngoingTodos = [...this.state.ongoingTodos, selectedTodo];

    // Sort Array,
    newOngoingTodos.sort((a, b) => {
      a = new Date(a.createdAt).getTime();
      b = new Date(b.createdAt).getTime();
      return a > b ? -1 : a < b ? 1 : 0;
    });

    this.setState({ ongoingTodos: newOngoingTodos }, () =>
      ls.set("ongoingTodoArray", this.state.ongoingTodos)
    );

    // Pop from ongoing
    this.deleteTodo(id, false);
  };

  deleteTodo = (id, flag) => {
    if (flag) {
      this.setState(
        {
          ongoingTodos: [
            ...this.state.ongoingTodos.filter(todo => todo.id !== id)
          ]
        },
        () => ls.set("ongoingTodoArray", this.state.ongoingTodos)
      );
    } else {
      this.setState(
        {
          completedTodos: [
            ...this.state.completedTodos.filter(todo => todo.id !== id)
          ]
        },
        () => ls.set("completedTodoArray", this.state.completedTodos)
      );
    }
  };

  resetTodos = () => {
    this.setState(
      {
        ongoingTodos: [],
        completedTodos: []
      },
      () => ls.clear()
    );
  };

  render() {
    return (
      <div className="App">
        {/* <Header />
        <AddTodo addTodo={this.addTodo} />
        <Todos
          ongoingTodos={this.state.ongoingTodos}
          completedTodos={this.state.completedTodos}
          markComplete={this.markComplete}
          markOngoing={this.markOngoing}
          deleteTodo={this.deleteTodo}
        /> */}
        <Header resetTodos={this.resetTodos} searchTodo={this.searchTodo} />
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <AddTodo addTodo={this.addTodo} />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <Todos
                ongoingTodos={this.state.ongoingTodos}
                completedTodos={this.state.completedTodos}
                markComplete={this.markComplete}
                markOngoing={this.markOngoing}
                deleteTodo={this.deleteTodo}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default App;
