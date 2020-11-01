import React, { Component } from "react";
import { FaRegUser } from "react-icons/fa";
import "./Button.scss";
export class Button extends Component {
  constructor() {
    super();

    this.state = {
      text: false,
      text_color: false,
    };
  }

  follow = () => {
    const token = localStorage.getItem("Authorization");
    const { creatorId } = this.props;

    if (!token) {
      alert("로그인을 해주세요");
    } else {
      fetch("http://10.58.7.192:8000/works/follow", {
        method: "post",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({ creator_id: creatorId }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({
            text_color: res.data.followBtn,
            text: res.data.followBtn,
          });
        });
    }
  };

  followCheck = () => {
    const token = localStorage.getItem("Authorization");
    const { creatorId } = this.props;

    if (!token) {
      fetch(`http://10.58.7.192:8000/works/follow?creator_id=${creatorId}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({
            text_color: res.data.followBtn,
            text: res.data.followBtn,
          });
        });
    } else {
      fetch(`http://10.58.7.192:8000/works/follow?creator_id=${creatorId}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({
            text_color: res.data.followBtn,
            text: res.data.followBtn,
          });
        });
    }
  };

  componentDidMount() {
    this.followCheck();
  }

  render() {
    // let textColor = this.state.text_color ? "black" : "white";

    return (
      <div className="followIcon">
        <button
          // className="followIcon"
          className={this.state.text_color ? "active" : ""}
          // style={{ color: textColor }}
          onClick={() => {
            this.follow();
          }}
        >
          <FaRegUser />
          <span>{this.state.text ? "팔로잉" : "팔로우"}</span>
        </button>
      </div>
    );
  }
}

export default Button;
