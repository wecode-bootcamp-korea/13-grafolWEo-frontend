import React, { Component } from "react";
import { API } from "../../config";
// import EditorsPickTag from "./Components/EditorsPickTag";
import TopCreator from "./Components/TopCreator";
import Slide from "./Components/Slide";
import DiscoverTag from "./Components/DiscoverTag";
import Slider from "react-slick";
import "./Wallpaper.scss";

class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      editorsPickTags: [],
      editorsPickSlides: [],
      topCreators: [],
      discoverTags: [],
    };
  }

  componentDidMount() {
    fetch(`${API}/Data/Wallpaper/EDITORSPICKTAGS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          editorsPickTags: res.editorsPickTags,
        });
      });

    fetch(`${API}/Data/Wallpaper/EDITORSPICKSLIDES.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          editorsPickSlides: res.editorsPickSlides,
        });
      });

    fetch(`${API}/Data/Wallpaper/TOPCREATORS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          topCreators: res.topCreators,
        });
      });

    fetch(`${API}/Data/Wallpaper/DISCOVERTAGS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          discoverTags: res.discoverTags,
        });
      });
  }

  handleClickFollow = (id) => {
    const { topCreators } = this.state;
    const index = topCreators.findIndex((topCreators) => topCreators.id === id);
    const selected = topCreators[index];
    const nextTopCreator = [...topCreators];

    nextTopCreator[index] = {
      ...selected,
      followBtn: !selected.followBtn,
    };
    this.setState({
      topCreators: nextTopCreator,
    });
  };

  render() {
    const { editorsPickSlides, topCreators, discoverTags } = this.state;

    /*
    const editorsPickTagList = editorsPickTags.map(({ id, name }) => (
      <EditorsPickTag key={id} id={id} name={name} />
    ));
    */

    const editorsPickSlideList = editorsPickSlides.map(
      ({
        id,
        wallpaperSrc,
        wallpaperUrl,
        subject,
        profileImgSrc,
        name,
        downloadNum,
        downloadSrc,
      }) => (
        <Slide
          key={id}
          id={id}
          wallpaperSrc={wallpaperSrc}
          wallpaperUrl={wallpaperUrl}
          subject={subject}
          profileImgSrc={profileImgSrc}
          name={name}
          downloadNum={downloadNum}
          downloadSrc={downloadSrc}
        />
      )
    );

    const topCreatorList = topCreators.map(
      ({ id, user_name, profile_image_url, followBtn }) => (
        <TopCreator
          key={id}
          id={id}
          user_name={user_name}
          profile_image_url={profile_image_url}
          followBtn={followBtn}
          handleClickFollow={this.handleClickFollow}
        />
      )
    );

    const discoverTagList = discoverTags.map(({ id, name }) => (
      <DiscoverTag key={id} name={name} />
    ));

    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
    };

    return (
      <div className="Wallpaper">
        <main>
          <article className="editorsPick">
            <div className="container">
              <h2 className="mainTit">
                Editor's Pick
                <ul className="tagList clearFix">
                  <li className="active">
                    <button>일상</button>
                  </li>
                  <li>
                    <button>풍경</button>
                  </li>
                  {/* {editorsPickTagList} */}
                </ul>
              </h2>
              <Slider {...settings} className="slideWrap">
                {editorsPickSlideList}
              </Slider>
            </div>
          </article>
          <article className="topCreators">
            <div className="container">
              <h2 className="mainTit">Top Creators</h2>
              <ul>{topCreatorList}</ul>
            </div>
          </article>
          <article className="discover">
            <div className="container">
              <h2 className="mainTit">
                Discover
                <ul className="categoryType clearFix">
                  <li className="active">
                    <button>태그별</button>
                  </li>
                  <li>
                    <button>색상별</button>
                  </li>
                  <li>
                    <button>유형별</button>
                  </li>
                </ul>
              </h2>
              <ul className="tagItems clearFix">
                <li className="active">
                  <button>전체</button>
                </li>
                {discoverTagList}
              </ul>
            </div>
            <div className="wallpaperCardView">
              <div className="container">
                <ul className="clearFix">
                  <li>
                    <a
                      href="/"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80)`,
                      }}
                    >
                      <div className="slideInfo">
                        <h6>subject</h6>
                        <div className="box">
                          <span className="userInfo">
                            <span
                              className="imgWrap"
                              style={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80)`,
                              }}
                            ></span>
                            <em>작가이름</em>
                          </span>
                          <span className="dwnload">
                            다운로드
                            <em>123</em>
                          </span>
                        </div>
                        <button type="button" className="dwnBtn"></button>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80)`,
                      }}
                    >
                      <div className="slideInfo">
                        <h6>subject</h6>
                        <div className="box">
                          <span className="userInfo">
                            <span
                              className="imgWrap"
                              style={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80)`,
                              }}
                            ></span>
                            <em>작가이름</em>
                          </span>
                          <span className="dwnload">
                            다운로드
                            <em>123</em>
                          </span>
                        </div>
                        <button type="button" className="dwnBtn"></button>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80)`,
                      }}
                    >
                      <div className="slideInfo">
                        <h6>subject</h6>
                        <div className="box">
                          <span className="userInfo">
                            <span
                              className="imgWrap"
                              style={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1107&q=80)`,
                              }}
                            ></span>
                            <em>작가이름</em>
                          </span>
                          <span className="dwnload">
                            다운로드
                            <em>123</em>
                          </span>
                        </div>
                        <button type="button" className="dwnBtn"></button>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }
}

export default Wallpaper;
