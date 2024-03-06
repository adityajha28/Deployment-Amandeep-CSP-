import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";

function StakeHolder({ projectId }) {
  // console.log(`in versionhistory ${projectId}`)
  const [StakeHolders, setStakeHolder] = useState([]);
  const [newStakeHolder, setNewStakeHolder] = useState({
    projectId: `${projectId}`,
    Title: "",
    Name: "",
    Contact: "",
    isEditing: false,
  });

  useEffect(() => {
    const fetchBudgetHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/stakeholders/${projectId}`
        );
        setStakeHolder(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchBudgetHistory();
  }, [projectId]);

  const handleAddNewAudit = () => {
    setNewStakeHolder({ ...newStakeHolder, isEditing: true });
  };

  const handleSaveNewStakeHolder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/stakeholders`,
        newStakeHolder
      );
      setStakeHolder([...StakeHolders, newStakeHolder]);
      setNewStakeHolder({
        projectId: `${projectId}`,
        Title: "",
        Name: "",
        Contact: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStakeHolder({ ...newStakeHolder, [name]: value });
  };

  // deleting a version data from table
  const deleteStakeHolder = async (auditId) => {
    try {
      await axios.delete(`http://localhost:5000/api/stakeholders/${auditId}`);
      // Remove the deleted project from the project list
      setStakeHolder(StakeHolders.filter((budget) => budget._id !== auditId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/stakeholder/pdf`,
        StakeHolders,
        { responseType: "blob" } // Set response type to blob for downloading file
      );

      // Create a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the PDF Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", "StakeHolder.pdf");
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
        Add StakeHolder
      </button>
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Budgeted Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {StakeHolders.map((stakeHolder, index) => (
            <tr key={index}>
              <td>{stakeHolder.Title}</td>
              <td>{stakeHolder.Name}</td>
              <td>{stakeHolder.Contact}</td>
              <td>
                {stakeHolder.isEditing ? (
                  <button className="save-btn">Save</button>
                ) : (
                  <div className="edit-buttons">
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteStakeHolder(stakeHolder._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {newStakeHolder.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Title"
                  value={newStakeHolder.Title}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Name"
                  value={newStakeHolder.Name}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Contact"
                  value={newStakeHolder.Contact}
                  onChange={handleInputChange}
                />
              </td>
              
              <td>
                <button onClick={handleSaveNewStakeHolder} className="save-btn">
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

export default StakeHolder;
