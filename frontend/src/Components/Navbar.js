import {Search} from "monday-ui-react-core"
import React from "react";
import '../Styles/Navbar.css';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import logoCSP from "../Assets/logo-CSP.png";
import { useAuth0 } from "@auth0/auth0-react";


function Navbar() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return ( 
        <nav className="Navbar">
            <div className="logo">
                <img src={logoCSP}/>
                <h2 className="Heading">Customer <br/>support</h2>
            </div>
            
            <div className="SearchBar">
                <Search/>
            </div>
            
            <div className="Loginbtn">
                <LoginButton/>
                <LogoutButton/>
            </div>
            {/* <Search className="Searchbar" placeholder="search" /> */}
        </nav>
    );
}

export default Navbar;