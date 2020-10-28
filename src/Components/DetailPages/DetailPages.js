import React from 'react';
import {withRouter} from 'react-router-dom';
import {API} from '../../config';
import {FaRegCommentDots} from 'react-icons/fa';
import {IoIosArrowDown} from 'react-icons/io';
import Comment from '../DetailPages/Comment';
import Button from '../DetailPages/Button';
// import Emoji from '../DetailPages/Emoji';
// // import LikeImoji from './LikeEmoji';
import PhotoSlide from './PhotoSlide';
import './DetailPages.scss';

class DetailPages extends React.Component {
  constructor() {
    super();
    this.state = {
      artworkDetails: [],
      showComponent: false,
      likeCount: 0,
      touchedCount: 0,
      wantedBuyCount: 0,
      // counter: 0,
      // clicked: false,
    };
  }

  // addLikes = () => {
  //   const {likeNum, touchedNum, wantToBuyNum} = this.state.artworkDetails;

  //   this.setState({
  //     addResult:
  //       Number({likeNum}) + Number({touchedNum}) + Number({wantToBuyNum}),
  //   });
  // };

  componentDidMount() {
    fetch(`${API}/Data/DetailPages/ARTWORKDETAILS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          artworkDetails: res.artworkDetails,
        });
      }); //"http://10.58.0.139:8000/works/13"
    // this.addLikes();
    //`${API}/Data/DetailPages/ARTWORKDETAILS.json`
  }

  // handleComment = () => {
  //   if (this.state.showComponent === true) {
  //     this.setState({
  //       showComponent: false,
  //     });
  //   } else if (this.state.showComponent === false) {
  //     this.setState({
  //       showComponent: true,
  //     });
  //   }
  // };

  // toggle
  handleCommentState = () => {
    this.setState({
      showComponent: !this.state.showComponent,
    });
    // console.log(this.state.showComponent);
  };

  toggleClicked = () => {
    // const counter = this.state.clicked ? counter + 1 : counter - 1;
    // const clicked = !this.state.clicked;

    // this.setState({counter, clicked});
    // console.log(e.target, 'count');
    // this.setState({likeCount: Number(this.state.artworkDetails.likeNum) + 1});
    this.setState({
      likeCount: this.state.likeCount + 1,
      touchedCount: this.state.touchedCount + 1,
      wantedBuyCount: this.state.wantedBuyCount + 1,
    });
  };
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
      commentNum,
      uploadDate,
      likeNum,
      touchNum,
      wantToBuyNum,
      tag,
      comment,
    } = this.state.artworkDetails;
    const {likeCount, touchedCount, wantedBuyCount} = this.state;
    // console.log(this.state.showComponent);
    // const numbers = Number({likeNum} + {touchedNum} + {wantToBuyNum});
    const numbers = `${+likeNum + +touchNum + +wantToBuyNum}`;

    return (
      <div className="DetailPages">
        <span className="leftArrow"></span>
        <span className="rightArrow"></span>
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
                <li>
                  <button onClick={() => this.toggleClicked()}>
                    <img src="Images/hearteyes.png" alt="icon" />
                  </button>
                  <span className="text">좋아요</span>
                  <span className="number">{Number(likeNum) + likeCount}</span>
                </li>
                <li>
                  <button onClick={() => this.toggleClicked()}>
                    <img src="Images/starred.png" alt="icon" />
                  </button>
                  <span className="text">감동받았어요</span>
                  <span className="number">
                    {Number(touchNum) + touchedCount}
                  </span>
                </li>
                <li>
                  <button onClick={() => this.toggleClicked()}>
                    <img src="Images/sunglasses.png" alt="icon" />
                  </button>

                  <span className="text">사고 싶어요</span>
                  <span className="number">
                    {Number(wantToBuyNum) + wantedBuyCount}
                  </span>
                </li>
              </ul>
            </div>
            <div className="commentParts">
              <div className="commentImg">
                <img src="Images/starred.png" alt="icon" />
                <span>{numbers}</span>
              </div>
              <div className="comment">
                <FaRegCommentDots className="commentDot" />
                <span>{commentNum}</span>
                <button onClick={this.handleCommentState}>
                  <IoIosArrowDown className="downArrow" />{' '}
                </button>
              </div>
              <img className="share" src="Images/share.png" alt="icon" />
            </div>
          </main>
        </div>
        {this.state.showComponent && <Comment artworkDetails={comment} />}

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
            <Button />
            {/* <button className="followIcon">
              <FaRegUser />
              <span>팔로우</span>
            </button> */}
          </header>
          <div className="otherArtworks">
            <span className="others">이 크리에이터의 다른작품</span>
            <span className="numbers">10</span>
          </div>
          <div className="artworkPhotos">
            {others && <PhotoSlide artworkDetails={others} />}
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
