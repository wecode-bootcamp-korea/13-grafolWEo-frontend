import React, { Component } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

class TopCreator extends Component {
  render() {
    const {
      id,
      user_name,
      profile_image_url,
      followBtn,
      handleClickFollow,
    } = this.props;
    return (
      <li>
        <span
          className="imgWrap"
          style={{ backgroundImage: `url(${profile_image_url})` }}
        >
          <img src={profile_image_url} alt="작가 프로필 이미지" />
        </span>
        <h5>{user_name}</h5>
        <button
          className={followBtn ? "active" : ""}
          onClick={() => {
            handleClickFollow(id);
          }}
        >
          {followBtn ? <IoMdCheckmark /> : <AiOutlinePlus />}
        </button>
      </li>
    );
  }
}

export default TopCreator;
