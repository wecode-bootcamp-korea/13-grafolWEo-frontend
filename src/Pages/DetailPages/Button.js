import React, {Component} from 'react';
import {FaRegUser} from 'react-icons/fa';
import './Button.scss';
export class Button extends Component {
  constructor() {
    super();

    this.state = {
      text: false,
      text_color: false,
    };
  }

  // changeTextColor = () => {
  //   this.setState({text_color: !this.state.text_color});
  // };
  // changeText = () => {
  //   this.setState({text: !this.state.text});
  // };

  follow = () => {
    fetch('http://10.58.7.192:8000/works/follow', {
      method: 'post',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMn0.b5rBeum65kbz38B97IV8O-CMhdJXptXV4gK00a3DV2s',
      },
      body: JSON.stringify({creator_id: 10}),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          text_color: res.data.followBtn,
          text: res.data.followBtn,
        });
      });
  };

  followCheck = () => {
    fetch('http://10.58.7.192:8000/works/follow?creator_id=10', {
      method: 'get',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMn0.b5rBeum65kbz38B97IV8O-CMhdJXptXV4gK00a3DV2s',
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
  };

  componentDidMount() {
    this.followCheck();
  }

  render() {
    let textColor = this.state.text_color ? 'black' : 'white';

    return (
      <div>
        <button
          className="followIcon"
          style={{color: textColor}}
          onClick={() => {
            this.follow();
          }}
        >
          <FaRegUser />
          <span>{this.state.text ? '팔로잉' : '팔로우'}</span>
        </button>
      </div>
    );
  }
}

export default Button;
