import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";

function AuditHistory({ projectId }) {
  // console.log(`in versionhistory ${projectId}`)
  const [AuditHistory, setAuditHistory] = useState([]);
  const [newAudit, setNewAudit] = useState({
    projectId: `${projectId}`,
    DateofAudit: "",
    reviewedBy: "",
    status: "",
    reviewedSection: "",
    comment: "",
    actionItem: "",
    isEditing: false,
  });

  const [editAudit, setEditAudit] = useState({
    _id: null,
    DateofAudit: "",
    reviewedBy: "",
    status: "",
    reviewedSection: "",
    comment: "",
    actionItem: "",
    isEditing: false,
  });

  useEffect(() => {
    const fetchAuditHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/audit-history/${projectId}`
        );
        setAuditHistory(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchAuditHistory();
  }, [projectId]);

  const handleAddNewAudit = () => {
    setNewAudit({ ...newAudit, isEditing: true });
  };

  const handleSaveNewAudit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/audit-history`,
        newAudit
      );
      setAuditHistory([...AuditHistory, newAudit]);
      setNewAudit({
        projectId: `${projectId}`,
        DateofAudit: "",
        reviewedBy: "",
        status: "",
        reviewedSection: "",
        comment: "",
        actionItem: "",
        isEditing: false,
      });

      await axios.post('http://localhost:5000/api/send-email', {
        subject: 'New Audit Added',
        text: 'A new audit has been added.',...newAudit
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleEditAudit = (audit) => {
    setEditAudit({ ...audit, isEditing: true });
  };

  const handleSaveEditedAudit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/audit-history/${editAudit._id}`,
        editAudit
      );
      const updatedAuditHistory = AuditHistory.map((audit) =>
        audit._id === editAudit._id ? editAudit : audit
      );
      setAuditHistory(updatedAuditHistory);
      setEditAudit({
        _id: null,
        DateofAudit: "",
        reviewedBy: "",
        status: "",
        reviewedSection: "",
        comment: "",
        actionItem: "",
        isEditing: false,
      });
    } catch (error) {
      console.error("Error saving edited version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAudit({ ...newAudit, [name]: value });
  };

  // deleting a version data from table
  const deleteAudit = async (auditId) => {
    try {
      await axios.delete(`http://localhost:5000/api/audit-history/${auditId}`);
      // Remove the deleted project from the project list
      setAuditHistory(AuditHistory.filter((Audit) => Audit._id !== auditId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/audit-history/pdf`,
        AuditHistory,
        { responseType: "blob" } // Set response type to blob for downloading file
      );

      // Create a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the PDF Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = pdfUrl;
      tempLink.setAttribute("download", "audit_history.pdf");
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
        Add Audit
      </button>
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>
      <table className="version-history-table">
        <thead>
          <tr>
            <th>DateofAudit</th>
            <th>reviewedBy</th>
            <th>status</th>
            <th>reviewedSection</th>
            <th>Comments</th>
            <th>Action Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {AuditHistory.map((audit, index) => (
            <tr key={index}>
              <td>{audit.DateofAudit}</td>
              <td>{audit.reviewedBy}</td>
              <td>{audit.status}</td>
              <td>{audit.reviewedSection}</td>
              <td>{audit.comment}</td>
              <td>{audit.actionItem}</td>
              <td>
              {audit._id === editAudit._id && editAudit.isEditing ? (
                  <button
                    className="save-btn"
                    onClick={handleSaveEditedAudit}
                  >
                    Save
                  </button>
                )  : (
                  <div className="edit-buttons">
                    <button className="edit-btn" onClick={() => handleEditAudit(audit)}>Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteAudit(audit._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {newAudit.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="DateofAudit"
                  value={newAudit.DateofAudit}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="reviewedBy"
                  value={newAudit.reviewedBy}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="status"
                  value={newAudit.status}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="reviewedSection"
                  value={newAudit.reviewedSection}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="comment"
                  value={newAudit.comment}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="actionItem"
                  value={newAudit.actionItem}
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

export default AuditHistory;
