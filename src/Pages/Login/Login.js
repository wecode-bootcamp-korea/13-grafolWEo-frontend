import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      mostViewdImg:
        "https://usercontents-c.styleshare.io/images/21484842/700x432",
    };
  }

  render() {
    return (
      <div className="Login">
        <section>
          <div className="loginContainer">
            <header>
              <img className="logo" src="/Images/GrafolWeo.png" alt="logo" />
              <span className="loginText">로그인</span>
            </header>
            <form>
              <div className="loginBox">
                <label>이메일</label>
                <input type="email" placeholder="example@naver.com" />
              </div>
              <div className="loginBox">
                <label>비밀번호</label>
                <input type="password" placeholder="password" />
              </div>
              <div className="optionBox">
                <span>비밀번호를 잊으셨나요?</span>
                <Link to="/SignUp">
                  <span>회원가입하기</span>
                </Link>
              </div>
              <button className="btnStyle" type="button">
                로그인
              </button>
            </form>
            <footer>
              최초 로그인 시<br />
              <span>이용약권, 개인정보 수집 및 이용, 개인정보 제공</span>에
              <br /> 동의하는 것으로 간주합니다.
            </footer>
          </div>
        </section>
        <aside
          style={{ backgroundImage: `url(${this.state.mostViewdImg})` }}
        ></aside>
      </div>
    );
  }
}

export default Login;
