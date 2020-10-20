import React, { Component } from "react";
import { FaRegSmile, FaRegUser } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import { Link } from "react-router-dom";

class PopularCreator extends Component {
  render() {
    const {
      name,
      desc,
      profileImgSrc,
      profileLink,
      imgPreviewSrc,
      imgPreviewLink,
      follower,
      like,
      illust,
    } = this.props;
    return (
      <li>
        <div className="inner">
          <div className="profileInfo">
            <Link
              to={profileLink}
              className="artistProfileImg"
              style={{ backgroundImage: `url(${profileImgSrc})` }}
            ></Link>
            <h5>{name}</h5>
            <p>{desc}</p>
            <ul className="actions">
              <li className="follow">
                <span className="icon">
                  <FaRegUser />
                </span>
                <em>{follower}</em>
              </li>
              <li className="like">
                <span className="icon">
                  <IoMdPaper />
                </span>
                <em>{like}</em>
              </li>
              <li className="illust">
                <span className="icon">
                  <FaRegSmile />
                </span>
                <em>{illust}</em>
              </li>
            </ul>
          </div>
          <ul className="clearFix imgThumWrap">
            <li>
              <Link
                to={imgPreviewLink[0]}
                style={{ backgroundImage: `url(${imgPreviewSrc[0]})` }}
              >
                <img src={imgPreviewSrc[0]} alt="대표 이미지" />
              </Link>
            </li>
            <li>
              <Link
                to={imgPreviewLink[1]}
                style={{ backgroundImage: `url(${imgPreviewSrc[1]})` }}
              >
                <img src={imgPreviewSrc[1]} alt="대표 이미지" />
              </Link>
            </li>
            <li>
              <Link
                to={imgPreviewLink[2]}
                style={{ backgroundImage: `url(${imgPreviewSrc[2]})` }}
              >
                <img src={imgPreviewSrc[2]} alt="대표 이미지" />
              </Link>
            </li>
          </ul>
        </div>
      </li>
    );
  }
}

export default PopularCreator;
