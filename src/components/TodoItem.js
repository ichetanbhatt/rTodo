import React, { Component } from "react";
import ReactHashtag from "react-hashtag";
import PropTypes from "prop-types";
import { MDBIcon, MDBInput } from "mdbreact";
import uuid from "uuid/v4";

export class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      editedTitle: "",
      searchTags: []
    };
  }
  componentDidMount() {
    this.setState({ editedTitle: this.props.todoItem.title });
  }

  textStyle = () => {
    return {
      textDecoration: this.props.todoItem.completed ? "line-through" : "none",
      fontWeight: this.props.todoItem.completed ? "200" : "500"
    };
  };

  checkboxStyle = () => {
    return { position: "absolute", top: "15px", left: "10px" };
  };
  todoStyle = () => {
    return {
      position: "relative",
      padding: "12px 34px 12px 30px",
      fontSize: "15px",
      color: this.props.todoItem.completed ? "#c4c4c4" : "#4d4d4d",
      textDecoration: this.props.todoItem.completed ? "line-through" : "none",
      borderLeft: this.props.todoItem.completed
        ? "6px solid #c6cbef"
        : "6px solid #8186d5"
    };
  };
  deleteBtnStyle = () => {
    return {
      position: "absolute",
      right: "0",
      top: "0",
      padding: "12px 16px 12px 16px",
      color: "black"
    };
  };

  enableEditing(event) {
    // console.log("enabling editing");
    this.setState({
      editMode: true,
      editedTitle: this.props.todoItem.title
    });
  }

  editingDone = event => {
    if (event.keyCode === 13) {
      if (!this.state.editedTitle.replace(/\s/g, "").length) {
        this.props.deleteTodo(this.props.todoItem.id);
      } else {
        this.props.editTodo(
          this.props.todoItem.id,
          this.state.editedTitle,
          this.props.todoItem.completed
        );
        this.setState({
          editMode: false
          // editedTitle: this.props.todoItem.title
        });
      }
    } else if (event.keyCode === 27) {
      this.setState({
        editMode: false,
        editedTitle: this.props.todoItem.title
      });
    }
  };

  editingChange(event) {
    var _changedText = event.target.value;
    this.setState({
      editedTitle: _changedText
    });

    // console.log(this.state.editedTitle);
  }

  render() {
    const { id, title, completed } = this.props.todoItem;

    var viewStyle = {};
    var editStyle = {};

    if (this.state.editMode) {
      viewStyle.display = "none";
      // this.textStyle.textDecoration = "none"
    } else {
      editStyle.display = "none";
    }

    return (
      <div className="todoItem" key={id}>
        {/* View Mode */}

        <div style={viewStyle} onDoubleClick={this.enableEditing.bind(this)}>
          <li style={this.todoStyle()}>
            <input
              checked={completed}
              type="checkbox"
              onChange={this.props.toggleComplete.bind(this, id, completed)}
              style={this.checkboxStyle()}
            />

            <span style={{ wordBreak: "break-word" }}>
              <ReactHashtag
                style={this.textStyle()}
                renderHashtag={hashtag => (
                  <a
                    style={{ color: "#8186d5" }}
                    value={hashtag}
                    // onClick={() => this.props.searchTodos(hashtag + " ")}
                    onClick={this.props.updateTags.bind(this, 1, hashtag)}
                    key={uuid()}
                  >
                    {hashtag}
                  </a>
                )}
              >
                {this.state.editedTitle}
              </ReactHashtag>
            </span>
            <span
              style={this.deleteBtnStyle()}
              onClick={this.props.deleteTodo.bind(this, id, completed)}
            >
              <MDBIcon far icon="trash-alt" />
            </span>
          </li>
        </div>

        {/* Editing Mode */}
        <div style={editStyle}>
          <li
            style={{
              position: "relative",
              padding: "12px 34px 12px 30px",
              fontSize: "15px",
              borderLeft: this.props.todoItem.completed
                ? "6px solid #c6cbef"
                : "6px solid #8186d5"
            }}
          >
            <span>
              <MDBInput
                outline
                type="textarea"
                value={this.state.editedTitle}
                onChange={this.editingChange.bind(this)}
                onKeyDown={this.editingDone.bind(this)}
              />
            </span>
          </li>
        </div>
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todoItem: PropTypes.object.isRequired
};

export default TodoItem;
