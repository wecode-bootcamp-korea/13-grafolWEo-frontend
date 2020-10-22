import React, { Component } from "react";

class EditorsPickTag extends Component {
  render() {
    const { name } = this.props;
    return (
      <li>
        <button>{name}</button>
      </li>
    );
  }
}

export default EditorsPickTag;
