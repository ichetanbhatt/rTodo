import React, { Component } from "react";
// Third-party libs
import ls from "local-storage";
import uuid from "uuid/v4";
import * as jsSearch from "js-search";
import TagsInput from "react-tagsinput";
import { CSVLink, CSVDownload } from "react-csv";

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
import { SimpleTokenizer } from "js-search/dist/commonjs/Tokenizer/SimpleTokenizer";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    // Fetch TodoArray from Localstorage, else store []
    this.state = {
      todoArray: ls.get("todoArray") || [],
      ongoingTodos: ls.get("ongoingTodos") || [],
      completedTodos: ls.get("completedTodos") || [],
      searchArray: [],
      // searchKeywords: "", //For keyword searching Navbar
      searchTags: [], //For tag searching
      searching: false
    };
  }

  searchTodos = keywords => {
    // console.log(keywords);
    class CustomTokenizer {
      tokenize(text) {
        return text.split(/[\s]+/i).filter(text => text);
      }
    }

    if (this.state.searchKeywords + keywords === "") {
      this.setState({
        searchKeywords: "",
        searching: false
      });
    } else {
      // Define search settings
      var search = new jsSearch.Search("id");
      let updatedKeywords = this.state.searchKeywords;
      search.tokenizer = new CustomTokenizer();
      search.indexStrategy = new jsSearch.PrefixIndexStrategy();
      search.addIndex("title");
      search.addDocuments(this.state.todoArray);

      let searchResult = search.search(updatedKeywords);

      this.setState({
        searchKeywords: updatedKeywords,
        searching: true,
        searchArray: searchResult
      });
    }
  };

  searchHashtags = () => {
    let keywords = this.state.searchTags.join(" ");

    if (keywords === "") {
      this.setState({
        // searchKeywords: "",
        searching: false
      });
    } else {
      // console.log(keywords);
      class CustomTokenizer {
        tokenize(text) {
          return text.split(/[\s]+/i).filter(text => text);
        }
      }

      var search = new jsSearch.Search("id");
      // let updatedKeywords = this.state.searchKeywords;
      search.tokenizer = new CustomTokenizer();
      search.indexStrategy = new jsSearch.ExactWordIndexStrategy();
      search.addIndex("title");
      search.addDocuments(this.state.todoArray);

      let searchResult = search.search(keywords);

      this.setState({
        // searchKeywords: updatedKeywords,
        searching: true,
        searchArray: searchResult
      });
    }
  };

  addTodo = title => {
    // Regex for matching #hashtags. (#hashtag#test is considered as 1 tag)
    // let hashtags = title.match(/(^|\s)(#[a-z\d-#]+)/gi);
    // console.log(hashtags);

    const newTodo = {
      id: uuid(),
      title: title,
      completed: false,
      createdAt: new Date(),
      completedAt: null
      // hashtags: hashtags || []
    };

    // Update State and store to storage
    this.setState(
      { ongoingTodos: [newTodo, ...this.state.ongoingTodos] },
      () => {
        ls.set("ongoingTodos", this.state.ongoingTodos);
        this.updateView();
      }
    );
  };

  editTodo = (id, title, status) => {
    // console.log(id, title, status);
    if (!status) {
      let selectedTodo = this.state.ongoingTodos[
        this.state.ongoingTodos.findIndex(todo => todo.id === id)
      ];

      selectedTodo.title = title;
      ls.set("ongoingTodos", this.state.ongoingTodos);
      this.updateView();
    } else {
      let selectedTodo = this.state.completedTodos[
        this.state.completedTodos.findIndex(todo => todo.id === id)
      ];
      selectedTodo.title = title;

      ls.set("completedTodos", this.state.completedTodos);
      this.updateView();
    }
  };

  toggleComplete = (id, status) => {
    if (status) {
      let index = this.state.completedTodos.findIndex(todo => todo.id === id);

      let selectedTodo = this.state.completedTodos[index];
      selectedTodo.completed = false;

      this.setState(
        {
          ongoingTodos: [selectedTodo, ...this.state.ongoingTodos],
          completedTodos: [
            ...this.state.completedTodos.filter(
              todo => todo.id !== selectedTodo.id
            )
          ]
        },
        () => {
          ls.set("ongoingTodos", this.state.ongoingTodos);
          ls.set("completedTodos", this.state.completedTodos);
          this.updateView();
        }
      );
    } else {
      let index = this.state.ongoingTodos.findIndex(todo => todo.id === id);

      let selectedTodo = this.state.ongoingTodos[index];
      // console.log(selectedTodo);
      selectedTodo.completed = true;

      this.setState(
        {
          ongoingTodos: [
            ...this.state.ongoingTodos.filter(
              todo => todo.id !== selectedTodo.id
            )
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
    //
    let test1 = [...this.state.ongoingTodos, ...this.state.completedTodos];

    // UPDATE STATE AND STORAGE
    this.setState(
      {
        todoArray: test1
      },
      () => {
        ls.set("todoArray", this.state.todoArray);
        if (this.state.searching) {
          this.searchHashtags();
        }
      }
    );
  }

  deleteTodo = (id, status) => {
    // console.log(id);

    if (status) {
      this.setState(
        {
          completedTodos: [
            ...this.state.completedTodos.filter(todo => todo.id !== id)
          ]
        },
        () => {
          ls.set("completedTodos", this.state.completedTodos);
          this.updateView();
        }
      );
    } else {
      this.setState(
        {
          ongoingTodos: [
            ...this.state.ongoingTodos.filter(todo => todo.id !== id)
          ]
        },
        () => {
          ls.set("ongoingTodos", this.state.ongoingTodos);
          this.updateView();
        }
      );
    }
  };

  resetTodos = () => {
    this.setState(
      {
        todoArray: [],
        ongoingTodos: [],
        completedTodos: [],
        searchArray: [],
        searchTags: [],
        searchKeywords: "",
        searching: false
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
                        placeholder: "Search"
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

  // Flag 1 for showing all | 0 for search
  // searchTodos = (keywords, flag) => {
  //   class CustomTokenizer {
  //     tokenize(text) {
  //       return text.split(/[\s]+/i).filter(text => text);
  //     }
  //   }

  //   if (this.state.searchKeywords + keywords === "") {
  //     this.setState({
  //       searchKeywords: "",
  //       searching: false
  //     });
  //   } else {
  //     // Define search settings
  //     var search = new jsSearch.Search("id");
  //     let updatedKeywords;
  //     if (!flag) {
  //       //Call from Hashtag clicks
  //       updatedKeywords = this.state.searchKeywords + keywords;
  //       search.indexStrategy = new jsSearch.ExactWordIndexStrategy();
  //       search.tokenizer = new CustomTokenizer();
  //     } else {
  //       //Call from keyword search
  //       updatedKeywords = this.state.searchKeywords;
  //       search.tokenizer = new CustomTokenizer();
  //       search.indexStrategy = new jsSearch.PrefixIndexStrategy();
  //     }

  //     search.addIndex("title");
  //     search.addDocuments(this.state.todoArray);

  //     let searchResult = search.search(updatedKeywords);

  //     this.setState({
  //       searchKeywords: updatedKeywords,
  //       searching: true,
  //       searchArray: searchResult
  //     });
  //   }
  // };
}

export default App;
