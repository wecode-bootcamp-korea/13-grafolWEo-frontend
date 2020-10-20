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
      /* Top Banner */
      listName: "사진", // 카테고리명
      // 카테고리 배경 이미지 src
      bannerBgSrc:
        "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80",
      categoryToggle: false,
      category: [
        // 카테고리 nav
        { id: 1, name: "일러스트", src: "/" },
        { id: 2, name: "사진", src: "/" },
        { id: 3, name: "회화", src: "/" },
        { id: 4, name: "조소/공예", src: "/" },
        { id: 5, name: "디자인", src: "/" },
        { id: 6, name: "캘리그라피", src: "/" },
        { id: 7, name: "사운드", src: "/" },
      ],
      listBannerTags: [
        // tags
        { id: 1, name: "태그1" },
        { id: 2, name: "태그2" },
        { id: 3, name: "태그3" },
        { id: 4, name: "태그4" },
        { id: 5, name: "태그5" },
      ],
      /* Top Banner -- end */
      /* Popular Creator */
      popularCreator: [],
      /* Popular Creator -- end */
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/Data/List/POPULARLIST.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          popularCreator: res.data,
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
