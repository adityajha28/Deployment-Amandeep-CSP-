import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "../Styles/LogoutButton.css"

const LogoutButton = () => {
  const { logout,user,isAuthenticated } = useAuth0();

  return (
    isAuthenticated &&(
        <div className="credentials">
            <div className="userimg">
                <img src={user.picture}/>
            </div>
            <div className="authentication">
                <span>{user.name}</span>
            <button className="logout-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
            </button>
            </div>
        </div>
    )
  );
};

export default LogoutButton;