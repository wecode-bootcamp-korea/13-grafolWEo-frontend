import React, {Component} from 'react';
import './Emoji.scss';

export class Emoji extends Component {
  constructor() {
    super();

    this.state = {
      artWorkEmoji: [],
    };
  }
  componentDidMount() {
    fetch('http://10.58.0.139:8000/works/13')
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          artWorkEmoji: res.artworkDetails.emojis,
        });
      });
  }

  render() {
    const {artWorkEmoji} = this.props;
    return (
      <>
        <li>
          <button>
            <img src="Images/hearteyes.png" alt="icon" />
          </button>
          <span className="text">좋아요</span>
          <span className="number">{artWorkEmoji.likeNum}</span>
        </li>
        <li>
          <button>
            <img src="Images/starred.png" alt="icon" />
          </button>
          <span className="text">감동받았어요</span>
          <span className="number">{artWorkEmoji.touchedNum}</span>
        </li>
        <li>
          <button>
            <img src="Images/sunglasses.png" alt="icon" />
          </button>
          <span className="text">사고 싶어요</span>
          <span className="number">{artWorkEmoji.wantToBuyNum}</span>
        </li>
      </>
    );
  }
}

export default Emoji;
