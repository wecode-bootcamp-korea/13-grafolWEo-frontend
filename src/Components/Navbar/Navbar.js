import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";

let controlActivation = [
  { id: 2, path: "/", content: "작품" },
  { id: 3, path: "/", content: "아트상품" },
  { id: 4, path: "/Wallpaper", content: "배경화면" },
  { id: 5, path: "", content: "스토리" },
];

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      activatedIndex: 0,
      isHover: false,
      isLogin: false,
    };
  }

  handleCategory = (id, path) => {
    this.setState({
      activatedIndex: id,
    });
    path && this.props.history.push(path);
  };

  handleHover = (state) => {
    this.setState({ isHover: state });
  };

  logout = () => {
    console.log(this.state.isLogin);
    localStorage.removeItem("Authorization");
    this.setState({ isLogin: false });
    controlActivation.shift();
  };

  componentDidMount() {
    if (localStorage.getItem("Authorization")) {
      controlActivation.unshift({ id: 1, path: "/Feeds", content: "피드" });
      this.setState({ isLogin: true });
    } else {
      controlActivation.shift();
    }
  }

  render() {
    const { isLogin } = this.state;
    return (
      <nav className="Navbar">
        <ul className="menu">
          <li>
            <img className="logo" src="/Images/GrafolWeo.png" alt="logo" />
          </li>
          {controlActivation.map((category, idx) => {
            return (
              <li
                key={idx}
                className={
                  category.id === this.state.activatedIndex
                    ? "activated"
                    : "deactivated"
                }
                onClick={() => this.handleCategory(category.id, category.path)}
              >
                {category.content}
              </li>
            );
          })}
          <li>
            <div className="more">
              <img src="/Images/menu.png" alt="more_icon" />
            </div>
          </li>
        </ul>
        <div className="rightMenu">
          <div className="searchBar">
            <input />
            <img src="Images/magnifying-glass.png" alt="search_icon" />
          </div>
          {!isLogin && (
            <button>
              <Link to="/Login">로그인</Link>
            </button>
          )}
          <div className={`upload ${!isLogin ? "display-none" : ""}`}>
            <img src="/Images/upload.png" alt="upload_icon" />
            업로드
          </div>
          <div className={`img ${!isLogin ? "display-none" : ""}`}>
            <img className="bellIcon" src="/Images/bell.png" alt="bell_icon" />
          </div>
          <div
            className={`user ${!isLogin ? "display-none" : ""}`}
            onMouseEnter={() => this.handleHover(true)}
            onMouseLeave={() => this.handleHover(false)}
          >
            <img src="/Images/user.png" alt="user_icon" />
            {this.state.isHover && (
              <div
                className="hideBox"
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
              >
                <div className="triangle">
                  <ul className="userSubMenu">
                    <li>그라폴위오 MY</li>
                    <li>통계</li>
                    <li onClick={this.logout}>로그아웃</li>
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
