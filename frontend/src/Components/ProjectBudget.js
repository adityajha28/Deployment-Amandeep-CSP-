import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../Styles/VersionHistory.css";
import EditBudgetModal from "../Modals/EditBudgetModal";
import ExportAsPdf from "../Service/ExportAsPdf";

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

  const [editBudgetData, setEditBudgetData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleDownloadAsPdf = () => {
    const columns = [
      "projectType",
      "Duration",
      "budgetHours",
    ];
    ExportAsPdf(projectBudget, columns, "Project_Budget","Project Budget");
  };

  const handleEditBudget = (budget) => {
    setEditBudgetData(budget);
    setShowEditModal(true);
  };

  const handleUpdateBudget = async (updatedBudget) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/project-budget/${updatedBudget._id}`,
        updatedBudget
      );
      const updatedBudgets = projectBudget.map((budget) =>
        budget._id === updatedBudget._id ? response.data : budget
      );
      setProjectBudget(updatedBudgets);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating budget:", error);
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
                <button className="edit-btn" onClick={() => handleEditBudget(budget)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteBudget(budget._id)}>Delete</button>
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
       {/* Edit Budget Modal */}
       {showEditModal && <EditBudgetModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        budgetData={editBudgetData}
        handleUpdate={handleUpdateBudget}
      />}
    </div>
  );
}

export default ProjectBudget;
