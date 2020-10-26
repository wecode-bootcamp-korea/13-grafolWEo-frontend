import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      feedIsActivated: false,
      artIsActivated: false,
      artProductIsActivated: false,
      wallpaperIsActivated: false,
      storyIsActivated: false,
      isHover: false,
    };
  }

  handleColor = (name, location) => {
    this.setState({
      feedIsActivated: name === "feedIsActivated",
      artIsActivated: name === "artIsActivated",
      artProductIsActivated: name === "artProductIsActivated",
      wallpaperIsActivated: name === "wallpaperIsActivated",
      storyIsActivated: name === "storyIsActivated",
    });
    location && this.props.history.push(location);
  };

  handleHover = (state) => {
    this.setState({ isHover: state });
  };
  render() {
    const {
      feedIsActivated,
      artIsActivated,
      artProductIsActivated,
      wallpaperIsActivated,
      storyIsActivated,
    } = this.state;
    return (
      <nav className="Navbar">
        <ul>
          <li>
            <img className="logo" src="/Images/GrafolWeo.png" alt="logo" />
          </li>
          <li
            className={feedIsActivated ? "activated" : "deactivated"}
            onClick={() => this.handleColor("feedIsActivated", "/login")}
          >
            피드
          </li>
          <li
            className={artIsActivated ? "activated" : "deactivated"}
            onClick={() => this.handleColor("artIsActivated")}
          >
            작품
          </li>
          <li
            className={artProductIsActivated ? "activated" : "deactivated"}
            onClick={() => this.handleColor("artProductIsActivated")}
          >
            아트상품
          </li>
          <li
            className={wallpaperIsActivated ? "activated" : "deactivated"}
            onClick={() => this.handleColor("wallpaperIsActivated")}
          >
            배경화면
          </li>
          <li
            className={storyIsActivated ? "activated" : "deactivated"}
            onClick={() => this.handleColor("storyIsActivated")}
          >
            스토리
          </li>
          <li>
            <img src="/Images/menu.png" alt="more_icon" />
          </li>
        </ul>
        <div className="rightMenu">
          <div className="searchBar">
            <input />
            <img src="Images/magnifying-glass.png" alt="search_icon" />
          </div>
          <div className="upload">
            <img src="/Images/upload.png" alt="upload_icon" />
            업로드
          </div>
          <div>
            <img className="bellIcon" src="/Images/bell.png" alt="bell_icon" />
          </div>
          <div
            className="user"
            onMouseEnter={() => this.handleHover(true)}
            onMouseLeave={() => this.handleHover(false)}
          >
            <img src="/Images/user.png" alt="user_icon" />
            {this.state.isHover && (
              <div
                class="hideBox"
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
              >
                <div class="triangle">
                  <ul className="userSubMenu">
                    <li>그라폴위오 MY</li>
                    <li>통계</li>
                    <li>로그아웃</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
export default withRouter(Navbar);
