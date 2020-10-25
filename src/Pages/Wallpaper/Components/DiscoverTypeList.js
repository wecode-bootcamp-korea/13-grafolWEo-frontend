import React, { Component } from "react";
import { API } from "../../../config";
import DiscoverCardViewItem from "./DiscoverCardViewItem";

class DiscoverTypeList extends Component {
  constructor() {
    super();
    this.state = {
      cardViewList: [],
      discoverTypes: [],
    };
  }

  componentDidMount() {
    fetch(`${API}/Data/Wallpaper/DISCOVERTYPE.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverTypeData.cardViewList,
          discoverTypes: res.discoverTypeData.typeList,
        });
      });
  }

  render() {
    const { discoverTypes, cardViewList } = this.state;
    console.log(this.state.discoverColors);
    return (
      <div className="DiscoverTagList">
        <div className="container">
          <ul className="tagItems clearFix">
            {discoverTypes.map((tag) => (
              <li key={tag.id}>
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

export default DiscoverTypeList;
