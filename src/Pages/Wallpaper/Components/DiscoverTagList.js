import React, { Component } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { ST_URL } from "../../../config";
import CardViewItem from "../../../Components/Wallpaper/CardViewItem";
import DiscoverCardViewOrder from "./DiscoverCardViewOrder";

const LIMIT = 9;

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
      cardDataOrder: 0,
      timeSet: false,
    };
  }

  componentDidMount() {
    const { discoverSort, discoverOrder } = this.state;
    const { infiniteScroll } = this;

    fetch(
      `${ST_URL}/works/wallpaper/cardlist?sort=${discoverSort}&order=${discoverOrder}&limit=${LIMIT}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverTagData.cardViewList,
          discoverTags: res.discoverTagData.tagList,
          discoverTagActive: res.discoverTagData.tagList[0].id,
        });
      });

    window.addEventListener("scroll", infiniteScroll);
  }

  componentWillUnmount() {
    const { infiniteScroll } = this;
    window.removeEventListener("scroll", infiniteScroll);
  }

  handleClickTagItem = (id) => {
    const { discoverSort, discoverOrderCurrent } = this.state;

    fetch(
      `${ST_URL}/works/wallpaper/cardlist?sort=${discoverSort}&id=${id}&order=${discoverOrderCurrent}`
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
      `${ST_URL}/works/wallpaper/cardlist?sort=${discoverSort}&order=${name}&id=${discoverTagActive}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverTagData.cardViewList,
          discoverOrder: name,
        });
      });
  };

  infiniteScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight * 0.95 &&
      !this.state.timeSet
    ) {
      this.setState({ timeSet: true });
      this.getCardData();
    }
  };

  getCardData = () => {
    const {
      cardViewList,
      discoverOrder,
      discoverSort,
      cardDataOrder,
    } = this.state;

    fetch(
      `${ST_URL}/works/wallpaper/cardlist?sort=${discoverSort}&order=${discoverOrder}&limit=${LIMIT}&offset=${cardDataOrder}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: cardViewList.concat(res.discoverTagData.cardViewList),
          cardDataOrder: cardDataOrder + LIMIT,
          timeSet: false,
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
                <CardViewItem
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
