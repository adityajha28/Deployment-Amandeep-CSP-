import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import EditRiskModal from "../Modals/EditRiskModal";
import ExportAsPdf from "../Service/ExportAsPdf";

function RiskProfile({ projectId,role }) {
  // console.log(`in versionhistory ${projectId}`)
  const [RiskProfiles, setRiskProfile] = useState([]);
  const [newRiskProfile, setNewRiskProfile] = useState({
    projectId: `${projectId}`,
    RiskType: "",
    Description: "",
    Severity: "",
    Impact:"",
    RemedialSteps:"",
    Status: "",
    closureDate: "",
    isEditing: false,
  });

  const [editRisk, setEditRisk] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => {
    const fetchAuditHistory = async () => {
      try {
        const response = await axios.get(
          `http://3.108.217.170:5000/api/risk-profiles/${projectId}`
        );
        setRiskProfile(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchAuditHistory();
  }, [projectId]);

  const handleAddNewRisk = () => {
    setNewRiskProfile({ ...newRiskProfile, isEditing: true });
  };

  const handleSaveNewAudit = async () => {
    try {
      const response = await axios.post(
        `http://3.108.217.170:5000/api/risk-profiles`,
        newRiskProfile
      );
      setRiskProfile([...RiskProfiles, newRiskProfile]);
      setNewRiskProfile({
        projectId: `${projectId}`,
        RiskType: "",
        Description: "",
        Severity: "",
        Impact: "",
        RemedialSteps: "",
        closureDate: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRiskProfile({ ...newRiskProfile, [name]: value });
  };

  // deleting a version data from table
  const deleteRisk = async (RiskId) => {
    try {
      await axios.delete(`http://3.108.217.170:5000/api/risk-profiles/${RiskId}`);
      // Remove the deleted project from the project list
      setRiskProfile(RiskProfiles.filter((risk) => risk._id !== RiskId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = () => {
    const columns = [
      "RiskType",
      "Description",
      "Severity",
      "Impact",
      "RemedialSteps",
      "Status",
      "closureDate",
    ];
    ExportAsPdf(RiskProfiles, columns, "Risk_Profile", "Risk Profile");
  };

  const handleEditVersion = (Version) => {
    setEditRisk(Version);
    setShowEditModal(true);
  };

  const handleUpdateRisk = async (updatedRisk) => {
    try {
      const response = await axios.put(
        `http://3.108.217.170:5000/api/risk-profiles/${updatedRisk._id}`,
        updatedRisk
      );
      const updatedRiskProfile = RiskProfiles.map((risk) =>
      risk._id === updatedRisk._id ? response.data : risk
      );
      setRiskProfile(updatedRiskProfile);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating version:", error);
    }
  };



  return (
    <div>
      <div className="top-btns">
      {(role==="Admin"  || role==="Project Manger")  &&( <button className="add-version-btn" onClick={handleAddNewRisk}>
        Add RiskProfile
      </button>)}
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Risk Type</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Impact</th>
            <th>Remedial Steps</th>
            <th>Status</th>
            <th>closureDate</th>
            {(role==="Admin" || role==="Project Manger")&&(<th>Actions</th>)}
          </tr>
        </thead>
        <tbody>
          {RiskProfiles.map((riskprofile, index) => (
            <tr key={index}>
              <td>{riskprofile.RiskType}</td>
              <td>{riskprofile.Description}</td>
              <td>{riskprofile.Severity}</td>
              <td>{riskprofile.Impact}</td>
              <td>{riskprofile.RemedialSteps}</td>
              <td>{riskprofile.Status}</td>
              <td>{riskprofile.closureDate}</td>
              {(role==="Admin" || role==="Project Manger") && (<td>
                <button className="edit-btn" onClick={() => handleEditVersion(riskprofile)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteRisk(riskprofile._id)}>Delete</button>
              </td>)}
              
            </tr>
          ))}
          {newRiskProfile.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="RiskType"
                  value={newRiskProfile.RiskType}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Description"
                  value={newRiskProfile.Description}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Severity"
                  value={newRiskProfile.Severity}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Impact"
                  value={newRiskProfile.Impact}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="RemedialSteps"
                  value={newRiskProfile.RemedialSteps}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Status"
                  value={newRiskProfile.Status}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="closureDate"
                  value={newRiskProfile.closureDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button onClick={handleSaveNewAudit} className="save-btn">
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showEditModal && <EditRiskModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        RiskData={editRisk}
        handleUpdate={handleUpdateRisk}
      />}
    </div>
  );
}

export default RiskProfile;
