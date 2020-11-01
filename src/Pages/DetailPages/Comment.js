import React, { Component } from "react";
import { ST_URL } from "../../config";
import { BiLockOpen } from "react-icons/bi";
import CommentList from "./CommentList";
import "./Comment.scss";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      commentList: [],

      commentValue: "",
      artworkDetails: [],
    };
  }

  handleCommentValue = (e) => {
    this.setState({
      commentValue: e.target.value,
    });
  };

  componentDidMount = () => {
    this.setState({ commentList: this.props.comment });
  };

  addComment = (e) => {
    const { commentValue } = this.state;
    const { workId } = this.props;

    e.preventDefault();

    const token = localStorage.getItem("Authorization");

    if (!token) {
      alert("로그인을 해주세요.");
    } else {
      fetch(`${ST_URL}/works/${workId}/comments`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          comment_content: commentValue,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // this.setState({
          //   artworkDetails: res.artworkDetails.comment,
          // });
        });
    }
  };

  render() {
    //console.log('props: ', this.props.userName);

    const { commentList, commentValue } = this.state;
    // console.log(commentList, 'ssssss');
    // console.log('전달', commentList);
    return (
      <div className="Comment container">
        <form className="commentForm" onSubmit={this.addComment}>
          <span className="name">{this.props.userName}</span>
          <input
            onChange={this.handleCommentValue}
            type="text"
            placeholder="주제와 무관한 댓글,악플은 삭제될 수 있습니다."
            value={commentValue}
          />

          <div className="upload">
            <div className="secretComment">
              <BiLockOpen />
              <span>비밀댓글</span>
            </div>
            <button className="uploadBtn" onClick={this.addComment}>
              등록
            </button>
          </div>
        </form>
        <div className="feedComment">
          <ul>
            <CommentList comment={commentList} userName={this.props.userName} />
          </ul>
        </div>
      </div>
    );
  }
}

export default Comment;
