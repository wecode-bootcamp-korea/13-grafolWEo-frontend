import React, { Component } from 'react';
import "./Footer.scss";

class Footer extends Component {
    render() { 
        return ( 
            <footer className="Footer">
                <div>
                    <ul>
                        <li>이용약관</li>
                        <li>개인정보 처리방침</li>
                        <li>ⓒ Grafolweo.</li>
                    </ul>
                </div>
            </footer>
         );
    }
}
 
export default Footer;