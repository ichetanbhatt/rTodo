import React, { Component } from "react";
import {
  MDBNavbar,
  // MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBFormInline,
  MDBIcon,
  MDBBtn,
  MDBInput
} from "mdbreact";

export class Header extends Component {
  state = {
    search: ""
  };
  onChange = e => {
    this.setState({ search: e.target.value }, () => {
      this.props.searchTodo(this.state.search);
    });
  };
  render() {
    return (
      <div>
        <MDBNavbar
          style={{ backgroundColor: "#494ca2" }}
          dark
        >
          <MDBNavbarNav left>
            <MDBNavItem>
              <form className="form-inline my-0">
                <input
                  className="form-control form-control-sm mr-2 w-75"
                  type="text"
                  name="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.search}
                  onChange={this.onChange}
                />
                <MDBIcon style={{ color: "white" }} icon="search" />
              </form>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBBtn
                color="danger"
                style={{ margin: "0", padding: ".375rem .75rem" }}
                onClick={this.props.resetTodos}
              >
                <span>
                  Reset <MDBIcon icon="trash" />
                </span>
              </MDBBtn>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </div>
    );
  }
}

export default Header;
