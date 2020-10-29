import React, { Component } from "react";
import { CATEGORY, API, WorksListPageView, CARDDATA } from "../../config";
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
      bannerBgSrc: "",
      categoryToggle: false,
      category: [],
      listBannerTags: [],
      menuTabActiveId: 0,
      discoverTabActive: 1,
      category: 11,
    };
  }

  handleClickMenuTab = (id) => {
    this.setState({ menuTabActiveId: id });
  };

  getCategoryId = () => {
    fetch(`${CARDDATA}tag?category_id=${this.state.category}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          listBannerTags: res.listBannerTags,
          bannerBgSrc: res.categoryImage,
        });
      });
  };

  getCategoryName = () => {
    fetch(`${API}/Data/List/CATEGORY.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          category: res.category,
        });
      });
  };

  componentDidMount() {
    this.setState({
      listName: CATEGORY[0].name,
    });
    this.getCategoryName();
    this.getCategoryId();
  }

  handleToggle = () => {
    this.setState({
      categoryToggle: !this.state.categoryToggle,
    });
  };

  handleClickDiscoverTab = (id) => {
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

    const categoryList = category.map(({ id, name }) => (
      <ListCategory
        key={id}
        name={name}
        onClick={(id) => this.getCategoryId(id)}
      />
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
