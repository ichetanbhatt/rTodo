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
        searchTodos={this.props.searchTodos} //Search Todos
        toggleComplete={this.props.toggleComplete} // Toggle a Todo Completed/Ongoing
        editTodo = {this.props.editTodo} // Edit Todo Items
        deleteTodo={this.props.deleteTodo} // Delete a Todo
        updateTags = {this.props.updateTags}
      />
    ));
  };

  ulStyle = () => {
    return {
      margin: "0",
      padding: "0",
      listStyleType: "none"
    };
  };

  render() {
    return (
      <div>
        <ul style={this.ulStyle()}>{this.todoItemView()}</ul>
      </div>
    );
  }
}

// PropTypes
Todos.propTypes = {
  todoArray: PropTypes.array.isRequired
};

export default Todos;
