import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";

function RiskProfile({ projectId }) {
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

  useEffect(() => {
    const fetchAuditHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/risk-profiles/${projectId}`
        );
        setRiskProfile(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchAuditHistory();
  }, [projectId]);

  const handleAddNewAudit = () => {
    setNewRiskProfile({ ...newRiskProfile, isEditing: true });
  };

  const handleSaveNewAudit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/risk-profiles`,
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
  const deleteAudit = async (auditId) => {
    try {
      await axios.delete(`http://localhost:5000/api/risk-profiles/${auditId}`);
      // Remove the deleted project from the project list
      setRiskProfile(RiskProfiles.filter((Audit) => Audit._id !== auditId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/riskprofile/pdf`,
        RiskProfiles,
        { responseType: "blob" } // Set response type to blob for downloading file
      );

      // Create a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the PDF Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", "Risk_Profile.pdf");
      tempLink.click();

      // Release the object URL after the download
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      <div className="top-btns">
      <button className="add-version-btn" onClick={handleAddNewAudit}>
        Add RiskProfile
      </button>
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
            <th>Actions</th>
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
              <td>
                {riskprofile.isEditing ? (
                  <button className="save-btn">Save</button>
                ) : (
                  <div className="edit-buttons">
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteAudit(riskprofile._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
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
    </div>
  );
}

export default RiskProfile;
