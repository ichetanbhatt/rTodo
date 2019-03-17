import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: ""
  };

  onChange = e => this.setState({ title: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    if (this.state.title === "") {
      return;
    } else {
      this.props.addTodo(this.state.title);
      this.setState({ title: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        <input
          className="form-control form-control-md my-2"
          type="text"
          name="title"
          placeholder="Add Todo.."
          aria-label="addTodo"
          value={this.state.title}
          onChange={this.onChange}
          style={{ borderRadius: "5px" }}
        />
      </form>
    );
  }
}

export default AddTodo;
