import React, { Component } from "react";
import { RiFileCopy2Line } from "react-icons/ri";
import "./DownloadComplete.scss";

export default class DownloadComplete extends Component {
  render() {
    return (
      <div className="downloadModal active">
        <span className="icon">
          <RiFileCopy2Line />
        </span>
        <h4>클립보드에 복사 되었습니다.</h4>
      </div>
    );
  }
}
