import React, { Component } from "react";
import { MDBInput } from "mdbreact";

export class AddTodo extends Component {
  state = {
    title: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        <MDBInput
          label="Add Todo"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.onChange}
          outline
          size="lg"
          style={{backgroundColor: "white",}}
        />
        {/* <input
          type="text"
          name="title"
          placeholder="Add Todo.."
          value={this.state.title}
          onChange={this.onChange}
        /> */}
      </form>
    );
  }
}

export default AddTodo;
