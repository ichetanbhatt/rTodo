import React, { Component } from "react";
// Third-party libs
import ls from "local-storage";
import uuid from "uuid/v4";
import * as jsSearch from "js-search";
import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";

// Md-bootstrap Imports
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  CarouselCaption
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

    // this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  // CREATE ONLY FOR SEARCH BAR

  searchTodos = keywords => {
    console.log(keywords);
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
      console.log(keywords);
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

    // console.log(keywords)

    // if (this.state.searchKeywords + keywords === "") {
    //   this.setState({
    //     searchKeywords: "",
    //     searching: false
    //   });
    // } else {
    //   // Define search settings
    //   var search = new jsSearch.Search("id");
    //   let updatedKeywords = this.state.searchKeywords;
    //   search.tokenizer = new CustomTokenizer();
    //   search.indexStrategy = new jsSearch.PrefixIndexStrategy();
    //   search.addIndex("title");
    //   search.addDocuments(this.state.todoArray);

    //   let searchResult = search.search(updatedKeywords);

    //   this.setState({
    //     searchKeywords: updatedKeywords,
    //     searching: true,
    //     searchArray: searchResult
    //   });
    // }
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

  addTodo = title => {
    // Regex for matching #hashtags. (#hashtag#test is considered as 1 tag)
    // let hashtags = title.match(/(^|\s)(#[a-z\d-#]+)/gi);
    // console.log(hashtags);

    const newTodo = {
      id: uuid(),
      title: title,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
      // hashtags: hashtags || []
    };

    // Update State and store to storage
    this.setState({ todoArray: [newTodo, ...this.state.todoArray] }, () =>
      ls.set("todoArray", this.state.todoArray)
    );
    // this.updateResult();
  };

  editTodo = (id, title) => {
    console.log(id, title);

    let selectedTodo = this.state.todoArray[
      this.state.todoArray.findIndex(todo => todo.id === id)
    ];

    selectedTodo.title = title;
    ls.set("todoArray", this.state.todoArray);
    this.updateResult();
  };

  toggleComplete = id => {
    let selectedTodo = this.state.todoArray[
      this.state.todoArray.findIndex(todo => todo.id === id)
    ];
    selectedTodo.completed = !selectedTodo.completed;

    this.sortArray();
    this.updateResult();
  };

  updateView() {
    //
    let test1 = [...this.state.ongoingTodos, ...this.state.completedTodos];

    // UPDATE STATE AND STORAGE
    this.setState(
      {
        todoArray: test1
      },
      () => ls.set("todoArray", this.state.todoArray)
    );
  }
  sortArray = list => {
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
    console.log(id);
    this.setState(
      {
        todoArray: [...this.state.todoArray.filter(todo => todo.id !== id)]
      },
      () => {
        // ls.set("todoArray", this.state.todoArray);
        // this.updateResult();
      }
    );
  };

  resetTodos = () => {
    this.setState(
      {
        todoArray: [],
        searchArray: [],
        searchKeywords: "",
        searching: false
      },
      () => ls.clear()
    );
  };

  updateResult = () => {
    if (this.state.searching) {
      this.searchTodos(this.state.searchKeywords, false);
    }
  };

  onChange = e => {
    this.setState({ searchKeywords: e.target.value }, () => {
      // console.log(this.state.search);
      this.searchTodos(this.state.searchKeywords, 1);
    });
  };

  handleTagsChange = (flag, searchTags) => {
    console.log("incoming tags", searchTags);
    // console.log()
    if (flag) {
      let updated = [...this.state.searchTags, searchTags];
      this.setState({ searchTags: updated }, () => {
        console.log("state", this.state.searchTags);
        this.searchHashtags();
      });
    } else {
      this.setState({ searchTags }, () => {
        console.log("state", this.state.searchTags);
        this.searchHashtags();
      });
    }
    // let updated = [..÷.this.state.searchTags, tags];

    // console.dir(tags);
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
        <MDBNavbarNav left>
          <MDBNavItem>
            {/* NAVBAR SEARCH */}
            {/* <form
              onSubmit={e => e.preventDefault()}
              className="form-inline my-0"
              autoComplete="off"
            >
              <input
                className="form-control form-control-sm mr-2 w-75"
                type="text"
                name="search"
                placeholder="Type to Search..."
                aria-label="Search"
                value={this.state.searchKeywords}
                onChange={this.onChange}
              />
            </form> */}
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
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
