import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBFormInline,
  MDBContainer,
  MDBIcon
} from "mdbreact";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todoItem.completed ? "line-through" : "none"
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
    const { id, title } = this.props.todoItem;
    const flag = this.props.flag;

    return (
      // <div style={this.getStyle()}>
      //   <p>
      //     <input
      //       type="checkbox"
      //       onChange={this.props.toggleChecklist.bind(this, id)}
      //     />{" "}
      //     {title}
      //     <button onClick={this.props.deleteTodo.bind(this, id, flag )}>DELETE</button>
      //   </p>
      // </div>



      <MDBCard>
        <MDBCardBody>  
          <MDBContainer>
            <MDBRow>
              <MDBCol size="1">
                <input
                  type="checkbox"
                  onChange={this.props.toggleChecklist.bind(this, id)}
                />
                
              </MDBCol>
              <MDBCol size="10">{title}</MDBCol>
              <MDBCol size="1">
                <span
                  className="hoverable"
                  onClick={this.props.deleteTodo.bind(this, id, flag)}
                >
                  <MDBIcon className="hoverable" far icon="trash-alt" />
                </span>
              </MDBCol>
            </MDBRow>

          </MDBContainer>

        </MDBCardBody>
      </MDBCard>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todoItem: PropTypes.object.isRequired
};

export default TodoItem;
