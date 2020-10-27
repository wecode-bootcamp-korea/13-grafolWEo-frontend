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
      mostViewdArt: "",
    };
  }
  // 사진정보받아올 때 componentdidmount메소드 사용
  loginAccess = (e) => {
    e.preventDefault();
    console.log("login");
    const { emailVal, password } = this.state;
    if (emailVal && password.length > 0) {
      fetch(`${SH_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((res) => {
          if (res.status === 400) {
            alert("다시 한 번 확인해주세요!");
          } else if (res.status === 200) {
            alert("로그인성공");
            // this.props.history.push("");
          }
        })
        .catch((error) => console.log(error.message));
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
    const { email, emailVal } = this.state;
    return (
      <div className="Login">
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
              {email.length !== 0 && !emailVal && (
                <div className="alertMessage">
                  <span role="img" aria-label="">
                    🔺 올바른 이메일이 아닙니다.
                  </span>{" "}
                </div>
              )}
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
        <aside
          style={{ backgroundImage: `url(${this.state.mostViewdArt})` }}
        ></aside>
      </div>
    );
  }
}

export default withRouter(Login);
