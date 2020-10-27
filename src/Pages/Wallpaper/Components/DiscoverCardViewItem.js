import React, { Component } from "react";
import { Link } from "react-router-dom";

class DiscoverCardViewItem extends Component {
  render() {
    const { profileImgSrc, subject, name, downloadNum } = this.props;
    return (
      <li>
        <Link
          to="/"
          style={{
            backgroundImage: `url(${profileImgSrc})`,
          }}
        >
          <div className="slideInfo">
            <h6>{subject}</h6>
            <div className="box">
              <span className="userInfo">
                <span
                  className="imgWrap"
                  style={{
                    backgroundImage: `url(${profileImgSrc})`,
                  }}
                ></span>
                <em>{name}</em>
              </span>
              <span className="dwnload">
                다운로드
                <em>{downloadNum}</em>
              </span>
            </div>
            <button type="button" className="dwnBtn"></button>
          </div>
        </Link>
      </li>
    );
  }
}

export default DiscoverCardViewItem;
