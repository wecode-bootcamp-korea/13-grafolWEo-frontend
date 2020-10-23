import React, { Component } from "react";

class DiscoverTag extends Component {
  render() {
    return (
      <li>
        <button>{this.props.name}</button>
      </li>
    );
  }
}

export default DiscoverTag;
