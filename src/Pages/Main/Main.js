import React, { Component } from "react";
import CardWrap from "../../Components/CardList/CardWrap";
import Categories from "./Category/Categories";
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
      items: 8,
      preItems: 0,
      timeSet: false,
    };
  }

  infiniteScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight * 0.8 && !this.state.timeSet) {
      this.setState({
        preItems: this.state.items,
        items: this.state.items + 4,
        timeSet: true,
      });
      this.getCardData();
    } else {
      this.setState({
        timeSet: false,
      });
    }
  };

  getCategoryBackgroundData = () => {
    fetch("http://localhost:3000/Data/Category/categoryData.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          CategoriesArr: res.data,
        });
      });
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
    fetch(
      `http://10.58.7.192:8000/works/main/list/${this.state.mainPageView}/1`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          CardListsArr: res.data,
        });
      });
  };

  changeMainPage = (name) => {
    // this.setState({
    //   mainPageView: name,
    // });
    console.log("언제나 조져지는 것은 나였다.");
  };

  componentDidMount() {
    this.getCategoryData();
    this.getCategoryBackgroundData();
    this.getCardData();
    window.addEventListener("scroll", this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.infiniteScroll);
  }

  render() {
    const { CardListsArr, CategoriesArr, mainPageName } = this.state;
    return (
      <>
        <div className="Main">
          <div className="container">
            <Categories CategoriesState={CategoriesArr} />
            <CardWrap
              mainPageName={mainPageName}
              changeMainPage={this.changeMainPage}
              CardListsArr={CardListsArr}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Main;
