import React, { Component } from "react";
import TodoItem from "./TodoItem";
// import CompletedItem from "./CompletedItem";
import PropTypes from "prop-types";

class Todos extends Component {
  todoItemView = () => {
    return this.props.todoArray.map(todo => (
      <TodoItem
        key={todo.id}
        todoItem={todo} // Passing TODOS object
        searchTodos ={this.props.searchTodos}
        toggleComplete={this.props.toggleComplete} // Mark a Todo Completed
        deleteTodo={this.props.deleteTodo} // Delete a Todo
      />
    ));
  };
  render() {
    return (
      <div>
        <ul style={{ margin: "0px", padding: "0", listStyleType: "none" }}>
          {this.todoItemView()}
        </ul>
      </div>
    );
  }
}

// PropTypes
Todos.propTypes = {
  todoArray: PropTypes.array.isRequired
};

export default Todos;
