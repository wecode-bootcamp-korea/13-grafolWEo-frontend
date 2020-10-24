import React, { Component } from "react";
import { FaRegSmile, FaRegUser } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import { Link } from "react-router-dom";

class PopularCreator extends Component {
  render() {
    const { popularCreator } = this.props;
    // const {
    //   popularCreator,
    //   name,
    //   desc,
    //   profileImgSrc,
    //   imgPreviewSrc,
    //   follower,
    //   like,
    //   illust,
    // } = this.props;

    console.log(popularCreator[0].id);

    return (
      <div>123</div>
      // {
      // FOOTERINFO.map((list) => {
      //   return (
      //     <li key={list.id}>
      //       <a href={list.href}>{list.name}</a>
      //     </li>
      //   );
      // })
      // }
      // {
      //   popularCreator.map((tag, idx) => {
      //     return (
      //       <li>
      //       <div className="inner">
      //         <div className="profileInfo">
      //           <Link
      //             to="/"
      //             className="artistProfileImg"
      //             style={{ backgroundImage: `url(${profileImgSrc})` }}
      //           ></Link>
      //           <h5>{name}</h5>
      //           <p>{desc}</p>
      //           <ul className="actions">
      //             <li className="follow">
      //               <span className="icon">
      //                 <FaRegUser />
      //               </span>
      //               <em>{follower}</em>
      //             </li>
      //             <li className="like">
      //               <span className="icon">
      //                 <IoMdPaper />
      //               </span>
      //               <em>{like}</em>
      //             </li>
      //             <li className="illust">
      //               <span className="icon">
      //                 <FaRegSmile />
      //               </span>
      //               <em>{illust}</em>
      //             </li>
      //           </ul>
      //         </div>
      //         <ul className="clearFix imgThumWrap">
      //           {/* {imgPreviewSrc.map((tag, idx) => {
      //             return (
      //               <li key={idx}>
      //                 <Link
      //                   to="/"
      //                   style={{ backgroundImage: `url(${imgPreviewSrc[idx]})` }}
      //                 >
      //                   <img src={imgPreviewSrc[idx]} alt="대표 이미지" />
      //                 </Link>
      //               </li>
      //             );
      //           })} */}
      //         </ul>
      //       </div>
      //     </li>
      //     );
      //   })
      // }
    );
  }
}

export default PopularCreator;
