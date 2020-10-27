import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SH_URL } from "../../../src/config";
import "./SignUp.scss";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      profile_image_url: "",
      user_name: "",
      email: "",
      mobile: "",
      password: "",
      re_password: "",
      introduction: "",
      emailVal: true,
      numberVal: true,
      passwordVal: true,
      re_passwordVal: true,
    };
  }

  postSignUp = (e) => {
    e.preventDefault();
    const {
      profile_image_url,
      user_name,
      email,
      emailVal,
      mobile,
      numberVal,
      password,
      passwordVal,
      re_passwordVal,
      introduction,
    } = this.state;
    if (
      emailVal &&
      numberVal &&
      passwordVal &&
      re_passwordVal &&
      user_name.length > 0
    ) {
      fetch(`${SH_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user_name,
          password,
          mobile,
          profile_image_url,
          introduction,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("가입을 축하 드립니다!");
            this.props.history.push("/");
          } else if (res.statusd === 400) {
            alert("다시 한번 확인해주세요 !");
          }
        });
    }
  };

  checkVal = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    switch (name) {
      case "profile_image_url":
        this.hadleProfileImg(value);
        break;
      case "email":
        this.handleEmail(value);
        break;
      case "mobile":
        this.handleNumber(value);
        break;
      case "password":
        this.handlePw(value);
        break;
      case "re_password":
        this.handleRePw(value);
        break;
      default:
        break;
    }
  };

  hadleProfileImg = (url) => {
    this.setState({ profile_image_url: url });
  };

  handleEmail = (email) => {
    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    this.setState({
      emailVal: emailRule.test(email),
    });
  };

  handleNumber = (phoneNumber) => {
    const regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    this.setState({
      numberVal: regExp.test(phoneNumber),
    });
  };

  handlePw = (pw) => {
    pw.length > 7
      ? this.setState({ passwordVal: true })
      : this.setState({ passwordVal: false });
  };

  handleRePw = (re) => {
    re === this.state.password
      ? this.setState({ re_passwordVal: true })
      : this.setState({ re_passwordVal: false });
  };

  render() {
    const {
      profile_image_url,
      email,
      emailVal,
      mobile,
      numberVal,
      password,
      passwordVal,
      re_passwordVal,
    } = this.state;
    return (
      <div className="SignUp">
        <nav>
          <img src="Images/GrafolWEo.png" alt="logo" />
          <span>
            <Link to="/Login">로그인</Link>
          </span>
        </nav>
        <div className="signupContainer">
          <div className="text_box">
            <p>회원가입</p>
          </div>
          <form onSubmit={this.postSignUp}>
            <div className="itemBox">
              <label>프로필 이미지</label>
              <div className="outline">
                {profile_image_url && (
                  <img src={profile_image_url} alt="profile_img" />
                )}
              </div>
              <div className="itemBox">
                <input
                  name="profile_image_url"
                  autoComplete="off"
                  placeholder="url주소를 입력해주세요."
                  onChange={this.checkVal}
                />
              </div>
            </div>
            <div className="itemBox">
              <label>이름</label>
              <input
                autoComplete="off"
                onKeyUp={this.checkVal}
                name="user_name"
                type="text"
                placeholder="홍길동"
              />
            </div>
            <div className="itemBox">
              <label>이메일</label>
              <input
                autoComplete="off"
                onKeyUp={this.checkVal}
                name="email"
                type="email"
                placeholder="example@naver.com"
              />
            </div>
            {email.length !== 0 && !emailVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 올바른 이메일이 아닙니다.
                </span>
              </div>
            )}
            {!email.length && !emailVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 이메일을 입력해 주세요.
                </span>
              </div>
            )}
            <div className="itemBox">
              <label>휴대전화 번호</label>
              <input
                autoComplete="off"
                onKeyUp={this.checkVal}
                name="mobile"
                type="text"
                placeholder="-를 제외한 휴대폰 번호를 입력해주세요"
              />
            </div>
            {mobile.length !== 0 && !numberVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 올바른 휴대폰 번호가 아닙니다.
                </span>
              </div>
            )}
            <div className="alertMessage">
              {!mobile.length && !numberVal && (
                <div className="alertMessage">
                  <span role="img" aria-label="">
                    🔺 휴대전화 번호를 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className="itemBox">
              <label>비밀번호(8자 이상)</label>
              <input
                autoComplete="off"
                onKeyUp={this.checkVal}
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
            {password.length !== 0 && !passwordVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 최소 8자 입니다.
                </span>
              </div>
            )}
            {!password.length && !passwordVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 비밀번호를 입력해 주세요.
                </span>
              </div>
            )}
            <div className="itemBox">
              <label>비밀번호 확인</label>
              <input
                autoComplete="off"
                onKeyUp={this.checkVal}
                name="re_password"
                type="password"
                placeholder="password"
              />
            </div>
            {!re_passwordVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 패스워드가 일치하지 않습니다
                </span>
              </div>
            )}
            <div className="itemBox">
              <label>한 줄 소개</label>
              <textarea type="text"></textarea>
            </div>
            <button>회원가입하기</button>
          </form>
          <div className="privacy">
            회원가입 시
            <span>이용약관, 개인정보 수집 및 이용, 개인정보 제공</span>에
            동의하는 것으로 간주합니다.
          </div>
        </div>
        <footer>
          <div className="infoBox">
            <div className="leftInfo">
              <div className="INCName">GRAFOLWEO Inc.</div>
              <div className="companyInfo">
                <ul>
                  <li>이용약관</li>
                  <li>개인정보 처리방침</li>
                  <li>환불 정책</li>
                  <li>사업자 정보 확인</li>
                  <li>제휴/협력 문의</li>
                  <li>단체/기업 교육 문의</li>
                  <li>정기구독서비스 이용약관</li>
                </ul>
              </div>
            </div>
            <div>
              (주)GRAFOLWEO ⎮ 대표 홍길동 ⎮ 서울특별시 강남구 삼성동 143-40
              위워크타워 10층 ⎮ 사업자등록번호: 123-45-67890 ⎮ 통신판매업신고:
              2020-서울강남구-0087 ⎮ 주식회사 <br />
              GRAFOLWEO은 전자상거래 등에서의 소비자보호에 관한 법률에 따른
              통신판매업과 통신판매중개업을 영위하고 있습니다. 주식회사
              GRAFOLWEO는 통신판매중개자로서 중개하는 통<br />신 판매 에
              관하여서는 통신판매의 당사자가 아니므로 어떠한 책임도 부담하지
              아니합니다.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default SignUp;
