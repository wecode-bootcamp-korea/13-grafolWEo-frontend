import React, {Component} from 'react';
import {FaRegUser} from 'react-icons/fa';
import './Button.scss';
export class Button extends Component {
  constructor() {
    super();

    this.state = {
      text: true,
      text_color: true,
    };
  }

  changeTextColor = () => {
    this.setState({text_color: !this.state.text_color});
  };
  changeText = () => {
    this.setState({text: !this.state.text});
  };

  render() {
    let textColor = this.state.text_color ? 'white' : 'blue';

    return (
      <div>
        <button
          className="followIcon"
          style={{color: textColor}}
          onClick={() => {
            this.changeText();
            this.changeTextColor();
          }}
        >
          <FaRegUser />
          <span>{this.state.text ? '팔로우' : '팔로잉'}</span>
        </button>
      </div>
    );
  }
}

export default Button;
