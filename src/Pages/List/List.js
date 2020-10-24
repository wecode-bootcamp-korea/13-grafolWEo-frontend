import React, { Component } from "react";
import { CATEGORY, LISTBANNERBGSRC, API } from "../../config";
import { AiFillCaretDown } from "react-icons/ai";
import ListTag from "./Components/ListTag";
import ListCategory from "./Components/ListCategory";
import PopularCreator from "./Components/PopularCreator";
import "./List.scss";

const menuTabObj = {
  0: <PopularCreator />,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      listName: "",
      bannerBgSrc: [],
      categoryToggle: false,
      category: [],
      listBannerTags: [],
      menuTabActiveId: 0,
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

  render() {
    const {
      listBannerTags,
      listName,
      category,
      categoryToggle,
      bannerBgSrc,
    } = this.state;

    const tagList = listBannerTags.map(({ id, name }) => (
      <ListTag key={id} name={name} />
    ));

    const categoryList = category.map(({ id, name, src }) => (
      <ListCategory key={id} name={name} src={src} />
    ));

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
          {menuTabObj[this.state.menuTabActiveId]}
        </main>
      </div>
    );
  }
}

export default List;
