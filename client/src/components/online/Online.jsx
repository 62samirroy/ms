import "./online.css";
import { Link } from "react-router-dom";

export default function Online({user} ) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   console.log(user);
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <Link to={"/profile/" + user.username}>
        <img
          className="rightbarProfileImg" 
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarOnline">{user.username}</span>
    </li>
  );
}
