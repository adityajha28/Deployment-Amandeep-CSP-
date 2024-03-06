import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";

function ProjectBudget({ projectId }) {
  // console.log(`in versionhistory ${projectId}`)
  const [projectBudget, setProjectBudget] = useState([]);
  const [newBudget, setNewBudget] = useState({
    projectId: `${projectId}`,
    projectType: "",
    Duration: "",
    budgetHours: "",
    isEditing: false,
  });

  useEffect(() => {
    const fetchBudgetHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project-budget/${projectId}`
        );
        setProjectBudget(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchBudgetHistory();
  }, [projectId]);

  const handleAddNewAudit = () => {
    setNewBudget({ ...newBudget, isEditing: true });
  };

  const handleSaveNewAudit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/project-budget`,
        newBudget
      );
      setProjectBudget([...projectBudget, newBudget]);
      setNewBudget({
        projectId: `${projectId}`,
        projectType: "",
        Duration: "",
        budgetHours: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({ ...newBudget, [name]: value });
  };

  // deleting a version data from table
  const deleteBudget = async (auditId) => {
    try {
      await axios.delete(`http://localhost:5000/api/project-budget/${auditId}`);
      // Remove the deleted project from the project list
      setProjectBudget(projectBudget.filter((budget) => budget._id !== auditId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/pdf`,
        projectBudget,
        { responseType: "blob" } // Set response type to blob for downloading file
      );

      // Create a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the PDF Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", "Phases.pdf");
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
        Add Budget
      </button>
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Project Type</th>
            <th>Duration in months</th>
            <th>Budgeted Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectBudget.map((budget, index) => (
            <tr key={index}>
              <td>{budget.projectType}</td>
              <td>{budget.Duration}</td>
              <td>{budget.budgetHours}</td>
              <td>
                {budget.isEditing ? (
                  <button className="save-btn">Save</button>
                ) : (
                  <div className="edit-buttons">
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBudget(budget._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {newBudget.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="projectType"
                  value={newBudget.projectType}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="number"
                  name="Duration"
                  value={newBudget.Duration}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="number"
                  name="budgetHours"
                  value={newBudget.budgetHours}
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

export default ProjectBudget;
