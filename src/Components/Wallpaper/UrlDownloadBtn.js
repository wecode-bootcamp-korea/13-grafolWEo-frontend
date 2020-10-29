import React, { Component } from "react";
import { ST_URL } from "../../config";
import "./UrlDownloadBtn.scss";

class UrlDownloadBtn extends Component {
  handleClickDownload = (wallpaper_id) => {
    fetch(`${ST_URL}/works/wallpaper/download`, {
      method: "post",
      body: JSON.stringify({
        wallpaper_id: wallpaper_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("클립보드에 복사 되었습니다.");
      });
  };

  render() {
    const { wallpaper_id } = this.props;
    const { handleClickDownload } = this;

    return (
      <button
        type="button"
        className="dwnBtn"
        onClick={() => {
          handleClickDownload(wallpaper_id);
        }}
      ></button>
    );
  }
}

export default UrlDownloadBtn;
