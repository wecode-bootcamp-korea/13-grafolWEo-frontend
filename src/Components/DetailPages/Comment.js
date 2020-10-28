import React, {Component} from 'react';
import {CgProfile} from 'react-icons/cg';
import {BiHeart} from 'react-icons/bi';
import {BiLockOpen} from 'react-icons/bi';
import CommentList from './CommentList';
import './Comment.scss';

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      commentList: [
        {
          id: 1,
          profile_image_url: <CgProfile />,
          user_name: 'dolphin',
          content: '마~니 축하드립니다~',
          date: '2020-10-15 11:17',
          button: <BiHeart />,
        },
        {
          id: 2,
          profile_image_url: <CgProfile />,
          user_name: '산들',
          content: '작가님~ 응원합니당^^',
          date: '2020-10-2 6:14',
          button: <BiHeart />,
        },
        {
          id: 3,
          profile_image_url: <CgProfile />,
          user_name: '마요',
          content: '대박 너무너무 귀여워요 흑흑',
          date: '2020-10-4 2:42',
          button: <BiHeart />,
        },
      ],
      commentValue: '',
      artworkDetails: [],
    };
  }

  handleCommentValue = (e) => {
    this.setState({
      commentValue: e.target.value,
    });
  };

  addComment = (e) => {
    e.preventDefault();
    const {commentList, commentValue} = this.state;
    this.setState({
      commentList: [
        ...commentList,
        {
          id: commentList.length + 1,
          profileImg: <CgProfile />,
          userName: 'chloe kim',
          content: commentValue,
          button: <BiHeart />,
        },
      ],
      commentValue: '',
    });
  };

  render() {
    const {commentList, commentValue} = this.state;
    console.log(commentList, 'ssssss');
    return (
      <div className="Comment container">
        <form className="commentForm" onSubmit={this.addComment}>
          <span className="name">chloe Kim</span>
          <input
            onChange={this.handleCommentValue}
            type="text"
            placeholder="주제와 무관한 댓글,악플은 삭제될 수 있습니다."
            value={commentValue}
          />
          {/* <span className="textLength">0/1000</span> */}
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
            {commentList.map((comment) => {
              return (
                <CommentList
                  artworkDetails={comment}
                  key={comment.id}
                  profile={comment.profileImg}
                  name={comment.userName}
                  comment={comment.content}
                  date={comment.date}
                  heart={comment.button}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Comment;
