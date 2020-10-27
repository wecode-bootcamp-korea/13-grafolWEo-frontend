import React, { Component } from "react";
import { Link } from "react-router-dom";
import UrlDownloadBtn from "./UrlDownloadBtn";

class Slide extends Component {
  render() {
    const { handleClickUrlDownload } = this;
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
            <UrlDownloadBtn handleClickUrlDownload={handleClickUrlDownload} />
          </div>
        </Link>
      </div>
    );
  }
}

export default Slide;
