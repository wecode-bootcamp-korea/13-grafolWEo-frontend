import React from "react";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import { FaRegCommentDots,FaRegUser } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailPages.scss";

class DetailPages extends React.Component {
  constructor() {
    super();
    this.state = {
      artworkDetails : []
    };
  }

  componentDidMount(){
    fetch("http://localhost:3000/Data/DetailPages/ARTWORKDETAILS.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          artworkDetails: res.artworkDetails,
        });
      });
  }

  render() {
    const{title,
      name,
      date,
      viewNumber,
      englishName,
      follower,
      followerNumber,
      following,
      followingNumber,
      writerPhoto,
      likeNum,
      touchedNum,
      wantToBuyNum,
      likeBtnNum,
      commentNum,
      uploadDate,
      firstTag,
      secondTag,
      thirdTag,
      fourthTag,
      fifthTag,
      firstPhoto,
      secondPhoto,
      thirdPhoto,
      fourthPhoto,
      fifthPhoto,
    }=this.state.artworkDetails;
    
    const settings ={
      //dots:true,
      vertical:false,
      infinite:true,
      speed:500,
      slidesToShow:5,
      slidesToScroll:2,
    };

    return (
      <body className="totalContainer">
        {/* <Navbar /> */}
        <div className="firstContainer">
          <div className="titleBox">
             <div className="title">
                 <span>{title}</span>
                 <img src="Images/ellipsis.png" alt="dot" />
             </div>
             <div className="titleWriter">
                 <span className="titleby">by</span>
                 <span className="writerName">{name}</span>
                 <div className="date">{date}</div>
                 <span className="view">조회 {viewNumber}</span>
            </div>
          </div>
          <main>
            <img className="artwork" src="Images/sea.jpeg" alt="sea" />
            <div className="artworkDescribe">
              <img src="Images/grafolweo.ico" alt="icon" />
              <span className="artworkSelect">그라폴리오 '주목받는'에 선정된 작품입니다.</span>
              <span className="date">{uploadDate}</span>
            </div>
            <div className="tag">
              <span>{firstTag}</span>
              <span>{secondTag}</span>
              <span>{thirdTag}</span>
              <span>{fourthTag}</span>
              <span>{fifthTag}</span>
            </div>
            <span className="copyRight">Copyright © {name} All Rights Reserved.</span>   
            <div className="likeBtn">
              <ul>
                <li>
                  <img src="Images/hearteyes.png" alt="icon"/>
                  <span className="text">좋아요</span>
                  <span className="number">{likeNum}</span>
                </li>
                <li>
                <img src="Images/starred.png" alt="icon"/>
                  <span className="text">감동받았어요</span>
                  <span className="number">{touchedNum}</span>
                </li>
                <li>
                <img src="Images/sunglasses.png" alt="icon"/>
                  <span className="text">사고 싶어요</span>
                  <span className="number">{wantToBuyNum}</span>
                </li>
              </ul>
            </div>
            <div className="commentParts">
              <div className="commentImg">
               <img src="Images/starred.png" alt="icon"/>
               <span>{likeBtnNum}</span>
              </div>
              <div className="comment">
               <FaRegCommentDots className="commentDot" />
               <span>{commentNum}</span>
              </div>
              <img className="share" src="Images/share.png" alt="icon"/>
            </div>
          </main>
        </div>
        <div className="emptyBar"></div>
        <div className="secondContainer">
          <header>
            <img src={writerPhoto} alt="icon"/>
            <div className="writerAndFollower">
              <div className="writer">{name}·{englishName} </div>
              <div className="followers">
                <div className="follow">
                <span className="followerText">{follower}</span>
                <span className="followerNumber">{followerNumber}</span>
                </div>
                <div className="follow">
                <span className="followerText">{following}</span>
                <span className="followerNumber">{followingNumber}</span>
                </div>
              </div>
            </div>
           <div className="followIcon">
           < FaRegUser/>
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
                <img src={firstPhoto} alt="artwork"/>
                <span>아름다운 콩이</span>
              </div>
              <div className="photoList">
                <img src={secondPhoto} alt="artwork"/>
                <span>즐거운 콩이학교</span>
              </div>
              <div className="photoList"> 
              <img src={thirdPhoto} alt="artwork"/>
                <span>말랑말랑 콩쓰타운</span>
              </div>
              <div className="photoList">
              <img src={fourthPhoto} alt="artwork"/>
                <span>커피커피콩이</span>
              </div>
              <div className="photoList">
              <img src={fifthPhoto} alt="artwork"/>
                <span>안녕콩콩이</span>
              </div>
              <div className="photoList">
                <img src={firstPhoto} alt="artwork"/>
                <span>아름다운 콩이</span>
              </div>
              <div className="photoList">
                <img src={secondPhoto} alt="artwork"/>
                <span>즐거운 콩이학교</span>
              </div>
              <div className="photoList"> 
              <img src={thirdPhoto} alt="artwork"/>
                <span>말랑말랑 콩쓰타운</span>
              </div>
              <div className="photoList">
              <img src={fourthPhoto} alt="artwork"/>
                <span>커피커피콩이</span>
              </div>
              <div className="photoList">
              <img src={fifthPhoto} alt="artwork"/>
                <span>안녕콩콩이</span>
              </div>
            </Slider> 
            </div>
          </div>
      
        <main className="final">
          <div className="finalContainer" >
            <span>이런 작품은 어때요</span>
            </div>
          </main>
      </body>
    );
  }
}

export default withRouter(DetailPages);
