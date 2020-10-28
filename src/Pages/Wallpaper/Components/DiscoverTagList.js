import React, { Component } from "react";
import { API } from "../../../config";
import { IoMdArrowDropdown } from "react-icons/io";
import DiscoverCardViewItem from "../../../Components/Wallpaper/DiscoverCardViewItem";
import DiscoverCardViewOrder from "./DiscoverCardViewOrder";

class DiscoverTagList extends Component {
  constructor() {
    super();
    this.state = {
      discoverSort: "태그별",
      discoverOrderCurrent: "인기순",
      discoverOrder: "인기순",
      cardViewList: [],
      discoverTags: [],
      discoverTagId: 0,
      discoverTagActive: 1,
      orderActive: false,
    };
  }

  componentDidMount() {
    const { discoverSort, discoverOrder } = this.state;

    fetch(
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&order=${discoverOrder}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverTagData.cardViewList,
          discoverTags: res.discoverTagData.tagList,
          discoverTagActive: res.discoverTagData.tagList[0].id,
        });
      });
  }

  handleClickTagItem = (id) => {
    const { discoverSort, discoverOrderCurrent } = this.state;

    fetch(
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&id=${id}&order=${discoverOrderCurrent}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          discoverTagActive: id,
          cardViewList: res.discoverTagData.cardViewList,
          discoverOrder: "인기순",
        });
      });
  };

  handleClickOrder = (name) => {
    const { discoverSort, discoverTagActive } = this.state;

    fetch(
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&order=${name}&id=${discoverTagActive}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverTagData.cardViewList,
          discoverOrder: name,
        });
      });
  };

  render() {
    const {
      discoverTags,
      cardViewList,
      discoverTagActive,
      discoverOrder,
      orderActive,
    } = this.state;

    const { handleClickTagItem, handleClickOrder } = this;

    return (
      <div className="DiscoverTagList discoverCardListStyle">
        <div className="container">
          <ul className="tagItems clearFix">
            {discoverTags.map((tag) => (
              <li
                key={tag.id}
                className={discoverTagActive === tag.id ? "active" : ""}
              >
                <button
                  onClick={() => {
                    handleClickTagItem(tag.id);
                  }}
                >
                  {tag.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="wallpaperCardView">
          <div className="container">
            <div className="selectRanking">
              <ul>
                <li>
                  <h5
                    onClick={() => {
                      this.setState({ orderActive: !orderActive });
                    }}
                    className={orderActive ? "active" : ""}
                  >
                    {discoverOrder}
                    <span>
                      <IoMdArrowDropdown />
                    </span>
                  </h5>
                  <DiscoverCardViewOrder handleClickOrder={handleClickOrder} />
                </li>
              </ul>
            </div>
            <ul className="CardViewList clearFix">
              {cardViewList.map((tag) => (
                <DiscoverCardViewItem
                  key={tag.wallpaper_id}
                  wallpaper_id={tag.wallpaper_id}
                  wallpaperSrc={tag.wallpaperSrc}
                  name={tag.name}
                  subject={tag.subject}
                  profileImgSrc={tag.profileImgSrc}
                  downloadNum={tag.downloadNum}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoverTagList;
