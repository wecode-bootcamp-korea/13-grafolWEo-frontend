import React, {Component} from 'react';
import Slider from 'react-slick';
import {API} from '../../config';
import './PhotoSlide.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class PhotoSlide extends Component {
  constructor() {
    super();
    this.state = {
      artWorkDetails: [],
    };
  }
  componentDidMount() {
    fetch(`${API}/Data/DetailPages/ARTWORKDETAILS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          artWorkDetails: res.artworkDetails.others,
        });
      });
  }

  render() {
    const settings = {
      vertical: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };

    const {artworkDetails} = this.props;
    // console.log(this.props.artworkDetails);

    return (
      <Slider {...settings} className="artworkList">
        {artworkDetails.map((photo) => {
          return (
            <>
              <div className="photoList" key={photo.id}>
                <img src={photo.related_image_url} alt="슬라이드 이미지" />
              </div>
              <span>{photo.related_title}</span>
            </>
          );
        })}
      </Slider>
    );
  }
}
export default PhotoSlide;
