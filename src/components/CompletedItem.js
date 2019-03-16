import React, { Component } from 'react'
import PropTypes from "prop-types";

export class CompletedItem extends Component {

    getStyle = () => {
        return {
          background: "#f4f4f4",
          padding: "10px",
          borderBottom: "1px #ccc dotted",
          textDecoration: this.props.completedTodos.completed ? "line-through" : "none"
        };
      };
  render() {
    const { id, title } = this.props.completedTodos;

    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.markOngoing.bind(this, id)}
          />{" "}
          {title}
          <button onClick={this.props.deleteTodo.bind(this, id)}>DELETE</button>
        </p>
      </div>
    );
  }
}

CompletedItem.propTypes = {
    completedTodos: PropTypes.object.isRequired
  };

export default CompletedItem
