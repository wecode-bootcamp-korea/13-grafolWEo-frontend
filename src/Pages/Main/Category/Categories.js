import React, { Component } from "react";
import Slider from "react-slick";
import "./Category.scss";

class Categories extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
    };

    const { CategoriesState } = this.props;

    return (
      <ul className="Categories">
        <h3>Category</h3>
        <div className="CategoriesWrap">
          <Slider className="slider" {...settings}>
            {CategoriesState.map((tag, idx) => {
              return (
                <li className="categoryPictures" key={idx}>
                  <div
                    className="categoryImg"
                    style={{
                      backgroundImage: `url(${tag.image_url})`,
                    }}
                  ></div>
                  <div
                    className="categoryInfobox"
                    style={{ backgroundColor: `${tag.backgroundColor}` }}
                  >
                    <div className="categoryName">{tag.categoryName}</div>
                    <div className="categoryCount">{tag.categoryCount}</div>
                  </div>
                </li>
              );
            })}
          </Slider>
        </div>
      </ul>
    );
  }
}

export default Categories;
