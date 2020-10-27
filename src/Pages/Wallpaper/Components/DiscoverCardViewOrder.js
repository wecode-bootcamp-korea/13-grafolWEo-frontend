import React, { Component } from "react";
import { ORDERS } from "../../../config";

class DiscoverCardViewOrder extends Component {
  render() {
    const { handleClickOrder } = this.props;
    return (
      <ul className="option">
        {ORDERS.map((tag, idx) => (
          <li
            key={idx}
            onClick={() => {
              handleClickOrder(tag.name);
            }}
          >
            {tag.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default DiscoverCardViewOrder;
