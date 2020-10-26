import React, { Component } from "react";
import { Link } from "react-router-dom";

class Slide extends Component {
  render() {
    const {
      wallpaperSrc,
      subject,
      profileImgSrc,
      name,
      downloadNum,
    } = this.props;

    return (
      <div className="Slide">
        <Link to="/" style={{ backgroundImage: `url(${wallpaperSrc})` }}>
          <div className="slideInfo">
            <h6>{subject}</h6>
            <div className="box">
              <span className="userInfo">
                <span
                  className="imgWrap"
                  style={{ backgroundImage: `url(${profileImgSrc})` }}
                ></span>
                <em>{name}</em>
              </span>
              <span className="download">
                다운로드
                <em>{downloadNum}</em>
              </span>
            </div>
            <button type="button" className="dwnBtn"></button>
          </div>
        </Link>
      </div>
    );
  }
}

export default Slide;
