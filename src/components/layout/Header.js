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
          style={{ backgroundColor: "#2EBE60", color: "#666666" }}
          dark
          expand="md"
        >
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  {/* <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  /> */}
                  <MDBInput
                    label="Search"
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                    outline
                  />
                </div>
              </MDBFormInline>
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
