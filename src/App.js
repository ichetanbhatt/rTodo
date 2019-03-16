import React, { Component } from "react";
// Third-party libs
import ls from "local-storage";
import uuid from "uuid/v4";
import * as jsSearch from "js-search";

// Md-bootstrap Imports
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdbreact";

import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import "./App.css";
import Todos from "./components/Todos";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    // Fetch TodoArray from Localstorage, else store []
    this.state = {
      todoArray: ls.get("todoArray") || []
    };
  }

  searchTodo = keywords => {
    var search = new jsSearch.Search("id");
    // search.indexStrategy = new jsSearch.ExactWordIndexStrategy();
    search.addIndex("title");

    search.addDocuments(this.state.todoArray);

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

    // Update State and store to storage
    this.setState({ todoArray: [newTodo, ...this.state.todoArray] }, () =>
      ls.set("todoArray", this.state.todoArray)
    );
  };

  toggleComplete = id => {
    console.log("Here");
    let selectedTodo = this.state.todoArray[
      this.state.todoArray.findIndex(todo => todo.id === id)
    ];

    selectedTodo.completed = !selectedTodo.completed;

    // find todo that are ongoing

    let ongoingTodos = this.state.todoArray.filter(
      todo => todo.completed === false
    );
    let completedTodos = this.state.todoArray.filter(
      todo => todo.completed === true
    );

    // Sort ongoing according to createdaAt
    ongoingTodos.sort((a, b) => {
      a = new Date(a.createdAt).getTime();
      b = new Date(b.createdAt).getTime();
      return a > b ? -1 : a < b ? 1 : 0;
    });

    completedTodos.sort((a, b) => {
      a = new Date(a.completedAt).getTime();
      b = new Date(b.completedAt).getTime();
      return a > b ? -1 : a < b ? 1 : 0;
    });

    this.setState(
      {
        todoArray: [...ongoingTodos, ...completedTodos]
      },
      () => {
        ls.set("todoArray", this.state.todoArray);
        console.log(this.state.todoArray);
      }
    );
  };

  deleteTodo = id => {
    this.setState(
      {
        todoArray: [...this.state.todoArray.filter(todo => todo.id !== id)]
      },
      () => ls.set("todoArray", this.state.todoArray)
    );
  };

  resetTodos = () => {
    this.setState(
      {
        todoArray: []
      },
      () => ls.clear()
    );
  };

  render() {
    return (
      <div className="App">
        <Header resetTodos={this.resetTodos} searchTodo={this.searchTodo} />
        <MDBContainer>
          <MDBRow>
            <MDBCol sm="2" />
            <MDBCol sm="8">
              <MDBRow>
                <MDBCol>
                  <AddTodo addTodo={this.addTodo} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <Todos
                    todoArray={this.state.todoArray}
                    toggleComplete={this.toggleComplete}
                    deleteTodo={this.deleteTodo}
                  />
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default App;

// Mark Todo as complete
// markComplete = id => {
//   //  Find todo and push to completed
//   let selectedTodo = this.state.todoArray[
//     this.state.todoArray.findIndex(todo => todo.id === id)
//   ];
//   selectedTodo.completed = true;

//   this.setState({ todoArray: [selectedTodo, ...this.state.todoArray] }, () =>
//     ls.set("todoArray", this.state.todoArray)
//   );

//   // Pop from ongoing
//   this.deleteTodo(id, true);
// };

// markOngoing = id => {
//   console.log("Mark ongoing", id);
//   //  Find todo and push to completed
//   let selectedTodo = this.state.todoArray[
//     this.state.todoArray.findIndex(todo => todo.id === id)
//   ];
//   selectedTodo.completed = false;
//   let newOngoingTodos = [...this.state.todoArray, selectedTodo];

//   // Sort Array,

//   //  FIXXX ITTTIKHOIH@HOIHIOH@IOHI@H@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//   newOngoingTodos.sort((a, b) => {
//     a = new Date(a.createdAt).getTime();
//     b = new Date(b.createdAt).getTime();
//     return a > b ? -1 : a < b ? 1 : 0;
//   });

//   this.setState({ todoArray: newOngoingTodos }, () =>
//     ls.set("todoArray", this.state.todoArray)
//   );

//   // Pop from ongoing
//   this.deleteTodo(id, false);
// };
