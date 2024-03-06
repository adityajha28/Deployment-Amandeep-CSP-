import React from "react";
import '../Styles/Tabs.css';
function Tabs({tabs,activetab,setActiveTabs}) {
    return (  
        <div className="Tabs">
            {
                tabs.map((tab, index) => (
                   <div key={index} onClick={()=>setActiveTabs(tab)} className={activetab === tab ? 'active' : ''}>
                    {
                        tab
                    }
                </div>))
            }
        </div>
    );
}

export default Tabs;