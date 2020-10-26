import React, { Component } from "react";
import { API } from "../../../config";
import DiscoverCardViewItem from "./DiscoverCardViewItem";

class DiscoverColorList extends Component {
  constructor() {
    super();
    this.state = {
      cardViewList: [],
      discoverColors: [],
    };
  }

  componentDidMount() {
    fetch(`${API}/Data/Wallpaper/DISCOVERCOLORS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverColorData.cardViewList,
          discoverColors: res.discoverColorData.colorList,
        });
      });
  }

  render() {
    const { discoverColors, cardViewList } = this.state;
    console.log(this.state.discoverColors);
    return (
      <div className="DiscoverColorList discoverCardListStyle">
        <div className="container">
          <ul className="colorItems clearFix">
            {discoverColors.map((tag) => (
              <li key={tag.id} style={{ backgroundColor: tag.hexCode }}>
                <button>{tag.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="wallpaperCardView">
          <div className="container">
            <ul className="clearFix">
              {cardViewList.map((tag) => (
                <DiscoverCardViewItem
                  key={tag.id}
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
