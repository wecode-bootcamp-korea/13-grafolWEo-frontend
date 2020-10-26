import React from 'react';
import {withRouter} from 'react-router-dom';
import Slider from 'react-slick';
import {API} from '../../config';
import {FaRegCommentDots, FaRegUser} from 'react-icons/fa';
import {IoIosArrowDown} from 'react-icons/io';
import Comment from '../DetailPages/Comment';
import LikeImoji from './LikeEmoji';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DetailPages.scss';

class DetailPages extends React.Component {
  constructor() {
    super();
    this.state = {
      artworkDetails: [],
    };
  }

  componentDidMount() {
    fetch(`${API}/Data/DetailPages/ARTWORKDETAILS.json`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          artworkDetails: res.artworkDetails,
        });
      }); //http://10.58.0.139:8000/works/13"
  }

  render() {
    const {
      title,
      creator,
      created_at,
      views,
      followerNumber,
      followingNumber,
      image_url,
      others,
      likeBtnNum,
      commentNum,
      uploadDate,
      tag,
    } = this.state.artworkDetails;

    const settings = {
      vertical: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };

    return (
      <div className="DetailPages">
        <div className="firstContainer container">
          <div className="titleBox">
            <div className="title">
              <span>{title}</span>
              <img src="Images/ellipsis.png" alt="dot" />
            </div>
            <div className="titleWriter">
              <span className="titleby">by</span>
              <span className="writerName">{creator}</span>
              <span className="date">{created_at}</span>
              <span className="view">조회 {views}</span>
            </div>
          </div>
          <main>
            <img
              className="artwork"
              src={image_url && image_url[0]}
              alt="london"
            />
            <div className="artworkDescribe">
              <img src="Images/grafolweo.ico" alt="icon" />
              <span className="artworkSelect">
                그라폴리오 '주목받는'에 선정된 작품입니다.
              </span>
              <span className="date">{uploadDate}</span>
            </div>
            <div className="tag">
              {tag &&
                tag.map((tag, idx) => {
                  return <span key={idx}>{tag}</span>;
                })}
            </div>
            <span className="copyRight">
              Copyright © {creator} All Rights Reserved.
            </span>
            <div className="likeBtn">
              <ul>
                <LikeImoji />
              </ul>
            </div>
            <div className="commentParts">
              <div className="commentImg">
                <img src="Images/starred.png" alt="icon" />
                <span>{likeBtnNum}</span>
              </div>
              <div className="comment">
                <FaRegCommentDots className="commentDot" />
                <span>{commentNum}</span>
                <IoIosArrowDown className="downArrow" />
              </div>
              <img className="share" src="Images/share.png" alt="icon" />
            </div>
          </main>
        </div>
        <div>
          <Comment />
        </div>
        <div className="emptyBar" />
        <div className="secondContainer">
          <header>
            <img src={image_url && image_url[1]} alt="icon" />
            <div className="writerAndFollower">
              <div className="writer">{creator} </div>
              <div className="followers">
                <div className="follow">
                  <span className="followerText">팔로워</span>
                  <span className="followerNumber">{followerNumber}</span>
                </div>
                <div className="follow">
                  <span className="followerText">팔로잉</span>
                  <span className="followerNumber">{followingNumber}</span>
                </div>
              </div>
            </div>
            <div className="followIcon">
              <FaRegUser />
              <span>팔로우</span>
            </div>
          </header>
          <div className="otherArtworks">
            <span className="others">이 크리에이터의 다른작품</span>
            <span className="numbers">10</span>
          </div>
          <div className="artworkPhotos">
            <Slider {...settings} className="artworkList">
              <div className="photoList">
                <img src={others && others[0]} alt="artwork" />
                <span>아름다운 콩이</span>
              </div>
              <div className="photoList">
                <img src={others && others[1]} alt="artwork" />
                <span>즐거운 콩이학교</span>
              </div>
              <div className="photoList">
                <img src={others && others[2]} alt="artwork" />
                <span>말랑말랑 콩쓰타운</span>
              </div>
              <div className="photoList">
                <img src={others && others[3]} alt="artwork" />
                <span>커피커피콩이</span>
              </div>
              <div className="photoList">
                <img src={others && others[4]} alt="artwork" />
                <span>안녕콩콩이</span>
              </div>
              <div className="photoList">
                <img src={others && others[0]} alt="artwork" />
                <span>아름다운 콩이</span>
              </div>
              <div className="photoList">
                <img src={others && others[1]} alt="artwork" />
                <span>즐거운 콩이학교</span>
              </div>
              <div className="photoList">
                <img src={others && others[2]} alt="artwork" />
                <span>말랑말랑 콩쓰타운</span>
              </div>
              <div className="photoList">
                <img src={others && others[3]} alt="artwork" />
                <span>커피커피콩이</span>
              </div>
              <div className="photoList">
                <img src={others && others[4]} alt="artwork" />
                <span>안녕콩콩이</span>
              </div>
            </Slider>
          </div>
        </div>
        <main className="final">
          <div className="finalContainer">
            <span>이런 작품은 어때요</span>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(DetailPages);
