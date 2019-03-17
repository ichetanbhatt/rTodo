import React, { Component } from "react";
import ReactHashtag from "react-hashtag";
import PropTypes from "prop-types";
import { MDBIcon } from "mdbreact";
import uuid from "uuid/v4";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      // borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todoItem.completed ? "line-through" : "none",
      fontWeight: this.props.todoItem.completed ? "200" : "500"
    };
  };

  buttonStyle = () => {
    return {
      display: "none",
      position: "absolute",
      top: "0",
      right: "10px",
      bottom: "0",
      width: "40px",
      height: "40px",
      margin: "auto 0",
      fontSize: "30px",
      color: "#cc9a9a",
      marginBottom: "11px",
      transition: "color 0.2s ease-out"
    };
  };

  fetchFromHTML = e => {
    let keyword = this.myRef.current.children;
    console.log(keyword);
    // this.searchTags(keyword);
  };

  searchTags = () => {
    // Append to search
    // this.props.searchTodos(keyword, 0);
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  renderTextWithHashtags = text => {
    // let html = <span></a>
    let string = text.replace(/(^|\s)(#[a-z\d-]+)/gi, word => {
      // return '<a onClick={this.searchHashtag("' + word + '")}>' + word + "</a>";
      return '<a id="hashtag" ref="hashtag" >' + word + "</a>";
    });
    console.log(string);
    return (
      <div
        ref={this.myRef}
        onClick={this.fetchFromHTML.bind(this)}
        dangerouslySetInnerHTML={{ __html: string }}
      />
    );
  };

  render() {
    const { id, title, completed } = this.props.todoItem;

    return (
      <div
        className="todoItem"
        key={id}
        // onClick={this.props.toggleComplete.bind(this, id)}
      >
        <span
          style={{
            // content:s "",
            position: "relative",
            // borderColor: "black",
            // borderStyle: "solid",
            // borderWidth: "0 2px 2px 0",
            // top: "10px",
            left: "16px",
            // transform: "rotate(45deg)",
            // height: "15px",
            // width: "7px",
            marginTop: "20px"
          }}
        />

        <li
          style={{
            // cursor: "pointer",
            position: "relative",
            padding: "12px 8px 12px 40px",
            background: "white",
            fontSize: "18px",
            transition: "0.2s",
            borderBottom: "1px solid #ededed"
            // WebkitUserSelect: "none",
            // MozUserSelect: "none",
            // msUserSelect: "none",
            // userSelect: "none"
          }}
        >
          <input
            checked={completed}
            type="checkbox"
            onChange={this.props.toggleComplete.bind(this, id)}
            style={{ position: "absolute", top: "17px", left: "10px" }}
          />
          {/* <label style={this.getStyle()}>
            {this.renderTextWithHashtags(title)}
          </label> */}
          <p>
            <ReactHashtag
              renderHashtag={hashtag => (
                <a onClick={()=> this.props.searchTodos(hashtag)} key={uuid()} >{hashtag}</a>
              )}
              // onHashtagClick={value => this.searchTags(value)}
            >
              {title}
            </ReactHashtag>
          </p>

          <span
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              padding: "12px 16px 12px 16px"
            }}
            onClick={this.props.deleteTodo.bind(this, id)}
          >
            <MDBIcon far icon="trash-alt" />
          </span>
        </li>
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todoItem: PropTypes.object.isRequired
};

export default TodoItem;
