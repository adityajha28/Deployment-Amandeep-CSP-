import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import EditPhaseModal from '../Modals/EditPhaseModal';
import ExportAsPdf from "../Service/ExportAsPdf";

function Phases({ projectId }) {
  // console.log(`in versionhistory ${projectId}`)
  const [ProjectPhases, setPhase] = useState([]);
  const [newProjectPhase, setNewPhase] = useState({
            projectId: `${projectId}`,
            Title: "",
            startDate: "",
            completionDate: "",
            approvalDate: "",
            Status:"",
            RevisedDate:"",
            Comments:"",
            isEditing: false,
  });

  const [editPhases, setEditPhases] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProjectPhases = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/phases/${projectId}`
        );
        setPhase(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchProjectPhases();
  }, [projectId]);

  const handleAddNewPhase = () => {
    setNewPhase({ ...newProjectPhase, isEditing: true });
  };

  const handleSaveNewAudit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/phases`,
        newProjectPhase
      );
      setPhase([...ProjectPhases, newProjectPhase]);
      setNewPhase({
        projectId: `${projectId}`,
        Title: "",
        startDate: "",
        completionDate: "",
        approvalDate: "",
        Status: "",
        RevisedDate: "",
        Comments: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPhase({ ...newProjectPhase, [name]: value });
  };

  // deleting a version data from table
  const deletePhase = async (phaseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/phases/${phaseId}`);
      // Remove the deleted project from the project list
      setPhase(ProjectPhases.filter((Audit) => Audit._id !== phaseId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  
  const handleDownloadAsPdf = () => {
    const columns = [
      "Title",
      "startDate",
      "completionDate",
      "approvalDate",
      "Status",
      "RevisedDate",
      "Comments",
    ];
    ExportAsPdf(ProjectPhases, columns, "Project_Phases","Project Phases");
  };

  const handleEditPhase = (Phase) => {
    setEditPhases(Phase);
    setShowEditModal(true);
  };

  const handleUpdatePhase = async (updatedPhase) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/phases/${updatedPhase._id}`,
        updatedPhase
      );
      const updatedPhases = ProjectPhases.map((Phase) =>
      Phase._id === updatedPhase._id ? response.data : Phase
      );
      setPhase(updatedPhases);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <div>
      <div className="top-btns">
      <button className="add-version-btn" onClick={handleAddNewPhase}>
        Add Phase
      </button>
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Date</th>
            <th>Completion Date</th>
            <th>Approval Date</th>
            <th>Status</th>
            <th>RevisedCompletion Date</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ProjectPhases.map((projectphase, index) => (
            <tr key={index}>
              <td>{projectphase.Title}</td>
              <td>{projectphase.startDate}</td>
              <td>{projectphase.completionDate}</td>
              <td>{projectphase.approvalDate}</td>
              <td>{projectphase.Status}</td>
              <td>{projectphase.RevisedDate}</td>
              <td>{projectphase.Comments}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditPhase(projectphase)}>Edit</button>
                <button className="delete-btn" onClick={() => deletePhase(projectphase._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {newProjectPhase.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="Text"
                  name="Title"
                  value={newProjectPhase.Title}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="startDate"
                  value={newProjectPhase.startDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="completionDate"
                  value={newProjectPhase.completionDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="approvalDate"
                  value={newProjectPhase.approvalDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Status"
                  value={newProjectPhase.Status}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="RevisedDate"
                  value={newProjectPhase.RevisedDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Comments"
                  value={newProjectPhase.Comments}
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

      {showEditModal && <EditPhaseModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        PhaseData={editPhases}
        handleUpdate={handleUpdatePhase}
      />}
    </div>
  );
}

export default Phases;
