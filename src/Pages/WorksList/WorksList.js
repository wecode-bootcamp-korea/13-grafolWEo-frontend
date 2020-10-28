import React, { Component } from "react";
import {
  CATEGORY,
  LISTBANNERBGSRC,
  API,
  WorksListPageView,
} from "../../config";
import { AiFillCaretDown } from "react-icons/ai";
import ListTag from "./Components/ListTag";
import ListCategory from "./Components/ListCategory";
import PopularCreator from "./Components/PopularCreator";
import Recommend from "./Components/Recommend";
import New from "./Components/New";
import "./WorksList.scss";

const menuTabObj = {
  1: <Recommend />,
  2: <New />,
  3: <PopularCreator />,
};

export default class WorksList extends Component {
  constructor() {
    super();
    this.state = {
      listName: "",
      bannerBgSrc: [],
      categoryToggle: false,
      category: [],
      listBannerTags: [],
      menuTabActiveId: 0,
      discoverTabActive: 1,
    };
  }

  handleClickMenuTab = (id) => {
    this.setState({ menuTabActiveId: id });
  };

  componentDidMount() {
    this.setState({
      bannerBgSrc: LISTBANNERBGSRC,
      listName: CATEGORY[0].name,
    });

    fetch(`${API}/Data/List/CATEGORY.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          category: res.category,
        });
      });

    fetch(`${API}/Data/List/LISTBANNERTAGS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          listBannerTags: res.listBannerTags,
        });
      });
  }

  handleToggle = () => {
    this.setState({
      categoryToggle: !this.state.categoryToggle,
    });
  };

  handleClickDiscoverTab = (id) => {
    console.log(id);
    this.setState({
      discoverTabActive: id,
    });
  };

  render() {
    const {
      listBannerTags,
      listName,
      category,
      categoryToggle,
      bannerBgSrc,
      discoverTabActive,
    } = this.state;
    const { handleClickDiscoverTab, handleToggle } = this;

    const tagList = listBannerTags.map(({ id, name }) => (
      <ListTag key={id} name={name} />
    ));

    const categoryList = category.map(({ id, name, src }) => (
      <ListCategory key={id} name={name} src={src} onClick />
    ));

    return (
      <div className="WorksList">
        <header
          className="listBanner"
          style={{ backgroundImage: `url(${bannerBgSrc})` }}
        >
          <div className="inner">
            <div className="listCategoryWrap">
              <button
                onClick={handleToggle}
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
              {WorksListPageView.map((tab) => (
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
          </nav>
          <div className="container">
            {menuTabObj[this.state.discoverTabActive]}
          </div>
        </main>
      </div>
    );
  }
}
