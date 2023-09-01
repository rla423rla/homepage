import React, { Component } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {
  state = {
    buttonDisplay: "none"
  };

  componentDidMount() {
    if ($.cookie("login_id")) {
      this.setState({
        buttonDisplay: "block"
      });
    } else {
      this.setState({
        buttonDisplay: "none"
      });
    }
  }

  logout = () => {
    axios
      .get("http://localhost:8080/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("�α׾ƿ� �Ǿ����ϴ�!");
          window.location.href = "/";
        }
      });
  };
  render() {
    const buttonStyle = {
      margin: "0px 5px 0px 10px",
      display: this.state.buttonDisplay
    };

    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/">Today I Learned</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavLink to="/">
              <Button style={buttonStyle} variant="primary">
                �۸��
              </Button>
            </NavLink>
            <NavLink to="/boardWrite">
              <Button style={buttonStyle} variant="primary">
                �۾���
              </Button>
            </NavLink>
            <Button style={buttonStyle} onClick={this.logout} variant="primary">
              �α׾ƿ�
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <Image src="./img/main.png" fluid />
      </div>
    );
  }
}

export default Header;
