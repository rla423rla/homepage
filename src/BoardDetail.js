import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
  state = {
    board: []
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.getDetail();
    } else {
      window.location.href = "/";
    }
  }

  deleteBoard = _id => {
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("���� �����Ͻðڽ��ϱ�?")) {
      axios
        .post("http://localhost:8080/board/delete", send_param)
        //�������
        .then(returnData => {
          alert("�Խù��� ���� �Ǿ����ϴ�.");
          window.location.href = "/";
        })
        //����
        .catch(err => {
          console.log(err);
          alert("�� ���� ����");
        });
    }
  };

  getDetail = () => {
    const send_param = {
      headers,
      _id: this.props.location.query._id
    };
    axios
      .post("http://localhost:8080/board/detail", send_param)
      //�������
      .then(returnData => {
        if (returnData.data.board[0]) {
          const board = (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{returnData.data.board[0].title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: returnData.data.board[0].content
                      }}
                    ></td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <NavLink
                  to={{
                    pathname: "/boardWrite",
                    query: {
                      title: returnData.data.board[0].title,
                      content: returnData.data.board[0].content,
                      _id: this.props.location.query._id
                    }
                  }}
                >
                  <Button>
                    �� ����
                  </Button>
                </NavLink>
                <Button
                  block
                  onClick={this.deleteBoard.bind(
                    null,
                    this.props.location.query._id
                  )}
                >
                  �� ����
                </Button>
              </div>
            </div>
          );
          this.setState({
            board: board
          });
        } else {
          alert("�� �� ��ȸ ����");
        }
      })
      //����
      .catch(err => {
        console.log(err);
      });
  };

  //onClick={this.getBoard.bind(null,this.props._id)}
  render() {
    const divStyle = {
      margin: 50
    };
    return <div style={divStyle}>{this.state.board}</div>;
  }
}

export default BoardDetail;
