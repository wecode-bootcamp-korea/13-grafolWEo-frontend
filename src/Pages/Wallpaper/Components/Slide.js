import React, { Component } from "react";
import { Link } from "react-router-dom";

class Slide extends Component {
  render() {
    const {
      wallpaperUrl,
      wallpaperSrc,
      subject,
      profileImgSrc,
      name,
      downloadNum,
    } = this.props;

    return (
      <div className="item">
        <Link
          to={wallpaperUrl}
          style={{ backgroundImage: `url(${wallpaperSrc})` }}
        >
          <div className="slideInfo">
            <h6>{subject}</h6>
            <div className="box">
              <span className="userInfo">
                <span
                  className="imgWrap"
                  style={{ backgroundImage: `url(${profileImgSrc})` }}
                >
                  <img src={profileImgSrc} alt="에디터 픽 배경화면 이미지" />
                </span>
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
      </div>
    );
  }
}

export default Slide;
