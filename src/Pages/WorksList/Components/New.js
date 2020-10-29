import React, { Component } from "react";
import Card from "../../../Components/CardList/Components/Card";
import { CARDDATA } from "../../../config";
import "../../../Components/CardList/CardWrap.scss";

const LIMIT = 12;

class New extends Component {
  constructor() {
    super();
    this.state = {
      CardListsArr: [],
      timeSet: false,
      CardDataOrder: 0,
    };
  }

  infiniteScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight * 0.95 &&
      !this.state.timeSet
    ) {
      this.setState({ timeSet: true });
      this.getCardData();
    }
  };

  getCardData = () => {
    const { CardListsArr, CardDataOrder } = this.state;
    const { categoryName } = this.props;

    fetch(
      `${CARDDATA}list?sort=최신&limit=${LIMIT}&offset=${CardDataOrder}&category_id=${categoryName}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          CardListsArr: [...CardListsArr, ...res.data],
          CardDataOrder: CardDataOrder + LIMIT,
          timeSet: false,
        });
      });
  };

  componentDidMount() {
    this.getCardData();
    window.addEventListener("scroll", this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.infiniteScroll);
  }

  render() {
    const { CardListsArr } = this.state;

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

export default New;
