import React, { Component } from "react";
import EditorsPickTag from "./Components/EditorsPickTag";
import TopCreator from "./Components/TopCreator";
import Slide from "./Components/Slide";
import Slider from "react-slick";
// import { Link } from "react-router-dom";
import "./Wallpaper.scss";

class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      editorsPickTags: [],
      editorsPickSlides: [],
      topCreators: [],
    };
  }

  componentDidMount() {
    // 에디터 pick Tags
    fetch("http://localhost:3000/Data/Wallpaper/EDITORSPICKTAGS.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          editorsPickTags: res.editorsPickTags,
        });
      });

    // 에디터 pick slides
    fetch("http://localhost:3000/Data/Wallpaper/EDITORSPICKSLIDES.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          editorsPickSlides: res.editorsPickSlides,
        });
      });

    // Top Creators
    fetch("http://localhost:3000/Data/Wallpaper/TOPCREATORS.json")
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

    nextTopCreator[index] = {
      ...selected,
      followBtn: !selected.followBtn,
    };
    this.setState({
      topCreators: nextTopCreator,
    });
  };

  render() {
    const { editorsPickTags, editorsPickSlides, topCreators } = this.state;

    const editorsPickTagList = editorsPickTags.map(({ id, name }) => (
      <EditorsPickTag key={id} id={id} name={name} />
    ));

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
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
    };

    return (
      <div className="Wallpaper">
        <main className="container">
          <article className="editorsPick">
            <h2 className="mainTit">
              Editor's Pick
              <ul className="tagList clearFix">
                <li className="active">
                  <button>태그</button>
                </li>
                {editorsPickTagList}
              </ul>
            </h2>
            <Slider {...settings} className="slideWrap">
              {editorsPickSlideList}
            </Slider>
          </article>
          <article className="topCreators">
            <h2 className="mainTit">Top Creators</h2>
            <ul>{topCreatorList}</ul>
          </article>
          <article className="discover">
            <h2 className="mainTit">Discover</h2>
          </article>
        </main>
      </div>
    );
  }
}

export default Wallpaper;
