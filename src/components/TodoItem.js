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

  todoStyle = () => {
    return {
      position: "relative",
      padding: "12px 34px 12px 30px",
      fontSize: "15px",
      // borderLeft: "6px solid green",
      // borderBottom: "1px solid #8186d5",
      // background: this.props.todoItem.completed ? "#8186d5" : "#c6cbef",
      color : this.props.todoItem.completed ? "#c4c4c4": "#4d4d4d",
      textDecoration: this.props.todoItem.completed ? "line-through" : "none",
      // fontWeight: this.props.todoItem.completed ? "350" : "400",
      borderLeft: this.props.todoItem.completed
        ? "6px solid #8186d5"
        : "6px solid #c6cbef"
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

  render() {
    const { id, title, completed } = this.props.todoItem;

    return (
      <div className="todoItem" key={id}>
        <span
          // style={{
  
          //   position: "relative",
          //   // borderColor: "black",
          //   // borderStyle: "solid",
          //   // borderWidth: "0 2px 2px 0",
          //   // top: "10px",
          //   left: "16px",
          //   // transform: "rotate(45deg)",
          //   // height: "15px",
          //   // width: "7px",
          //   // marginTop: "20px"
          // }}
        />

        <li style={this.todoStyle()}>
          <input
            checked={completed}
            type="checkbox"
            onChange={this.props.toggleComplete.bind(this, id)}
            style={{ position: "absolute", top: "15px", left: "10px" }}
          />
          {/* <label style={this.getStyle()}>
            {this.renderTextWithHashtags(title)}
          </label> */}
          <span style={{wordBreak:"break-word"}} >
            <ReactHashtag
              style={this.getStyle}
              renderHashtag={hashtag => (
                <a style={{color:"#8186d5"}} onClick={() => this.props.searchTodos(hashtag+" ")} key={uuid()}>
                  {hashtag}
                </a>
              )}
            >
              {title}
            </ReactHashtag>
          </span>
          <span
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              padding: "12px 16px 12px 16px",
              color: "black"
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
