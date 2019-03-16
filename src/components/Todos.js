import React, { Component } from "react";
import TodoItem from "./TodoItem";
import CompletedItem from "./CompletedItem";
import PropTypes from "prop-types";

class Todos extends Component {
  ongoingView = () => {
    return this.props.ongoingTodos.map(todo => (
      <TodoItem
        key={todo.id}
        todoItem={todo} // Passing TODOS object
        toggleChecklist={this.props.markComplete} // Mark a Todo Completed
        // markOngoing={this.markOngoing}
        deleteTodo={this.props.deleteTodo} // Delete a Todo
        flag = {true}
      />
    ));
  };

  completedView = () => {
    return this.props.completedTodos.map(todo => (
      <TodoItem
        key={todo.id}
        todoItem={todo} // Passing TODOS object
        toggleChecklist={this.props.markOngoing} // Mark a Todo Completed
        // markOngoing={this.props.markOngoing}
        deleteTodo={this.props.deleteTodo} // Delete a Todo
        flag = {false}
      />
    ));
  };
  render() {
    return (
      <div>
        {this.ongoingView()}
        <h1>Completed</h1>
        {this.completedView()}
      </div>
    );
    // return this.props.ongoingTodos.map(todo => (
    //   <div>
    //     <TodoItem
    //       key={todo.id}
    //       ongoingTodos={todo} // Passing TODOS object
    //       markComplete={this.props.markComplete} // Mark a Todo Completed
    //       markOngoing={this.markOngoing}
    //       deleteTodo={this.props.deleteTodo} // Delete a Todo
    //     />
    //   </div>
    // ));
  }
}

// PropTypes
Todos.propTypes = {
  ongoingTodos: PropTypes.array.isRequired,
  completedTodos: PropTypes.array.isRequired
};

export default Todos;
