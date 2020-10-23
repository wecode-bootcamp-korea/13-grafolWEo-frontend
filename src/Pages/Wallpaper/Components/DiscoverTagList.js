import React, { Component } from "react";
import { API } from "../../../config";
import DiscoverTag from "./DiscoverTag";
import DiscoverCardViewItem from "./DiscoverCardViewItem";

class DiscoverTagList extends Component {
  constructor() {
    super();
    this.state = {
      discoverTags: [],
      cardViewList: [],
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
      <>
        <div className="container">
          <ul className="tagItems clearFix">
            <li className="active">
              <button>전체</button>
            </li>
            {discoverTags.map((tag, index) => (
              <DiscoverTag key={index} name={tag.name} />
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
      </>
    );
  }
}

export default DiscoverTagList;
