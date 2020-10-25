import React, { Component } from "react";
import { API } from "../../config";
import Slider from "react-slick";
import TopCreator from "./Components/TopCreator";
import DiscoverTagList from "./Components/DiscoverTagList";
import DiscoverColorList from "./Components/DiscoverColorList";
import DiscoverTypeList from "./Components/DiscoverTypeList";
import Slide from "./Components/Slide";
import "./Wallpaper.scss";

const menuTabObj = {
  0: <DiscoverTagList />,
  1: <DiscoverColorList />,
  2: <DiscoverTypeList />,
};

class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      menuTabActiveId: 0,
      editorsPickTagList: [],
      editorsPickSlides: [],
      topCreators: [],
    };
  }

  componentDidMount() {
    fetch(`${API}/Data/Wallpaper/EDITORSPICKSLIDES.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          editorsPickTagList: res.editorsPickData.TagList,
          editorsPickSlides: res.editorsPickData.Slides,
        });
      });

    // fetch(`${API}/Data/Wallpaper/TOPCREATORS.json`)
    fetch(`http://10.58.7.192:8000/works/wallpaper/topcreators`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          topCreators: res.topCreators,
        });
      });
  }

  handleClickFollow = (id) => {
    const { topCreators } = this.state;
    const index = topCreators.findIndex((topCreators) => topCreators.id === id);
    const selected = topCreators[index];
    const nextTopCreator = [...topCreators];

    fetch("http://10.58.7.192:8000/works/wallpaper/follow", {
      method: "post",
      body: JSON.stringify({
        creator_id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        nextTopCreator[index] = {
          ...selected,
          followBtn: res.data.followBtn,
        };
        this.setState({
          topCreators: nextTopCreator,
        });
      });
  };

  render() {
    const { editorsPickTagList, editorsPickSlides, topCreators } = this.state;

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
                  {editorsPickTagList.map((tag) => (
                    <li key={tag.id} style={{ backgroundColor: tag.hexCode }}>
                      <button>{tag.name}</button>
                    </li>
                  ))}
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
            </div>
            {menuTabObj[this.state.menuTabActiveId]}
          </article>
        </main>
      </div>
    );
  }
}

export default Wallpaper;
