import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();

  const handleMessengerClick = () => {
    // Redirect to the login page when the login button is clicked
    history.push('/messenger');
  };
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Dispatch action to update context state
    dispatch({ type: "LOGOUT" });
  };



  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{width:"100px" ,height:"55px",justifyContent:"center",marginLeft:"20px"}}>
        <img className="birthdayImg"  style={{width:"60px" ,height:"60px",paddingRight:"90px"}} src={PF + "person/logo.png"} alt="" />
          </div>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <Link  onClick={handleMessengerClick}  style={{ color: 'white' }}>
            <Chat  />
          </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="topbarIconItem">    
        <Link >
        <button className="sidebarButton" onClick={handleLogout} style={{width:"80px",backgroundColor:"white",color:"black"}}>log Out</button>
        </Link>
      </div>

      </div>
    </div>
  );
}
