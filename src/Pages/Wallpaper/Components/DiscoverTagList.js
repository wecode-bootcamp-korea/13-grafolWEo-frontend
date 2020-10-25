import React, { Component } from "react";
import { API } from "../../../config";
import DiscoverCardViewItem from "./DiscoverCardViewItem";

class DiscoverTagList extends Component {
  constructor() {
    super();
    this.state = {
      cardViewList: [],
      discoverTags: [],
    };
  }

  componentDidMount() {
    fetch(`${API}/Data/Wallpaper/DISCOVERTAGS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cardViewList: res.discoverTagData.cardViewList,
          discoverTags: res.discoverTagData.tagList,
        });
      });
  }

  render() {
    const { discoverTags, cardViewList } = this.state;
    return (
      <div className="DiscoverTagList">
        <div className="container">
          <ul className="tagItems clearFix">
            {discoverTags.map((tag) => (
              <li>
                <button>{tag.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="wallpaperCardView">
          <div className="container">
            <div className="ranking"></div>
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

export default DiscoverTagList;
