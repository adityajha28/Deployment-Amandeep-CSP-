import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../Styles/VersionHistory.css";
import EditProjectUpdate from "../Modals/EditProjectUpdate";
import ExportAsPdf from "../Service/ExportAsPdf";

function ProjectUpdates({ projectId,role}) {
  // console.log(`in versionhistory ${projectId}`)
  const [projectUpdates, setProjectUpdates] = useState([]);
  const [newProjectUpdate, setNewProjectUpdate] = useState({
    projectId: `${projectId}`,
    date: "",
    generalUpdates: "",
    isEditing: false,
  });

  const [editProjectUpdate, setEditProjectUpdate] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProjectUpdates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project-update/${projectId}`
        );
        setProjectUpdates(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchProjectUpdates();
  }, [projectId]);

  const handleAddNewUpdate = () => {
    setNewProjectUpdate({ ...newProjectUpdate, isEditing: true });
  };

  const handleSaveNewProjectUpdate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/project-update`,
        newProjectUpdate
      );
      setProjectUpdates([...projectUpdates, newProjectUpdate]);
      setNewProjectUpdate({
        projectId: `${projectId}`,
        date: "",
        generalUpdates: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProjectUpdate({ ...newProjectUpdate, [name]: value });
  };

  // deleting a version data from table
  const deleteProjectUpdate = async (UpdateId) => {
    try {
      await axios.delete(`http://localhost:5000/api/project-update/${UpdateId}`);
      // Remove the deleted project from the project list
      setProjectUpdates(projectUpdates.filter((update) => update._id !== UpdateId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = () => {
    const columns = [
      "date",
      "generalUpdates",
    ];
    ExportAsPdf(projectUpdates, columns, "Project_Updates", "Project Updates");
  };

  const handleEditBudget = (budget) => {
    setEditProjectUpdate(budget);
    setShowEditModal(true);
  };

  const handleUpdateProjectUpdates = async (updatedProjectUpdate) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/project-update/${updatedProjectUpdate._id}`,
        updatedProjectUpdate
      );
      const updatedProjectUpdates = projectUpdates.map((update) =>
      update._id === updatedProjectUpdate._id ? response.data : update
      );
      setProjectUpdates(updatedProjectUpdates);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating Project:", error);
    }
  };


  return (
    <div>
      <div className="top-btns">
      {(role==="Admin"  || role==="Project Manager")  &&( <button className="add-version-btn" onClick={handleAddNewUpdate}>
        Add ProjectUpdate
      </button>)}
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>General Updates</th>
            {(role==="Admin" || role==="Project Manager") && (<th>Actions</th>)}
          </tr>
        </thead>
        <tbody>
          {projectUpdates.map((updates, index) => (
            <tr key={index}>
              <td>{updates.date}</td>
              <td>{updates.generalUpdates}</td>
              {(role==="Admin" || role==="Project Manager") && (<td>
                <button className="edit-btn" onClick={() => handleEditBudget(updates)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteProjectUpdate(updates._id)}>Delete</button>
              </td>)}
            </tr>
          ))}
          {newProjectUpdate.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="date"
                  value={newProjectUpdate.date}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="generalUpdates"
                  value={newProjectUpdate.generalUpdates}
                  onChange={handleInputChange}
                />
              </td>
            
              <td>
                <button onClick={handleSaveNewProjectUpdate} className="save-btn">
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
       {/* Edit Budget Modal */}
       {showEditModal && <EditProjectUpdate
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        ProjectUpdate={editProjectUpdate}
        handleUpdate={handleUpdateProjectUpdates}
      />}
    </div>
  );
}

export default ProjectUpdates;
