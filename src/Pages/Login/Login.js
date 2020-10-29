import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { SH_URL } from "../../config";
import "./Login.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailVal: true,
      isModal: true,
      mostViewdArt:
        "https://usercontents-c.styleshare.io/images/21484842/700x432",
    };
  }

  loginAccess = (e) => {
    e.preventDefault();
    const { email, password, emailVal } = this.state;
    if (emailVal && password.length > 0) {
      fetch(`${SH_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.MESSAGE !== "LOGIN_SUCCESS") {
            this.setState({ isModal: false }, () => {
              setTimeout(() => {
                this.setState({ isModal: true });
              }, 3000);
            });
          } else if (res.MESSAGE === "LOGIN_SUCCESS") {
            this.props.history.push("/");
            localStorage.setItem("Authorization", res.AUTHORIZATION);
          }
        });
    }
  };
  checkVal = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === "email") {
      this.validateEmail(value);
    } else {
      this.validatePw(value);
    }
  };

  validateEmail = (email) => {
    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    this.setState({ emailVal: emailRule.test(email) });
  };

  validatePw = (pw) => {
    this.setState({ password: pw });
  };

  render() {
    const { isModal, mostViewdArt } = this.state;
    return (
      <div className="Login">
        <div className={isModal ? "" : "activated"}>
          <img src="Images/exclamation-mark.png" alt="warning-mark" />
          <span>
            아이디 또는 비밀번호를 다시 확인하세요. 아이디 또는 비밀번호를 잘못
            입력하셨습니다
          </span>
        </div>
        <section>
          <div className="loginContainer">
            <header>
              <img className="logo" src="/Images/GrafolWeo.png" alt="logo" />
              <span className="loginText">로그인</span>
            </header>
            <form onSubmit={this.loginAccess}>
              <div className="loginBox">
                <label>이메일</label>
                <input
                  onChange={this.checkVal}
                  name="email"
                  type="text"
                  placeholder="example@naver.com"
                />
              </div>
              <div className="loginBox">
                <label>비밀번호</label>
                <input
                  onChange={this.checkVal}
                  name="pw"
                  type="password"
                  placeholder="password"
                />
              </div>
              <div className="optionBox">
                <span>비밀번호를 잊으셨나요?</span>
                <Link to="/SignUp">
                  <span>회원가입하기</span>
                </Link>
              </div>
              <button onClick={this.loginAccess} className="btnStyle">
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
        <aside style={{ backgroundImage: `url(${mostViewdArt})` }}></aside>
      </div>
    );
  }
}

export default withRouter(Login);
