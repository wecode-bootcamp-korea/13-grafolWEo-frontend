import React, { Component } from "react";
import { API } from "../../../config";
import DiscoverCardViewItem from "./DiscoverCardViewItem";

class DiscoverTagList extends Component {
  constructor() {
    super();
    this.state = {
      cardViewList: [],
      discoverTags: [],
      discoverTagActive: 1,
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

  handleClickTagItem = (id) => {
    console.log(id);
    // fetch(`http://10.58.7.192:8000/works/wallpaper/${id}`)
    fetch(`${API}/Data/Wallpaper/DISCOVERTAGS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          discoverTagActive: id,
        });
      });
  };

  render() {
    const { discoverTags, cardViewList, discoverTagActive } = this.state;
    const { handleClickTagItem } = this;
    return (
      <div className="DiscoverTagList">
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
