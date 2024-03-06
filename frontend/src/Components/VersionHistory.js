import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/VersionHistory.css';

function VersionHistory({ projectId }) {
  // console.log(`in versionhistory ${projectId}`)
  const [versionHistory, setVersionHistory] = useState([]);
  const [newVersion, setNewVersion] = useState({
    version: "",
    projectId: `${projectId}`,
    Type: "",
    Change: "",
    ChangeReason: "",
    createdBy: "",
    revisionDate: "",
    approvalDate: "",
    approvedBy: "",
    isEditing: false,
  });

  useEffect(() => {
    const fetchVersionHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/version-history/${projectId}`
        );
        setVersionHistory(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchVersionHistory();
  }, [projectId]);

  const handleAddNewVersion = () => {
    setNewVersion({ ...newVersion, isEditing: true });
  };

  const handleSaveNewVersion = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/version-history`,
        newVersion
      );
      setVersionHistory([...versionHistory, newVersion]);
      setNewVersion({
        version: "",
        projectId: `${projectId}`,
        Type: "",
        change: "",
        changeReason: "",
        createdBy: "",
        revisionDate: "",
        approvalDate: "",
        approvedBy: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVersion({ ...newVersion, [name]: value });
  };

  // deleting a version data from table
  const deleteVersion = async (versionId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/version-history/${versionId}`
      );
      // Remove the deleted project from the project list
      setVersionHistory(
        versionHistory.filter((version) => version._id !== versionId)
      );
    } catch (error) {
      console.error("Error deleting version:", error);
    }
  };
  const handleDownloadAsPdf = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/version-history/pdf`,
        versionHistory,
        { responseType: "blob" } // Set response type to blob for downloading file
      );

      // Create a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the PDF Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", "version_history.pdf");
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
      <button className="add-version-btn" onClick={handleAddNewVersion}>Add Version</button>
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>
      <table className="version-history-table">
        <thead>
          <tr>
            <th>Version</th>
            <th>Type</th>
            <th>Change</th>
            <th>Change Reason</th>
            <th>Created By</th>
            <th>Revision Date</th>
            <th>Approval Date</th>
            <th>Approved By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {versionHistory.map((version, index) => (
            <tr key={index}>
              <td>{version.version}</td>
              <td>{version.Type}</td>
              <td>{version.change}</td>
              <td>{version.changeReason}</td>
              <td>{version.createdBy}</td>
              <td>{version.revisionDate}</td>
              <td>{version.approvalDate}</td>
              <td>{version.approvedBy}</td>
              <td>
                {version.isEditing ? (
                  <button className="save-btn">Save</button>
                ) : (
                  <div className="edit-buttons">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={() => deleteVersion(version._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {newVersion.isEditing && (
            <tr>
              <td>
                <input className="inputfield"
                  type="text"
                  name="version"
                  value={newVersion.version}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input className="inputfield"
                  type="text"
                  name="Type"
                  value={newVersion.Type}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input className="inputfield"
                  type="text"
                  name="change"
                  value={newVersion.change}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input className="inputfield"
                  type="text"
                  name="changeReason"
                  value={newVersion.changeReason}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input className="inputfield"
                  type="text"
                  name="createdBy"
                  value={newVersion.createdBy}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input className="inputfield"
                  type="date"
                  name="revisionDate"
                  value={newVersion.revisionDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input className="inputfield"
                  type="date"
                  name="approvalDate"
                  value={newVersion.approvalDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input className="inputfield"
                  type="text"
                  name="approvedBy"
                  value={newVersion.approvedBy}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button onClick={handleSaveNewVersion} className="save-btn">Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VersionHistory;
