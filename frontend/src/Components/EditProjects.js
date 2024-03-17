import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
// import ProjectOverview from "./ProjectOverview";
import ScopeAndStack from "./ScopeAndStack";
import EscalationMatrix from "./EscalationMatrix";
import VersionHistory from "./VersionHistory";
import AuditHistory from "./AuditHistory";
import ProjectBudget from "./ProjectBudget";
import StakeHolder from "./StakeHolder";
import { useParams } from "react-router-dom";
import RiskProfile from "./RiskProfile";
import Phases from "./Phases";
import Sprint from "./Sprint";
import ApprovedTeams from "./ApprovedTeams";
import Resources from "./Resources";
import ClientFeedback from "./ClientFeedback";
import ProjectUpdates from "./ProjectUpdates";
import MoM from "./MoM";
import "../Styles/EditProjects.css";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectOverview from "./ProjectOverview";

var myHeaders = new Headers();

myHeaders.append("Accept", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdxX1ZVZVdlMDRULTdRVlFPRjFTbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1oa2s1bmNqOGd0NDIza2c3LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJJVUNWT2ZkRW94dUFMUzZDaVRZSXg4SUxVUTVxSWdCZ0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtaGtrNW5jajhndDQyM2tnNy51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxMDY2MjMxNiwiZXhwIjoxNzEzMjU0MzE2LCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOnBob25lX3Byb3ZpZGVycyBjcmVhdGU6cGhvbmVfcHJvdmlkZXJzIHJlYWQ6cGhvbmVfcHJvdmlkZXJzIHVwZGF0ZTpwaG9uZV9wcm92aWRlcnMgZGVsZXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6cGhvbmVfdGVtcGxhdGVzIHJlYWQ6cGhvbmVfdGVtcGxhdGVzIHVwZGF0ZTpwaG9uZV90ZW1wbGF0ZXMgY3JlYXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmVuY3J5cHRpb25fa2V5cyB1cGRhdGU6ZW5jcnlwdGlvbl9rZXlzIGRlbGV0ZTplbmNyeXB0aW9uX2tleXMgcmVhZDpzZXNzaW9ucyBkZWxldGU6c2Vzc2lvbnMgcmVhZDpyZWZyZXNoX3Rva2VucyBkZWxldGU6cmVmcmVzaF90b2tlbnMgY3JlYXRlOnNlbGZfc2VydmljZV9wcm9maWxlcyByZWFkOnNlbGZfc2VydmljZV9wcm9maWxlcyB1cGRhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIGRlbGV0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgY3JlYXRlOnNzb19hY2Nlc3NfdGlja2V0cyByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6IklVQ1ZPZmRFb3h1QUxTNkNpVFlJeDhJTFVRNXFJZ0JnIn0.iWzw62BFr6cLSRXBLAf4hjC1Qqm-EehXYIsq8Gbj80-Qq3kQZheRoqYWtxYNGwwsnBp2ZzqU554hS_fDu-JlcjkgRa9w-WRmwdGug4vqeyS8gGZAJpKUcpJ2v21tOGyzZ4V5LhvAVMIHtz1R2D7lsgvWXndq5SKWQaGgouxTFthSGqI58Qmz1CuMiOJoaQcbxeuTo7OC70vT7UxXmzf1zRqtOmFgiO3uoRUQm0VTIgjmYo382DCfpkMd3Hx2EBA2kB6f64EI8L1AcOmlqdz2bXd7qU50vjGDmTUcUjuoOGYX44rwY-5Jti0DkdGNYoz1FdsxA0JoD8GfBdLIx2wWLQ"
);

const tabs = [
  "Scope & Stacks",
  "Project Budget",
  "Project Overview",
  "Audit History",
  "Version History",
  "Escalation Matrix",
  "Stake Holders",
  "Risk Profile",
  "Phases",
  "Sprint",
  "Approved Teams",
  "Resources",
  "ClientFeedback",
  "ProjectUpdates",
  "MoM",
];

function EditProjects() {
  // const projectId=props.location.state;
  const { projectId } = useParams();

  useEffect(() => {
    // Perform any necessary actions related to projectId
    console.log("Project ID:", projectId);
  }, []);

  const [activetab, setActiveTabs] = useState("Scope & Stacks");

  const [UserRole, setUserRole] = useState([]);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (!isLoading && isAuthenticated && user) {
    console.log(`in navbar ${user.sub}`);
  }

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (isAuthenticated && user) {
          const roleResponse = await fetch(
            `https://dev-hkk5ncj8gt423kg7.us.auth0.com/api/v2/users/${user.sub}/roles`,
            requestOptions
          );
          var roleData = await roleResponse.json();
          setUserRole(roleData);
        }
        // console.log(`in navbar user role is ${roleData}`);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchUserRole();
  }, [isAuthenticated, user]);

  var role;

  if (isAuthenticated && !isLoading && UserRole[0]) {
    console.log(`In edit projects user role is ${UserRole[0].name}`);
    role = UserRole[0].name;
  }

  return (
    <div className="EditProjects">
      <Tabs tabs={tabs} activetab={activetab} setActiveTabs={setActiveTabs} />
      <hr />
      <div>
                {
                    activetab==='Project Overview' && <ProjectOverview projectId={projectId}/>
                }
        {activetab === "Scope & Stacks" && (
          <ScopeAndStack projectId={projectId} role={role} />
        )}
        {activetab === "Escalation Matrix" && (
          <EscalationMatrix projectId={projectId} role={role} />
        )}
        {activetab === "Version History" && (
          <VersionHistory projectId={projectId} role={role} />
        )}
        {activetab === "Audit History" && (
          <AuditHistory projectId={projectId} role={role} />
        )}
        {activetab === "Project Budget" && (
          <ProjectBudget projectId={projectId} role={role} />
        )}
        {activetab === "Stake Holders" && <StakeHolder projectId={projectId} role={role}/>}
        {activetab === "Risk Profile" && <RiskProfile projectId={projectId} role={role} />}
        {activetab === "Phases" && <Phases projectId={projectId} role={role}/>}
        {activetab === "Sprint" && <Sprint projectId={projectId} role={role} />}
        {activetab === "Approved Teams" && (
          <ApprovedTeams projectId={projectId} role={role}/>
        )}
        {activetab === "Resources" && <Resources projectId={projectId}role={role} />}
        {activetab === "ClientFeedback" && (
          <ClientFeedback projectId={projectId} role={role}/>
        )}
        {activetab === "ProjectUpdates" && (
          <ProjectUpdates projectId={projectId} role={role} />
        )}
        {activetab === "MoM" && <MoM projectId={projectId} role={role} />}
      </div>
    </div>
  );
}

export default EditProjects;
