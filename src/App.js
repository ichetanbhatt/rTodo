import React, { Component } from "react";
// Third-party libs
import ls from "local-storage";
import uuid from "uuid/v4";
// import * as jsSearch from "js-search";
import TagsInput from "react-tagsinput";
import { CSVLink } from "react-csv";

// import "react-tagsinput/react-tagsinput.css";

// Md-bootstrap Imports
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBNavbarBrand
} from "mdbreact";
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBIcon, MDBBtn } from "mdbreact";

// import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import "./App.css";
import Todos from "./components/Todos";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    // Fetch TodoArray from Localstorage, else store []
    this.state = {
      todoArray: ls.get("todoArray") || [], //Array that only renders
      ongoingTodos: ls.get("ongoingTodos") || [], //Order of Ongoing
      completedTodos: ls.get("completedTodos") || [], //Order of Completed
      searchArray: [],
      // searchKeywords: "", //For keyword searching Navbar
      searchTags: [], //For tag searching
      searching: false,

      todosDict: ls.get("todosDict") || {}, //Hash of Todos
      hashtagDict: ls.get("hashtagDict") || {} //Hash of hashtags
    };
  }

  searchHashtags = () => {
    let keywords = this.state.searchTags;
    let searchResult = [];
    if (keywords.length == 0) {
      this.setState({
        searchKeywords: "",
        searching: false
      });
    } else {
      function intersection(setA, setB) {
        var _intersection = new Set();
        for (var elem of setB) {
          if (setA.has(elem)) {
            _intersection.add(elem);
          }
        }
        return _intersection;
      }

      let id_list = keywords
        .map(tag => {
          return new Set(this.state.hashtagDict[tag]);
        })
        .reduce(intersection);
      for (let id of id_list) {
        searchResult.push(this.state.todosDict[id]);
      }

      this.setState({
        // searchKeywords: updatedKeywords,
        searching: true,
        searchArray: searchResult
      });
      console.log(searchResult);
    }
  };

  extractHashtags = text => {
    let hashtagRegexp = /(?:^|\s)(#[a-z\d-#]+)/gi;
    let hashtags = (text.match(hashtagRegexp) || []).map(e =>
      e.replace(hashtagRegexp, "$1")
    );
    // Unique Hashtags
    hashtags = new Set(hashtags);
    return hashtags;
  };

  deleteUpdateHashtags = (todoId, oldText, newText) => {
    console.log(todoId, oldText, newText);
    // Find hashtags in Old and New Hashtags
    let oldTags = this.extractHashtags(oldText);
    let newTags = this.extractHashtags(newText);

    let removeTags = new Set(oldTags);
    let updateTags = new Set(newTags);

    for (let tag of newTags) {
      removeTags.delete(tag);
    }

    for (let tag of oldTags) {
      updateTags.delete(tag);
    }

    // Same State object
    let tempHashtagDict = Object.assign({}, this.state.hashtagDict);

    // Remove Changed
    for (let tag of removeTags) {
      // let tagList = tempHashtagDict[tag];
      console.log(tag);
      tempHashtagDict[tag] = tempHashtagDict[tag].filter(
        todo => todo !== todoId
      );
    }

    // Update Changed
    for (let tag of updateTags) {
      console.log(tag);
      let tagList = tempHashtagDict[tag];
      if (tempHashtagDict.hasOwnProperty(tag)) {
        tempHashtagDict[tag] = [...tagList, todoId];
      } else {
        tempHashtagDict[tag] = [todoId];
      }
    }

    console.log(tempHashtagDict);
    this.setState({
      hashtagDict: tempHashtagDict
    });
    ls.set("hashtagDict", this.state.hashtagDict);
  };

  // CRUD on Todos

  addTodo = title => {
    let hashtags = this.extractHashtags(title);
    console.log(hashtags);

    // Create New Todo
    const id = uuid();
    const newTodo = {
      id: id,
      title: title,
      completed: false,
      createdAt: new Date(),
      completedAt: null
    };

    // Update TodoDict
    let tempTodos = Object.assign({}, this.state.todosDict);
    let tempHashtagDict = Object.assign({}, this.state.hashtagDict);
    tempTodos[id] = newTodo;

    // Update HashtagDict

    for (let tag of hashtags) {
      console.log(tag);
      if (tempHashtagDict.hasOwnProperty(tag)) {
        //Append to list of Ids in Hashtag
        tempHashtagDict[tag].push(id);
      } else {
        // Create new ID list
        tempHashtagDict[tag] = [id];
      }
    }

    // Update State
    this.setState(
      {
        ongoingTodos: [id, ...this.state.ongoingTodos],
        todosDict: tempTodos,
        hashtagDict: tempHashtagDict
      },
      () => {
        ls.set("ongoingTodos", this.state.ongoingTodos);
        ls.set("todosDict", this.state.todosDict);
        ls.set("hashtagDict", this.state.hashtagDict);
        this.updateView();
      }
    );
  };

  editTodo = (id, updatedTitle, status) => {
    // update todos by ID
    let todos = Object.assign({}, this.state.todosDict);
    let oldText = todos[id]["title"];
    todos[id]["title"] = updatedTitle;

    this.setState({ todosDict: todos }, () => {
      ls.set("todosDict", this.state.todosDict);
      this.deleteUpdateHashtags(id, oldText, updatedTitle);
      this.updateView();
    });
  };

  deleteTodo = (id, status) => {
    // console.log(id);
    let tempTodosDict = Object.assign({}, this.state.todosDict);
    let todoTitle = tempTodosDict[id].title;

    let tags = this.extractHashtags(todoTitle);
    let tempHashtagDict = Object.assign({}, this.state.hashtagDict);

    // Delete TagsMapping from Deleted Todo
    for (let tag of tags) {
      tempHashtagDict[tag] = tempHashtagDict[tag].filter(todo => todo !== id);
    }

    // Remove TODO from dict
    delete tempTodosDict[id];

    // Delete from orders
    if (status) {
      this.setState(
        {
          completedTodos: this.state.completedTodos.filter(todo => todo !== id)
        },
        () => ls.set("completedTodos", this.state.completedTodos)
      );
    } else {
      this.setState(
        {
          ongoingTodos: this.state.ongoingTodos.filter(todo => todo !== id)
        },
        () => ls.set("ongoingTodos", this.state.ongoingTodos)
      );
    }

    this.setState(
      { todosDict: tempTodosDict, hashtagDict: tempHashtagDict },
      () => {
        ls.set("todosDict", this.state.todosDict);
        ls.set("hashtagDict", this.state.hashtagDict);
        this.updateView();
      }
    );
  };

  toggleComplete = (id, status) => {
    let tempTodosDict = Object.assign({}, this.state.todosDict);
    console.log(tempTodosDict[id]["completed"]);
    tempTodosDict[id]["completed"] = !tempTodosDict[id]["completed"];
    console.log(tempTodosDict[id]["completed"]);

    if (status) {
      let index = this.state.completedTodos.findIndex(todo => todo === id);
      let selectedTodo = this.state.completedTodos[index];

      this.setState(
        {
          ongoingTodos: [selectedTodo, ...this.state.ongoingTodos],
          completedTodos: [
            ...this.state.completedTodos.filter(todo => todo !== selectedTodo)
          ]
        },
        () => {
          ls.set("ongoingTodos", this.state.ongoingTodos);
          ls.set("completedTodos", this.state.completedTodos);
          this.updateView();
        }
      );
    } else {
      let index = this.state.ongoingTodos.findIndex(todo => todo === id);
      let selectedTodo = this.state.ongoingTodos[index];

      this.setState(
        {
          ongoingTodos: [
            ...this.state.ongoingTodos.filter(todo => todo !== selectedTodo)
          ],
          completedTodos: [selectedTodo, ...this.state.completedTodos]
        },
        () => {
          ls.set("ongoingTodos", this.state.ongoingTodos);
          ls.set("completedTodos", this.state.completedTodos);
          this.updateView();
        }
      );
    }
  };

  updateView() {
    let renderTodos = [];
    // Iterate all ongoing -> append to renderTodos
    for (let id of this.state.ongoingTodos) {
      renderTodos.push(this.state.todosDict[id]);
    }

    for (let id of this.state.completedTodos) {
      renderTodos.push(this.state.todosDict[id]);
    }

    // UPDATE STATE AND STORAGE
    this.setState(
      {
        todoArray: renderTodos
      },
      () => {
        ls.set("todoArray", this.state.todoArray);
        if (this.state.searching) {
          this.searchHashtags();
        }
      }
    );
  }

  resetTodos = () => {
    this.setState(
      {
        todoArray: [],
        ongoingTodos: [],
        completedTodos: [],
        searchArray: [],
        searchTags: [],
        searchKeywords: "",
        searching: false,

        todosDict: {},
        hashtagDict: {}
      },
      () => {
        ls.clear();
        // window.location.reload();
      }
    );
  };

  onChange = e => {
    this.setState({ searchKeywords: e.target.value }, () => {
      this.searchTodos(this.state.searchKeywords, 1);
    });
  };

  handleTagsChange = (flag, searchTags) => {
    // console.log("incoming tags", searchTags);
    if (flag) {
      let updated = [...this.state.searchTags, searchTags];
      this.setState({ searchTags: updated }, () => {
        // console.log("state", this.state.searchTags);
        this.searchHashtags();
      });
    } else {
      this.setState({ searchTags }, () => {
        // console.log("state", this.state.searchTags);
        this.searchHashtags();
      });
    }
  };

  render() {
    var addStyle = {};
    var tagStyle = {};

    if (this.state.searching) {
      addStyle.display = "none";
    } else {
      tagStyle.display = "none";
    }

    return (
      <div className="App">
        {this.renderNavbar()}

        {/* CONTAINER */}
        <MDBContainer>
          <MDBRow>
            <MDBCol sm="1" />
            <MDBCol sm="10">
              <MDBRow className="m-2">
                <MDBCol>
                  {/* ADD TODO MODE */}
                  <div style={addStyle}>
                    <AddTodo addTodo={this.addTodo} />
                  </div>
                  {/* TAG SEARCH MODE */}
                  <div style={tagStyle}>
                    <TagsInput
                      value={this.state.searchTags}
                      onChange={this.handleTagsChange.bind(this, 0)}
                      inputProps={{
                        placeholder: "Search tags"
                      }}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="m-2">
                <MDBCol>
                  <MDBCard>
                    <Todos
                      todoArray={
                        this.state.searching
                          ? this.state.searchArray
                          : this.state.todoArray
                      }
                      updateTags={this.handleTagsChange}
                      editTodo={this.editTodo}
                      toggleComplete={this.toggleComplete}
                      searchTodos={this.searchTodos}
                      deleteTodo={this.deleteTodo}
                    />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
  renderNavbar = () => {
    return (
      <MDBNavbar style={{ backgroundColor: "#494ca2" }} dark>
        <MDBNavbarBrand>
          <span className="white-text">
            <MDBIcon icon="check-circle" />
            &nbsp;rTodo
          </span>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <MDBNavItem>
            <CSVLink
              style={{
                position: "relative",
                top: "6px",
                margin: "20px",
                color: "white"
              }}
              data={this.state.todoArray}
              filename={"rTodo.csv"}
            >
              <MDBIcon size="2x" icon="cloud-download-alt" />
            </CSVLink>
            <MDBBtn
              color="danger"
              style={{ margin: "0", padding: ".375rem .75rem" }}
              onClick={this.resetTodos}
            >
              <span>
                Reset <MDBIcon icon="trash" />
              </span>
            </MDBBtn>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    );
  };
}

export default App;
