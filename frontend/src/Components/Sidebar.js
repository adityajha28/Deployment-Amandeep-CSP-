import React from "react";
import '../Styles/Sidebar.css';
import { Link } from "react-router-dom";

function Sidebar() {
    return ( 
        <div className="sidebar">
            <Link to="/CreateProject" className="Link" ><div className="btn-blue">+ New Project</div></Link>
            <Link to='/' className="Link"><span className="Projects">Projects</span></Link>
        </div>
     );
}

export default Sidebar;