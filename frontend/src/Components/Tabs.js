import React from "react";
import '../Styles/Tabs.css';
function Tabs({tabs,activetab,setActiveTabs}) {
    return (  
        <div className="Tabs">
            {
                tabs.map((tab, index) => (
                   <span  key={index} onClick={()=>setActiveTabs(tab)} className={`${activetab === tab ? 'active' : ''} SingleTab`}>
                    {
                        tab
                    }
                </span>))
            }
        </div>
    );
}

export default Tabs;