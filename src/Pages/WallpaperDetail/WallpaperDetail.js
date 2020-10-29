import React, { Component } from "react";
import { SH_URL } from "../../config";
import "./WallpaperDetail.scss";

export default class WallpaperDetail extends Component {
  constructor() {
    super();
    this.state = {
      wallpaperDetailData: [],
      wallpaperDate: "",
    };
  }

  componentDidMount() {
    fetch(`${SH_URL}/works/wallpaper/35`)
      .then((res) => res.json())
      .then((res) => {
        const date = res.wallpaperDetails.created_at;
        const year = date.substring(0, 4);
        const month = date.substring(5, 7);
        const day = date.substring(8, 10);
        const resultDate = year + "." + month + "." + day;

        this.setState({
          wallpaperDetailData: res.wallpaperDetails,
          wallpaperDate: resultDate,
        });
      });
  }

  dateconversion = () => {};

  render() {
    const {
      title,
      image_url,
      creator,
      views,
      download_count,
      tag,
    } = this.state.wallpaperDetailData;
    const { wallpaperDate } = this.state;
    return (
      <div className="WallpaperDetail">
        <main>
          <div className="container">
            <div
              className="wallpaperImg"
              style={{ backgroundImage: `url(${image_url})` }}
            ></div>
            <div className="creatorInfo">
              <h4>{title}</h4>
              <ul className="detailes">
                <li>
                  <span
                    className="profileImg"
                    style={{
                      backgroundImage: `url(https://g-grafolio.pstatic.net/20200303_11/1583211339754C3IGv_PNG/%B4%EB%C1%F6_3_%BB%E7%BA%BB_2.png)`,
                    }}
                  ></span>
                  <em className="creator">{creator}</em>
                </li>
                <li>
                  <em>{wallpaperDate}</em>
                </li>
                <li>
                  <span>조회</span>
                  <em>{views}</em>
                </li>
                <li>
                  <span>다운로드</span>
                  <em className="color">{download_count}</em>
                </li>
              </ul>
              <div className="btnWrap">
                <ul>
                  <li>
                    <span className="share">
                      <button>공유</button>
                    </span>
                  </li>
                  <li>
                    <span className="declaration">
                      <button>신고</button>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="tag">
                <ul className="clearFix">
                  {tag && tag.map((tag, idx) => <li key={idx}>{tag}</li>)}
                </ul>
              </div>
              <div className="copyRight">
                <p>
                  Copyright &copy; <em>{creator}</em> All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </main>
        <aside>
          <div className="container">
            <h4 className="similarTit">유사한 배경화면</h4>
          </div>
        </aside>
      </div>
    );
  }
}
