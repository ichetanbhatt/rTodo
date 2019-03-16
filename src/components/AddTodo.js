import React, { Component } from "react";
import { MDBInput } from "mdbreact";

export class AddTodo extends Component {
  state = {
    title: ""
  };

  onChange = e => this.setState({ title: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        {/* <MDBInput
          label="Add Todo"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.onChange}
          outline
          size="lg"
          style={{ backgroundColor: "white" }}
        /> */}

        <input
          className="form-control form-control-lg my-2"
          type="text"
          name="title"
          placeholder="Add Todo.."
          aria-label="addTodo"
          value={this.state.title}
          onChange={this.onChange}
          style={{borderRadius:"50px"}}
        />
      </form>
    );
  }
}

export default AddTodo;
