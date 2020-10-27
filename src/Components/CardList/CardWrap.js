import React, { Component } from "react";
import "./CardWrap.scss";
import Card from "./Components/Card";

class CardWrap extends Component {
  render() {
    const { CardListsArr } = this.props;

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

    return <div className="CardWrap">{arrayList}</div>;
  }
}

export default CardWrap;
