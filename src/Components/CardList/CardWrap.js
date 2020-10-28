import React, { Component } from "react";
import Card from "./Components/Card";
import "./CardWrap.scss";

class CardWrap extends Component {
  render() {
    const { CardListsArr } = this.props;

    return (
      <div className="CardWrap">
        {CardListsArr &&
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
          )}
      </div>
    );
  }
}

export default CardWrap;
