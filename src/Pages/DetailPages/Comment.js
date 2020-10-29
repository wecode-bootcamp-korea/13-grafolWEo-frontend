import React, {Component} from 'react';
import {BiLockOpen} from 'react-icons/bi';
import CommentList from './CommentList';
import './Comment.scss';

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      commentList: [],

      commentValue: '',
      artworkDetails: [],
    };
  }

  handleCommentValue = (e) => {
    this.setState({
      commentValue: e.target.value,
    });
  };

  componentDidMount = () => {
    this.setState({commentList: this.props.comment});
  };

  addComment = (e) => {
    const {commentValue} = this.state;

    e.preventDefault();
    console.log('addComment');

    fetch('http://10.58.3.92:8000/works/13/comments', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNX0.iwV4cMiriHCEjaL2UrmnRoX3FTfIhAcgnaZnXqZ5hTM',
      },
      body: JSON.stringify({
        comment_content: commentValue,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          artworkDetails: res.artworkDetails.comment,
        });
      });
  };

  render() {
    //console.log('props: ', this.props.userName);

    const {commentList, commentValue} = this.state;
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
