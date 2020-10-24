import React, { Component } from "react";
import { API } from "../../../config";
import { FaRegSmile, FaRegUser } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import { Link } from "react-router-dom";

class PopularCreator extends Component {
  constructor() {
    super();
    this.state = {
      popularCreator: [],
    };
  }

  componentDidMount() {
    fetch(`http://10.58.7.192:8000/works/category/list/popular_creator`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          popularCreator: res.popularCreator,
        });
      });
  }

  render() {
    const { popularCreator } = this.state;

    return (
      <section className="PopularCreator">
        <div className="container">
          <ul className="clearFix list">
            {popularCreator.map((tag) => (
              <li key={tag.id}>
                <div className="inner">
                  <div className="profileInfo">
                    <Link
                      to="/"
                      className="artistProfileImg"
                      style={{ backgroundImage: `url(${tag.profileImgSrc})` }}
                    ></Link>
                    <h5>{tag.name}</h5>
                    <p>{tag.desc}</p>
                    <ul className="actions">
                      <li className="follow">
                        <span className="icon">
                          <FaRegUser />
                        </span>
                        <em>{tag.follower}</em>
                      </li>
                      <li className="like">
                        <span className="icon">
                          <FaRegSmile />
                        </span>
                        <em>{tag.like}</em>
                      </li>
                      <li className="illust">
                        <span className="icon">
                          <IoMdPaper />
                        </span>
                        <em>{tag.illust}</em>
                      </li>
                    </ul>
                  </div>
                  <ul className="clearFix imgThumWrap">
                    {tag.imgPreviewSrc.map((tag, idx) => {
                      return (
                        <li key={idx}>
                          <Link
                            to="/"
                            style={{ backgroundImage: `url(${tag})` }}
                          >
                            <img src={tag} alt="대표 이미지" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default PopularCreator;
