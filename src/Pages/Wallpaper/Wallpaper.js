import React, { Component } from "react";
import { Link } from "react-router-dom";

class Wallpaper extends Component {
  render() {
    return (
      <div className="Wallpaper">
        <main class="container">
          <section className="editorsPick">
            <h2>
              Editor's Pick
              <ul>
                <li>
                  <button>따뜻한 말</button>
                </li>
                <li>
                  <button>따뜻한 말</button>
                </li>
                <li>
                  <button>따뜻한 말</button>
                </li>
                <li>
                  <button>따뜻한 말</button>
                </li>
                <li>
                  <button>따뜻한 말</button>
                </li>
              </ul>
            </h2>
            <ul>
              <li>
                <Link to="/">
                  <img
                    src="https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                    alt="에디터 픽 배경화면 이미지"
                  />
                </Link>
              </li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
}

export default Wallpaper;
