import React, { useState,useEffect } from "react";
import Tabs from './Tabs';
// import ProjectOverview from "./ProjectOverview";
import ScopeAndStack from "./ScopeAndStack";
import EscalationMatrix from "./EscalationMatrix";
import VersionHistory from "./VersionHistory";
import AuditHistory from "./AuditHistory";
import ProjectBudget from "./ProjectBudget";
import StakeHolder from "./StakeHolder";
import { useParams } from 'react-router-dom';
import RiskProfile from "./RiskProfile";
import Phases from './Phases';
import Sprint from './Sprint';
import ApprovedTeams from "./ApprovedTeams";
import Resources from "./Resources";
import ClientFeedback from "./ClientFeedback";
import ProjectUpdates from "./ProjectUpdates";
import MoM from "./MoM";
import '../Styles/EditProjects.css';

const tabs=['Scope & Stacks','Project Budget','Project Overview','Audit History','Version History','Escalation Matrix','Stake Holders','Risk Profile','Phases','Sprint','Approved Teams','Resources','ClientFeedback','ProjectUpdates','MoM']

function EditProjects() {
    // const projectId=props.location.state;
    const { projectId } = useParams();

    useEffect(() => {
        // Perform any necessary actions related to projectId
        console.log("Project ID:", projectId);
    }, []);

    const [activetab,setActiveTabs]=useState('Scope & Stacks');

    return (  
        <div className="EditProjects">
            <Tabs tabs={tabs} activetab={activetab} setActiveTabs={setActiveTabs}/>
            <hr/>
            <div>
                {/* {
                    activetab==='Project Overview' && <ProjectOverview projectId={projectId}/>
                } */}
                {
                    activetab==='Scope & Stacks' && <ScopeAndStack projectId={projectId}/>
                }
                {
                    activetab==='Escalation Matrix' && <EscalationMatrix projectId={projectId}/>
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
                {
                    activetab==='Approved Teams' && <ApprovedTeams projectId={projectId}/>
                }
                {
                    activetab==='Resources' && <Resources projectId={projectId}/>
                }
                {
                    activetab==='ClientFeedback' && <ClientFeedback projectId={projectId}/>
                }
                {
                    activetab==='ProjectUpdates' && <ProjectUpdates projectId={projectId}/>
                }
                {
                    activetab==='MoM' && <MoM projectId={projectId}/>
                }
            </div>
        </div>
    );
}

export default EditProjects;