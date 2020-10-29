import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListCategory extends Component {
  render() {
    const { id, name, changeMainPage } = this.props;
    return (
      <li>
        <Link
          onClick={() => {
            changeMainPage(id, name);
          }}
        >
          {name}
        </Link>
      </li>
    );
  }
}

export default ListCategory;
