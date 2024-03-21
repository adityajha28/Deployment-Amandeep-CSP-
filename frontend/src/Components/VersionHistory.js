import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import EditVersionModal from "../Modals/EditVersionModal";
import ExportAsPdf from "../Service/ExportAsPdf";

function VersionHistory({ projectId,role}) {
  // console.log(`in versionhistory ${projectId}`)
  const [versionHistory, setVersionHistory] = useState([]);
  const [newVersion, setNewVersion] = useState({
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

  const [editVersion, setEditVersion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchVersionHistory = async () => {
      try {
        const response = await axios.get(
          `http://3.108.217.170:5000/api/version-history/${projectId}`
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
        `http://3.108.217.170:5000/api/version-history`,
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
        `http://3.108.217.170:5000/api/version-history/${versionId}`
      );
      // Remove the deleted project from the project list
      setVersionHistory(
        versionHistory.filter((version) => version._id !== versionId)
      );
    } catch (error) {
      console.error("Error deleting version:", error);
    }
  };

  const handleDownloadAsPdf = () => {
    const columns = [
      "version",
      "Type",
      "change",
      "changeReason",
      "createdBy",
      "revisionDate",
      "approvalDate",
      "approvedBy",
    ];
    ExportAsPdf(versionHistory, columns, "Version_History", "Version History");
  };

  const handleEditVersion = (Version) => {
    setEditVersion(Version);
    setShowEditModal(true);
  };

  const handleUpdateVersion = async (updatedVersion) => {
    try {
      const response = await axios.put(
        `http://3.108.217.170:5000/api/version-history/${updatedVersion._id}`,
        updatedVersion
      );
      const updatedVersions = versionHistory.map((Version) =>
        Version._id === updatedVersion._id ? response.data : Version
      );
      setVersionHistory(updatedVersions);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating version:", error);
    }
  };

  return (
    <div>
      <div className="top-btns">
        {(role === "Admin" || role === "Project Manger") && (
          <button className="add-version-btn" onClick={handleAddNewVersion}>
            Add Version
          </button>
        )}
        <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>
          Download As PDF
        </button>
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
            {(role==="Admin" || role==="Project Manger")&&(<th>Actions</th>)}
          </tr>
        </thead>
        <tbody>
          {versionHistory.map((Version, index) => (
            <tr key={index}>
              <td>{Version.version}</td>
              <td>{Version.Type}</td>
              <td>{Version.change}</td>
              <td>{Version.changeReason}</td>
              <td>{Version.createdBy}</td>
              <td>{Version.revisionDate}</td>
              <td>{Version.approvalDate}</td>
              <td>{Version.approvedBy}</td>
              {(role==="Admin" || role==="Project Manger")&& (<td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditVersion(Version)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteVersion(Version._id)}
                >
                  Delete
                </button>
              </td>)}
            </tr>
          ))}
          {newVersion.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="version"
                  value={newVersion.version}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Type"
                  value={newVersion.Type}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="change"
                  value={newVersion.change}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="changeReason"
                  value={newVersion.changeReason}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="createdBy"
                  value={newVersion.createdBy}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="revisionDate"
                  value={newVersion.revisionDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="approvalDate"
                  value={newVersion.approvalDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="approvedBy"
                  value={newVersion.approvedBy}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button onClick={handleSaveNewVersion} className="save-btn">
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showEditModal && (
        <EditVersionModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          VersionData={editVersion}
          handleUpdate={handleUpdateVersion}
        />
      )}
    </div>
  );
}

export default VersionHistory;
