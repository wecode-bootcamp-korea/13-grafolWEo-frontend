import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListCategory extends Component {
  render() {
    const { src, name } = this.props;
    return (
      <li>
        <Link to={src}>{name}</Link>
      </li>
    );
  }
}

export default ListCategory;
