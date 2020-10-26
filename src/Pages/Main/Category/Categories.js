import React, { Component } from "react";
import Slider from "react-slick";
// import { Link } from "react-router-dom";
import "./Category.scss";

class Categories extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
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
                      backgroundImage: `url(https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60)`,
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
