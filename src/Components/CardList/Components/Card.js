import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaRegSmile } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import "./Card.scss";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      height: 0,
    };
    this.cardElement = React.createRef();
  }

  setHeight = () => {
    const height = this.cardElement.current.clientHeight;
    const devidedHeights = Math.ceil(Math.min(Math.max(height / 15), 23));
    this.setState({ height: devidedHeights });
  };

  componentDidMount() {
    this.cardElement.current.addEventListener("load", this.setHeight);
  }

  render() {
    const {
      Img,
      PostName,
      AuthorProfile,
      AuthorName,
      Likes,
      Comments,
      Views,
      id,
    } = this.props;

    return (
      <div className="Card" style={{ gridRowEnd: `span ${this.state.height}` }}>
        <div className="cardListArtArea">
          <Link
            className="cardListImg"
            to={`/DetailPages/${id}`}
            title="작품 페이지로 이동"
          >
            <img ref={this.cardElement} src={Img} alt={PostName} />
          </Link>
        </div>
        <div className="cardListInfoArea">
          <div className="cardListInfoBox">
            <Link
              className="cardListArtName"
              to="/Detail"
              title="작품 페이지로 이동"
            >
              {PostName}
            </Link>
            <Link className="cardListAuthor">
              <span>
                <img
                  className="cardListAuthorProfile"
                  src={AuthorProfile}
                  alt="작가 프로필 이미지"
                  title="프로필 페이지로 이동"
                />
              </span>
              <span className="cardListAuthorName">{AuthorName}</span>
            </Link>
          </div>
        </div>
        <div className="cardListBtnArea">
          <div className="flaotLeft">
            <div className="cardListIconContainer">
              <FaRegSmile className="cardListIcons" />
              <span className="btnAreaInfo">{Likes}</span>
            </div>
            <div className="cardListIconContainer">
              <FaRegCommentDots className="cardListIcons" />
              <span className="btnAreaInfo">{Comments}</span>
            </div>
          </div>
          <div className="flaotRight">
            <div className="cardListIconContainer">
              <AiOutlineEye className="cardListIcons" />
              <span className="btnAreaInfo">{Views}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
