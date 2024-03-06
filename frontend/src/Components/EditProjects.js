import React, { useState,useEffect } from "react";
import Tabs from './Tabs';
import ProjectOverview from "./ProjectOverview";
import ScopeAndStack from "./ScopeAndStack";
import EscaltionMatrix from "./EscalationMatrix";
import VersionHistory from "./VersionHistory";
import AuditHistory from "./AuditHistory";
import ProjectBudget from "./ProjectBudget";
import StakeHolder from "./StakeHolder";
import { useParams } from 'react-router-dom';
import RiskProfile from "./RiskProfile";
import Phases from './Phases';
import Sprint from './Sprint';
import '../Styles/EditProjects.css';

const tabs=['Project Overview','Scope & Stacks','Project Budget','Audit History','Version History','Escaltion Matrix','Stake Holders','Risk Profile','Phases','Sprint']

function EditProjects() {
    // const projectId=props.location.state;
    const { projectId } = useParams();

    useEffect(() => {
        // Perform any necessary actions related to projectId
        console.log("Project ID:", projectId);
    }, []);

    const [activetab,setActiveTabs]=useState('Project Overview');

    return (  
        <div className="EditProjects">
            <Tabs tabs={tabs} activetab={activetab} setActiveTabs={setActiveTabs}/>
            <hr/>
            <div>
                {
                    activetab==='Project Overview' && <ProjectOverview/>
                }
                {
                    activetab==='Scope & Stacks' && <ScopeAndStack projectId={projectId}/>
                }
                {
                    activetab==='Escaltion Matrix' && <EscaltionMatrix/>
                }
                {
                    activetab==='Version History' && <VersionHistory projectId={projectId} />
                }
                {
                    activetab==='Audit History' && <AuditHistory projectId={projectId}/>
                }
                {
                    activetab==='Project Budget' && <ProjectBudget projectId={projectId}/>
                }
                {
                    activetab==='Stake Holders' && <StakeHolder projectId={projectId}/>
                }
                {
                    activetab==='Risk Profile' && <RiskProfile projectId={projectId}/>
                }
                {
                    activetab==='Phases' && <Phases projectId={projectId}/>
                }
                {
                    activetab==='Sprint' && <Sprint projectId={projectId}/>
                }
            </div>
        </div>
    );
}

export default EditProjects;