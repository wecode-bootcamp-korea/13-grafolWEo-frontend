import React from "react";
import { withRouter } from "react-router-dom";
import { ST_URL } from "../../config";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { CARDDATA } from "../../../src/config";
import Comment from "./Comment";
import Button from "./Button";
import PhotoSlide from "./PhotoSlide";
import CardWrap from "../../Components/CardList/CardWrap";
import "./DetailPages.scss";

const LIMIT = 12;

class DetailPages extends React.Component {
  constructor() {
    super();
    this.state = {
      artworkDetails: [],
      showComponent: false,
      userName: "user",
      CardListsArr: [],
      timeSet: false,
      CardDataOrder: 0,
      workId: 0,
      imageUrl: [],
    };
  }

  artWorkDetails = () => {
    const adr = this.props.location.pathname.split("/");
    const token = localStorage.getItem("Authorization");

    if (!token) {
      fetch(`${ST_URL}/works/${adr[2]}`)
        .then((res) => res.json())
        .then((res) => {
          console.log("dd:", res.artworkDetails);
          this.setState({
            artworkDetails: res.artworkDetails,
            workId: res.artworkDetails.id,
            imageUrl: res.artworkDetails.image_url,
          });
        });
    } else {
      fetch(`${ST_URL}/works/${adr[2]}`, {
        method: "get",
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("data:", res.artworkDetails);
          this.setState({
            artworkDetails: res.artworkDetails,
            userName: res.artworkDetails.user_name,
            workId: res.artworkDetails.id,
            imageUrl: res.artworkDetails.image_url,
          });
        });
    }
  };

  getLikeit = (id) => {
    const token = localStorage.getItem("Authorization");
    const { workId } = this.state;

    if (!token) {
      alert("로그인을 해주세요.");
    } else {
      fetch(`${ST_URL}/works/${workId}/likeit`, {
        method: "post",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          like_it_kind_id: id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
  };

  changeMainPage = (name) => {
    this.setState(
      {
        mainPageView: name,
        CardListsArr: [],
        CardDataOrder: 0,
        buttonStyle: name,
      },
      () => {
        this.getCardData();
      }
    );
  };

  infiniteScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight * 0.95 &&
      !this.state.timeSet
    ) {
      this.setState({ timeSet: true });
      this.getCardData();
    }
  };

  getCardData = () => {
    const { mainPageView, CardListsArr, CardDataOrder } = this.state;
    fetch(
      `${CARDDATA}list?sort=주목받는&limit=${LIMIT}&offset=${CardDataOrder}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          CardListsArr: [...CardListsArr, ...res.data],
          CardDataOrder: CardDataOrder + LIMIT,
          timeSet: false,
        });
      });
  };

  componentDidMount() {
    this.artWorkDetails();
    this.getCardData();
    window.addEventListener("scroll", this.infiniteScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.artWorkDetails();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.infiniteScroll);
  }

  // toggle
  handleCommentState = () => {
    this.setState({
      showComponent: !this.state.showComponent,
    });
  };

  render() {
    const {
      title,
      creator,
      created_at,
      views,
      followerNum,
      followingNum,
      image_url,
      others,
      commentNum,
      uploadDate,
      tag,
      comment,
      likeIt,
      likeBtnNum,
      creator_img,
      worksCount,
    } = this.state.artworkDetails;

    const { userName, workId, imageUrl } = this.state;

    return (
      <div className="DetailPages">
        <img className="leftArrow" src="/Images/left.png" alt="left_arrow" />
        <img className="rightArrow" src="/Images/right.png" alt="right_arrow" />
        <div className="firstContainer container">
          <div className="titleBox">
            <div className="title">
              <span>{title}</span>
              <img src="/Images/ellipsis.png" alt="dot" />
            </div>
            <div className="titleWriter">
              <span className="titleby">by</span>
              <span className="writerName">{creator}</span>
              <span className="date">{created_at}</span>
              <span className="view">조회 {views}</span>
            </div>
          </div>
          <main>
            {/* <img
              className="artwork"
              src={image_url && image_url[0]}
              alt="london"
            /> */}
            {imageUrl &&
              imageUrl.map((tag, idx) => (
                <img key={idx} className="artwork" src={tag} alt="london" />
                // <span
                //   key={idx}
                //   className="artwork"
                //   src={tag}
                //   alt="london"
                //   style={{ backgroundImage: `url(${tag})` }}
                // />
              ))}
            <div className="artworkDescribe">
              <img src="/Images/grafolweo.ico" alt="icon" />
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
                  <button onClick={() => this.getLikeit(1)}>
                    <img src="/Images/hearteyes.png" alt="icon" />
                  </button>
                  <span className="text">좋아요</span>
                  <span className="number">
                    {likeIt && likeIt[0].like_id_1}
                  </span>
                </li>
                {/* </li>{Number(likeNum) + likeCount},{Number(likeNum)} */}
                <li>
                  <button onClick={() => this.getLikeit(2)}>
                    <img src="/Images/starred.png" alt="icon" />
                  </button>
                  <span className="text">감동받았어요</span>
                  <span className="number">
                    {likeIt && likeIt[1].like_id_2}
                  </span>
                </li>
                <li>
                  <button onClick={() => this.getLikeit(3)}>
                    <img src="/Images/sunglasses.png" alt="icon" />
                  </button>

                  <span className="text">사고 싶어요</span>
                  <span className="number">
                    {likeIt && likeIt[2].like_id_3}
                  </span>
                </li>
              </ul>
            </div>
            <div className="commentParts">
              <div className="commentImg">
                <img src="/Images/starred.png" alt="icon" />
                <span>{likeBtnNum}</span>
              </div>
              <div className="comment">
                <FaRegCommentDots className="commentDot" />
                <span>{commentNum}</span>
                <button onClick={this.handleCommentState}>
                  <IoIosArrowDown className="downArrow" />{" "}
                </button>
              </div>
              <img className="share" src="/Images/share.png" alt="icon" />
            </div>
          </main>
        </div>
        {this.state.showComponent && (
          <Comment comment={comment} userName={userName} workId={workId} />
        )}

        <div className="emptyBar" />
        <div className="secondContainer">
          <header>
            <img src={creator_img && creator_img} alt="icon" />
            <div className="writerAndFollower">
              <div className="writer">{creator} </div>
              <div className="followers">
                <div className="follow">
                  <span className="followerText">팔로워</span>
                  <span className="followerNumber">{followerNum}</span>
                </div>
                <div className="follow">
                  <span className="followerText">팔로잉</span>
                  <span className="followerNumber">{followingNum}</span>
                </div>
              </div>
            </div>
            <Button />
          </header>
          <div className="otherArtworks">
            <span className="others">이 크리에이터의 다른작품</span>
            <span className="numbers">{worksCount}</span>
          </div>
          <div className="artworkPhotos">
            {others && <PhotoSlide artworkDetails={others} />}
          </div>
        </div>
        <main className="final">
          <div className="finalContainer container">
            <span className="photo">이런 작품은 어때요</span>
            <CardWrap CardListsArr={this.state.CardListsArr} />
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(DetailPages);
