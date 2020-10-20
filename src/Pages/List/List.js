import React, { Component } from "react";
import ListTag from "./Components/ListTag";
import ListCategory from "./Components/ListCategory";
import PopularCreator from "./Components/PopularCreator";
import { AiFillCaretDown } from "react-icons/ai";
import "./List.scss";

class List extends Component {
  constructor() {
    super();
    this.state = {
      listName: "사진",
      bannerBgSrc:
        "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80",
      categoryToggle: false,
      category: [],
      listBannerTags: [],
      popularCreator: [],
    };
  }

  componentDidMount() {
    // 상단 배너 카테고리
    fetch("http://localhost:3000/Data/List/CATEGORY.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          category: res.category,
        });
      });

    // 상단 배너 태그
    fetch("http://localhost:3000/Data/List/LISTBANNERTAGS.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          listBannerTags: res.listBannerTags,
        });
      });

    // 인기 크리에이터
    fetch("http://localhost:3000/Data/List/POPULARLIST.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          popularCreator: res.popularCreator,
        });
      });
  }

  handleToggle = () => {
    this.setState({
      categoryToggle: !this.state.categoryToggle,
    });
  };

  render() {
    const {
      listBannerTags,
      listName,
      category,
      categoryToggle,
      bannerBgSrc,
      popularCreator,
    } = this.state;

    const tagList = listBannerTags.map(({ id, name }) => (
      <ListTag key={id} name={name} />
    ));

    const categoryList = category.map(({ id, name, src }) => (
      <ListCategory key={id} name={name} src={src} />
    ));

    const popularCreatorList = popularCreator.map(
      ({
        id,
        profileImgSrc,
        profileLink,
        name,
        desc,
        imgPreviewSrc,
        imgPreviewLink,
        follower,
        like,
        illust,
      }) => (
        <PopularCreator
          key={id}
          profileImgSrc={profileImgSrc}
          profileLink={profileLink}
          name={name}
          desc={desc}
          imgPreviewSrc={imgPreviewSrc}
          imgPreviewLink={imgPreviewLink}
          follower={follower}
          like={like}
          illust={illust}
        />
      )
    );

    return (
      <div className="List">
        <header
          className="listBanner"
          style={{ backgroundImage: `url(${bannerBgSrc})` }}
        >
          <div className="inner">
            <div className="listCategoryWrap">
              <button
                onClick={this.handleToggle}
                className={categoryToggle ? "active" : ""}
              >
                {listName}
                <span className="icon">
                  <AiFillCaretDown />
                </span>
              </button>
              <ul className="clearFix listCategory">{categoryList}</ul>
            </div>
            <ul className="tags">{tagList}</ul>
          </div>
        </header>
        <main>
          <nav className="listFilter">
            <ul>
              <li>
                <button>추천</button>
              </li>
              <li>
                <button>최신</button>
              </li>
              <li className="active">
                <button>인기크리에이터</button>
              </li>
            </ul>
          </nav>
          <section className="recommend">{/* 추천 컴포넌트 */}</section>
          <section className="latest">{/* 최신 컴포넌트 */}</section>
          <section className="popular">
            <div className="container">
              <ul className="clearFix list">{popularCreatorList}</ul>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default List;
