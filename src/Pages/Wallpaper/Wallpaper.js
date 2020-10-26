import React, { Component } from "react";
import { API, DISCOVERTABLIST } from "../../config";
import Slider from "react-slick";
import TopCreator from "./Components/TopCreator";
import DiscoverTagList from "./Components/DiscoverTagList";
import DiscoverColorList from "./Components/DiscoverColorList";
import DiscoverTypeList from "./Components/DiscoverTypeList";
import Slide from "./Components/Slide";
import "./Wallpaper.scss";

const menuTabObj = {
  1: <DiscoverTagList />,
  2: <DiscoverColorList />,
  3: <DiscoverTypeList />,
};

class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      menuTabActiveId: 1,
      editorsPickTagActive: 1,
      topCreatorsActive: 1,
      discoverTabActive: 1,
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

    fetch(`${API}/Data/Wallpaper/TOPCREATORS.json`)
      // fetch(`http://10.58.7.192:8000/works/wallpaper/topcreators`)
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

  handleClickEditorPickTag = (id) => {
    console.log(id);
    // fetch(`http://10.58.7.192:8000/works/wallpaper/${id}`)
    fetch(`${API}/Data/Wallpaper/EDITORSPICKSLIDES.json`)
      .then((res) => res.json())
      .then((res) => {
        console.log(id);
        this.setState({
          editorsPickTagActive: id,
          editorsPickSlides: res.editorsPickData.Slides,
        });
      });
  };

  handleClickDiscoverTab = (id) => {
    this.setState({
      discoverTabActive: id,
      menuTabActiveId: id,
    });
  };

  render() {
    const {
      editorsPickTagList,
      editorsPickSlides,
      topCreators,
      menuTabActiveId,
      editorsPickTagActive,
      discoverTabActive,
    } = this.state;
    const {
      handleClickEditorPickTag,
      handleClickDiscoverTab,
      handleClickFollow,
    } = this;

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
          handleClickFollow={handleClickFollow}
        />
      )
    );

    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 800,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
    };

    return (
      <div className="Wallpaper">
        <main>
          <article className="editorsPick">
            <div className="container">
              <h2 className="mainTit">
                Editor's Pick
                <ul className="tagList clearFix">
                  {editorsPickTagList.map((tag) => (
                    <li
                      key={tag.id}
                      className={
                        editorsPickTagActive === tag.id ? "active" : ""
                      }
                    >
                      <button
                        onClick={() => {
                          handleClickEditorPickTag(tag.id);
                        }}
                      >
                        {tag.name}
                      </button>
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
                  {DISCOVERTABLIST.map((tab) => (
                    <li
                      key={tab.id}
                      className={discoverTabActive === tab.id ? "active" : ""}
                    >
                      <button
                        onClick={() => {
                          handleClickDiscoverTab(tab.id);
                        }}
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </h2>
            </div>
            {menuTabObj[menuTabActiveId]}
          </article>
        </main>
      </div>
    );
  }
}

export default Wallpaper;
