import React, { Component } from "react";
import { Link } from "react-router-dom";
import UrlDownloadBtn from "../../../Components/Wallpaper/UrlDownloadBtn";

class Slide extends Component {
  render() {
    const {
      wallpaper_id,
      wallpaperSrc,
      subject,
      profileImgSrc,
      name,
      downloadNum,
    } = this.props;

    return (
      <div className="Slide DiscoverCardViewItem">
        <Link
          to={`/WallpaperDetail/${wallpaper_id}`}
          style={{ backgroundImage: `url(${wallpaperSrc})` }}
        />
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
          <UrlDownloadBtn wallpaper_id={wallpaper_id} />
        </div>
      </div>
    );
  }
}

export default Slide;
