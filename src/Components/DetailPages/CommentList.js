import React, {Component} from 'react';
import {API} from '../../config';
import './CommentList.scss';

class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      artWorkComment: [],
    };
  }
  componentDidMount() {
    fetch(`${API}/Data/DetailPages/ARTWORKDETAILS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          artWorkComment: res.artworkDetails.comment,
        });
      });
  }
  render() {
    // const {profile, name, comment, date, heart} = this.props;
    const {heart} = this.props;
    const {artWorkComment} = this.state;
    console.log(artWorkComment);

    //http://10.58.0.139:8000/works/13"
    // this.addLikes();
    //`${API}/Data/DetailPages/ARTWORKDETAILS.json`

    return (
      <li className="commentList container">
        {artWorkComment.map((comment) => {
          return (
            <div className="commentWrap">
              <div className="imgAndName" key={comment.id}>
                <img
                  className="img"
                  src={comment.profile_image_url}
                  alt="사진"
                />
                <span className="name">{comment.user_name}</span>
              </div>
              <div className="comment">
                <span className="firstComment">{comment.comment_content}</span>
              </div>
              <span className="date">{comment.created_at}</span>
              <div className="heart">{heart}</div>
            </div>
          );
        })}
      </li>
    );
  }
}
export default CommentList;

{
  /* <div className="imgAndName">
<span className="img">{profile}</span>
<span className="name">{name}</span>
</div>
<div className="comment">
<span className="firstComment">{comment}</span>
</div>
<span className="date">{date}</span>
<div className="heart">{heart}</div> */
}
