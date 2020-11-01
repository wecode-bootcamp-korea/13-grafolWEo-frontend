import React, { Component } from "react";
import { API } from "../../config";
import { GiCancel } from "react-icons/gi";
import { BiHeart } from "react-icons/bi";
import "./CommentList.scss";

class CommentList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // deleteComment = (id) => {
  //   console.log(id);
  //   fetch(`http://10.58.3.92:8000/works/13/comment`, {
  //     method: 'post',
  //     headers: {
  //       Authorization:
  //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNX0.iwV4cMiriHCEjaL2UrmnRoX3FTfIhAcgnaZnXqZ5hTM',
  //     },
  //     body: JSON.stringify({
  //       comment_content: 'id',
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       this.setState({
  //         btnColor: res.data.heartBtn,
  //       });
  //     });
  // };

  render() {
    return (
      <li className="commentList container">
        {this.props.comment &&
          this.props.comment.map((comment) => {
            return (
              <div className="commentWrap" key={comment.id}>
                <div className="imgAndName">
                  <img
                    classsName="profileImg"
                    src={comment.commenter_image}
                    alt="사진"
                  />

                  <span className="name">{comment.commenter_name}</span>
                </div>
                <div className="comment">
                  <span className="firstComment">
                    {comment.comment_content}
                  </span>
                </div>
                <span className="date">{comment.comment_created_at}</span>
                <button className="heart" onClick={() => this.deleteComment(1)}>
                  <BiHeart />
                </button>
              </div>
            );
          })}
      </li>
    );
  }
}
export default CommentList;
