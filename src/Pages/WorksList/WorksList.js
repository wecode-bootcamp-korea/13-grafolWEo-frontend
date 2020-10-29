import React, { Component } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { CATEGORY, WorksListPageView, CARDDATA } from "../../config";
import ListTag from "./Components/ListTag";
import ListCategory from "./Components/ListCategory";
import PopularCreator from "./Components/PopularCreator";
import WorksListRecommend from "./Components/WorksListRecommend";
import WorksListNew from "./Components/WorksListNew";
import "./WorksList.scss";

export default class WorksList extends Component {
  constructor() {
    super();
    this.state = {
      listName: CATEGORY[0].name,
      categoryName: "11",
      bannerBgSrc: "",
      categoryToggle: false,
      category: CATEGORY,
      listBannerTags: [],
      menuTabActiveId: 0,
      discoverTabActive: 1,
    };
  }

  menuTabObj = (categoryName) => {
    return [
      <></>,
      <WorksListRecommend categoryName={categoryName} key={categoryName} />,
      <WorksListNew categoryName={categoryName} key={categoryName} />,
      <PopularCreator categoryName={categoryName} key={categoryName} />,
    ];
  };

  handleClickMenuTab = (id) => {
    this.setState({ menuTabActiveId: id });
  };

  changeMainPage = (id, name) => {
    this.setState(
      {
        categoryName: id,
        listName: name,
      },
      () => {
        this.getCategoryId();
      }
    );
  };

  getCategoryId = () => {
    fetch(`${CARDDATA}tag?category_id=${this.state.categoryName}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          listBannerTags: res.listBannerTags,
          bannerBgSrc: res.categoryImage,
        });
      });
  };

  componentDidMount() {
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
      categoryName,
    } = this.state;
    const { handleClickDiscoverTab, handleToggle } = this;

    const tagList = listBannerTags.map(({ id, name }) => (
      <ListTag key={id} name={name} />
    ));

    const categoryList = category.map(({ id, name }) => (
      <ListCategory
        key={id}
        id={id}
        name={name}
        changeMainPage={this.changeMainPage}
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
            {this.menuTabObj(categoryName)[this.state.discoverTabActive]}
          </div>
        </main>
      </div>
    );
  }
}
