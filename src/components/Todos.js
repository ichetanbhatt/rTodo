import React, { Component } from "react";
import TodoItem from "./TodoItem";
// import CompletedItem from "./CompletedItem";
import PropTypes from "prop-types";


class Todos extends Component {
  ongoingView = () => {
    return this.props.todoArray.map(todo => (
      <TodoItem
        key={todo.id}
        todoItem={todo} // Passing TODOS object
        toggleComplete={this.props.toggleComplete} // Mark a Todo Completed
    
        deleteTodo={this.props.deleteTodo} // Delete a Todo

      />
    ));
  };
  render() {
    return (
      <div>
        {this.ongoingView()}
        {/* {this.completedView()} */}
      </div>
    );
  }
}

// PropTypes
Todos.propTypes = {
  todoArray: PropTypes.array.isRequired,

};

export default Todos;
