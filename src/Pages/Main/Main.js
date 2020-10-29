import React, { Component } from "react";
import CardWrap from "../../Components/CardList/CardWrap";
import Categories from "./Category/Categories";
import { CARDDATA } from "../../../src/config";
import "./Main.scss";

const LIMIT = 12;

class Main extends Component {
  constructor() {
    super();
    this.state = {
      CategoriesArr: [],
      mainPageName: [
        { name: "발견" },
        { name: "주목받는" },
        { name: "데뷰" },
        { name: "최신" },
      ],
      mainPageView: "발견",
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

  getCategoryData = () => {
    fetch(`${CARDDATA}category`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          CategoriesArr: res.data,
        });
      });
  };

  getCardData = () => {
    const { mainPageView, CardListsArr, CardDataOrder } = this.state;
    fetch(
      `${CARDDATA}list?sort=${mainPageView}&limit=${LIMIT}&offset=${CardDataOrder}`
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

  changeMainPage = (name) => {
    this.setState(
      {
        mainPageView: name,
        CardListsArr: [],
        CardDataOrder: 0,
        buttonStyle: name,
      },
      () => {
        this.getCardData();
      }
    );
  };

  componentDidMount() {
    this.getCategoryData();
    this.getCardData();
    window.addEventListener("scroll", this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.infiniteScroll);
  }

  render() {
    const {
      CardListsArr,
      CategoriesArr,
      mainPageName,
      mainPageView,
    } = this.state;

    return (
      <>
        <div className="Main">
          <div className="container">
            <Categories CategoriesState={CategoriesArr} />
            <div className="MainCardWrap">
              <span className="MainTitle">Artwork</span>
              {mainPageName.map(({ name, idx }) => {
                return (
                  <button
                    key={idx}
                    className={
                      mainPageView === name ? "activeBtnStyle" : "defaltBtn"
                    }
                    onClick={() => {
                      this.changeMainPage(name);
                    }}
                  >
                    {name}
                  </button>
                );
              })}
              <CardWrap
                mainPageName={mainPageName}
                changeMainPage={this.changeMainPage}
                CardListsArr={CardListsArr}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
