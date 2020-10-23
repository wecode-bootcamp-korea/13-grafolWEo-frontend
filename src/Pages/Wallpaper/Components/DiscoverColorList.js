import React, { Component } from "react";
import DiscoverCardViewItem from "./DiscoverCardViewItem";
import { API } from "../../../config";

class DiscoverColorList extends Component {
  constructor() {
    super();
    this.state = {
      discoverColors: [],
      cardViewList: [],
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
    const { cardViewList } = this.state;
    console.log(this.state.cardViewList);
    return (
      <>
        <div className="container">
          <ul className="colorItems clearFix">
            <li>빨강색</li>
            <li>노랑색</li>
            <li>주황색</li>
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
      </>
    );
  }
}

export default DiscoverColorList;
