import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import { Button, Form} from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.boardTitle.value = this.props.location.query.title;
      this.setState({
        data: this.props.location.query.content
      });
    }
  } 

  writeBoard = () => {
    let url;
    let send_param;
    
    if (this.props.location.query !== undefined) {
      send_param = {
        headers,
        "_id" : this.props.location.query._id,
        writer: $.cookie("login_id"),
        "title": this.boardTitle.value,
        "content": this.state.data
      };
      url = "http://localhost:8080/board/update";
    } else {
      send_param = {
        headers,
        "_id" : $.cookie("login_id"),
        "title": this.boardTitle.value,
        "content": this.state.data
      };
      url = "http://localhost:8080/board/write";
    }

    axios
      .post(url, send_param)
      //���� ����
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          window.location.href = "/";
        } else {
          alert("�۾��� ����");
        }
      })
      //����
      .catch(err => {
        console.log(err);
      });
  };

  onEditorChange = evt => {
    this.setState({
      data: evt.editor.getData()
    });
  };

  render() {
    const divStyle = {
      margin: 50
    };

    return (
      <div style={divStyle} className="App">
        <h2>�۾���</h2>
        <Form.Control
          type="text"
          placeholder="�� ����"
          ref={ref => (this.boardTitle = ref)}
        />
        <CKEditor
          data={this.state.data}
          onChange={this.onEditorChange}
        ></CKEditor>
        <Button onClick={this.writeBoard}>
          �����ϱ�
        </Button>
      </div>
    );
  }
}

export default BoardWriteForm;
