import React, { Component } from "react";
import CardWrap from "../../Components/CardList/CardWrap";
import Categories from "./Category/Categories";
import { CARDDATA } from "../../config";
import "./Main.scss";

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
      CardDataOrder: 1,
    };
  }

  infiniteScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight * 0.95 &&
      !this.state.timeSet
    ) {
      this.setState({
        timeSet: true,
      });
      this.getCardData();
    } else {
      this.setState({
        timeSet: false,
      });
    }
  };

  getCategoryData = () => {
    fetch("http://10.58.7.192:8000/works/main/category")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          CategoriesArr: res.data,
        });
      });
  };

  getCardData = () => {
    const { mainPageView, CardDataOrder } = this.state;
    fetch(`${CARDDATA}?sort=${mainPageView}&page=${CardDataOrder}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          CardListsArr: this.state.CardListsArr.concat(res.data),
          CardDataOrder: this.state.CardDataOrder + 1,
        });
      });
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

    const changeMainPage = (name) => {
      this.setState(
        {
          mainPageView: name,
          CardListsArr: [],
          CardDataOrder: 1,
          buttonStyle: name,
        },
        () => {
          this.getCardData();
        }
      );
    };

    const btnList = mainPageName.map(({ name }) => {
      return (
        <button
          className={mainPageView === name ? "activeBtnStyle" : "defaltBtn"}
          onClick={() => {
            changeMainPage(name);
          }}
        >
          {name}
        </button>
      );
    });

    return (
      <>
        <div className="Main">
          <div className="container">
            <Categories CategoriesState={CategoriesArr} />
            <div className="MainCardWrap">
              <span className="MainTitle">Artwork</span>
              {btnList}
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
