import React, { Component } from "react";
import { API, COLORS } from "../../../config";
import { IoMdArrowDropdown } from "react-icons/io";
import CardViewItem from "../../../Components/Wallpaper/CardViewItem";
import DiscoverCardViewOrder from "./DiscoverCardViewOrder";

const LIMIT = 9;

class DiscoverColorList extends Component {
  constructor() {
    super();
    this.state = {
      discoverSort: "색상별",
      discoverOrderCurrent: "인기순",
      discoverOrder: "인기순",
      cardViewList: [],
      discoverColors: COLORS,
      discoverColorActive: 1,
      orderActive: false,
      cardDataOrder: 0,
      timeSet: false,
    };
  }

  componentDidMount() {
    const { discoverSort, discoverOrder, discoverColorActive } = this.state;
    const { infiniteScroll } = this;

    fetch(
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&order=${discoverOrder}&id=${discoverColorActive}&limit=${LIMIT}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverColorData.cardViewList,
        });
      });

    window.addEventListener("scroll", infiniteScroll);
  }

  componentWillUnmount() {
    const { infiniteScroll } = this;
    window.removeEventListener("scroll", infiniteScroll);
  }

  handleClickOrder = (name) => {
    const { discoverSort, discoverTagActive } = this.state;

    fetch(
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&order=${name}&id=${discoverTagActive}&limit=${LIMIT}`
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
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&order=${discoverOrder}&limit=${LIMIT}&offset=${cardDataOrder}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: cardViewList.concat(res.discoverColorData.cardViewList),
          cardDataOrder: cardDataOrder + LIMIT,
          timeSet: false,
        });
      });
  };

  handleClickColorItem = (id) => {
    const { discoverSort, discoverOrderCurrent } = this.state;

    fetch(
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&order=${discoverOrderCurrent}&id=${id}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          discoverColorActive: id,
          cardViewList: res.discoverColorData.cardViewList,
          discoverOrder: "인기순",
        });
      });
  };

  handleClickOrder = (name) => {
    const { discoverSort, discoverColorActive } = this.state;

    fetch(
      `${API}/works/wallpaper/cardlist?sort=${discoverSort}&order=${name}&id=${discoverColorActive}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverColorData.cardViewList,
          discoverOrder: name,
        });
      });
  };

  render() {
    const {
      discoverColors,
      cardViewList,
      discoverColorActive,
      discoverOrder,
      orderActive,
    } = this.state;
    const { handleClickColorItem, handleClickOrder } = this;
    return (
      <div className="DiscoverColorList discoverCardListStyle">
        <div className="container">
          <ul className="colorItems clearFix">
            {discoverColors.map((tag) => (
              <li
                key={tag.id}
                className={discoverColorActive === tag.id ? "active" : ""}
              >
                <button
                  onClick={() => {
                    handleClickColorItem(tag.id);
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

export default DiscoverColorList;
