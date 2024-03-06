import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";

function Sprint({ projectId }) {
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

  const handleDownloadAsPdf = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/sprint/pdf`,
        SprintHistory,
        { responseType: "blob" } // Set response type to blob for downloading file
      );

      // Create a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the PDF Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", "SprintHistory.pdf");
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
      <button className="add-version-btn" onClick={handleAddNewSprint}>
        Add SprintDetails
      </button>
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
            <th>Actions</th>
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
              <td>
                {sprint.isEditing ? (
                  <button className="save-btn">Save</button>
                ) : (
                  <div className="edit-buttons">
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteSprint(sprint._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
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
