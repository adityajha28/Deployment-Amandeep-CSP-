import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import ExportAsPdf from "../Service/ExportAsPdf";

function Sprint({ projectId,role }) {
  // console.log(`in versionhistory ${projectId}`)
  const [SprintHistory, setSprintHistory] = useState([]);
  const [newSprint, setNewSprint] = useState({
    projectId: `${projectId}`,
    sprint: "",
    startDate:"",
    EndDate:"" ,
    Status:"",
    Comments:"",
    isEditing: false
  });

  useEffect(() => {
    const fetchAuditHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sprints/${projectId}`
        );
        setSprintHistory(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchAuditHistory();
  }, [projectId]);

  const handleAddNewSprint = () => {
    setNewSprint({ ...newSprint, isEditing: true });
  };

  const handleSaveNewSprint = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/sprints`,
        newSprint
      );
      setSprintHistory([...SprintHistory, newSprint]);
      setNewSprint({
        projectId: `${projectId}`,
        sprint: "",
        startDate: "",
        Status: "",
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
    setNewSprint({ ...newSprint, [name]: value });
  };

  // deleting a version data from table
  const deleteSprint = async (auditId) => {
    try {
      await axios.delete(`http://localhost:5000/api/sprints/${auditId}`);
      // Remove the deleted project from the project list
      setSprintHistory(SprintHistory.filter((Audit) => Audit._id !== auditId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = () => {
    const columns = [
      "sprint",
      "startDate",
      "EndDate",
      "Status",
      "Comments",
    ];
    ExportAsPdf(SprintHistory, columns, "Sprint_History", "Sprint Details");
  };

  return (
    <div>
      <div className="top-btns">
        {(role==="Admin" || role==="Project Manager") && (<button className="add-version-btn" onClick={handleAddNewSprint}>
        Add SprintDetails
      </button>)}
      
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Comments</th>
            {(role==="Admin" || role==="Project Manager") && (<th>Actions</th>)}
          </tr>
        </thead>
        <tbody>
          {SprintHistory.map((sprint, index) => (
            <tr key={index}>
              <td>{sprint.sprint}</td>
              <td>{sprint.startDate}</td>
              <td>{sprint.EndDate}</td>
              <td>{sprint.Status}</td>
              <td>{sprint.Comments}</td>
              {(role==="Admin" || role==="Project Manager") &&(<td>
                {sprint.isEditing ? (
                  <button className="save-btn">Save</button>
                ) : (
                  <div className="edit-buttons">
                    {/* <button className="edit-btn">Edit</button> */}
                    <button
                      className="delete-btn"
                      onClick={() => deleteSprint(sprint._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>)}
            </tr>
          ))}
          {newSprint.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="sprint"
                  value={newSprint.sprint}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="startDate"
                  value={newSprint.startDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="EndDate"
                  value={newSprint.EndDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Status"
                  value={newSprint.Status}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Comments"
                  value={newSprint.Comments}
                  onChange={handleInputChange}
                />
              </td>
            
              <td>
                <button onClick={handleSaveNewSprint} className="save-btn">
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

export default Sprint;
