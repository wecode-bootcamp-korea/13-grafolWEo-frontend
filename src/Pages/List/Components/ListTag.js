import React, { Component } from "react";

class ListTag extends Component {
  render() {
    const { name } = this.props;
    return <li>{name}</li>;
  }
}

export default ListTag;
