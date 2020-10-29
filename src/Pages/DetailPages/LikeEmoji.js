import React, {Component} from 'react';
import './LikeEmoji.scss';

class LikeEmoji extends Component {
  constructor() {
    super();
    this.state = {
      emoji: [
        {
          id: 1,
          src: 'Images/hearteyes.png',
          alt: 'icon',
          text: '좋아요',
          num: 60,
        },
        {
          id: 2,
          src: 'Images/starred.png',
          alt: 'icon',
          text: '감동받았어요',
          num: 13,
        },
        {
          id: 3,
          src: 'Images/sunglasses.png',
          alt: 'icon',
          text: '사고 싶어요',
          num: 6,
        },
      ],
    };
  }

  render() {
    return (
      <>
        {this.state.emoji.map((emoji) => {
          return (
            <li>
              <img src={emoji.src} alt={emoji.alt} />
              <span className="text">{emoji.text}</span>
              <span className="number">{emoji.num}</span>
            </li>
          );
        })}
      </>
    );
  }
}
export default LikeEmoji;
