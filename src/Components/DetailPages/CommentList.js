import React, {Component} from 'react';
import './CommentList.scss';

class CommentList extends Component {
  render() {
    const {profile, name, comment, date, heart} = this.props;
    return (
      <li className="commentList container">
        <div className="imgAndName">
          <span className="img">{profile}</span>
          <span className="name">{name}</span>
        </div>
        <div className="comment">
          <span className="firstComment">{comment}</span>
        </div>
        <span className="date">{date}</span>
        <div className="heart">{heart}</div>
      </li>
    );
  }
}
export default CommentList;
