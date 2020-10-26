import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      user_name,
      emailVal,
      numberVal,
      passwordVal,
      re_passwordVal,
    } = this.state;
    if (
      emailVal &&
      numberVal &&
      passwordVal &&
      re_passwordVal &&
      user_name.length > 0
    ) {
      const SH_URL = "http://10.58.0.139:8000";
      fetch(`${SH_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          user_name: this.state.user_name,
          password: this.state.password,
          mobile: this.state.mobile,
          profile_image_url: this.state.profile_image,
          introduction: this.state.short_introduce,
        }),
      }).then((res) => {
        if (res.status === 400) {
          alert("다시 한 번 확인해주세요!");
        } else if (res.status === 200) {
          alert("가입성공");
        }
      });
      // 페이지 넘어가는 코드 요기에
    }
  };

  checkVal = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === "email") {
      this.handleEmail(value);
    } else if (name === "mobile") {
      this.handleNumber(value);
    } else if (name === "password") {
      this.handlePw(value);
    } else if (name === "re_password") {
      this.handleePw(value);
    }
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
    console.log(pw.length > 7);
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
            <div>
              <label>프로필 이미지</label>
              <img
                src="https://previews.123rf.com/images/hydromet/hydromet1211/hydromet121100005/16185946-%ED%95%B4%EB%B3%80%EA%B3%BC-%EB%B0%94%EB%8B%A4.jpg"
                alt="profile_img"
              />
              <div className="idBox">
                <input
                  autoComplete="off"
                  placeholder="url주소를 입력해주세요."
                />
              </div>
            </div>
            <div className="idBox">
              <label>이름</label>
              <input
                autoComplete="off"
                onKeyUp={this.checkVal}
                name="user_name"
                type="text"
                placeholder="홍길동"
              />
            </div>
            <div className="idBox">
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
                </span>{" "}
              </div>
            )}
            {email.length === 0 && !emailVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 이메일을 입력해 주세요.
                </span>{" "}
              </div>
            )}
            <div className="idBox">
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
                </span>{" "}
              </div>
            )}
            <div className="alertMessage">
              {mobile.length === 0 && !numberVal && (
                <div className="alertMessage">
                  <span role="img" aria-label="">
                    🔺 휴대전화 번호를 입력해 주세요.
                  </span>{" "}
                </div>
              )}
            </div>
            <div className="idBox">
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
                </span>{" "}
              </div>
            )}
            {password.length === 0 && !passwordVal && (
              <div className="alertMessage">
                <span role="img" aria-label="">
                  🔺 비밀번호를 입력해 주세요.
                </span>{" "}
              </div>
            )}
            <div className="idBox">
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
                </span>{" "}
              </div>
            )}
            <div>
              <label>한 줄 소개</label>
              <textarea type="text"></textarea>
            </div>
            <button>회원가입하기</button>
          </form>
          <div className="privacy">
            회원가입 시{" "}
            <span>이용약관, 개인정보 수집 및 이용, 개인정보 제공</span>에
            동의하는 것으로 간주합니다.
          </div>
        </div>
        <footer>
          <div>
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
