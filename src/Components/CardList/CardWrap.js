import React, { Component } from "react";
import "./CardWrap.scss";
import Card from "./Components/Card";

class CardWrap extends Component {
  constructor() {
    super();
    this.btnValue = React.createRef;
  }

  render() {
    const { CardListsArr, mainPageName, changeMainPage } = this.props;

    const arrayList =
      CardListsArr &&
      CardListsArr.map(
        ({
          id,
          AuthorName,
          AuthorProfile,
          PostName,
          Img,
          Likes,
          Comments,
          Views,
        }) => {
          return (
            <Card
              key={id}
              id={id}
              AuthorName={AuthorName}
              AuthorProfile={AuthorProfile}
              PostName={PostName}
              Img={Img}
              Likes={Likes}
              Comments={Comments}
              Views={Views}
            />
          );
        }
      );

    const btnList = mainPageName.map(({ name }) => {
      return (
        <button
          ref={this.btnValue}
          onClick={() => {
            changeMainPage();
          }}
        >
          {name}
        </button>
      );
    });

    return (
      <div className="MainCardWrap">
        <span className="MainTitle">Artwork</span>
        {btnList}
        <div className="CardWrap">{arrayList}</div>
      </div>
    );
  }
}

export default CardWrap;
