import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import EditAuditModal from "../Modals/EditAuditModal";
import ExportAsPdf from "../Service/ExportAsPdf";
import {toast} from 'react-toastify';


function AuditHistory({ projectId ,role}) {
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

  const [editAudit, setEditAudit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


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

  console.log(AuditHistory);


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
        projectId:{projectId},
        subject: 'New Audit Added',
        text: 'A new audit has been added.',...newAudit
      });
      toast.success("Email sent to Client for new Audit");
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };


  // const handleSaveEditedAudit = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/audit-history/${editAudit._id}`,
  //       editAudit
  //     );
  //     const updatedAuditHistory = AuditHistory.map((audit) =>
  //       audit._id === editAudit._id ? editAudit : audit
  //     );
  //     setAuditHistory(updatedAuditHistory);
  //     setEditAudit({
  //       _id: null,
  //       DateofAudit: "",
  //       reviewedBy: "",
  //       status: "",
  //       reviewedSection: "",
  //       comment: "",
  //       actionItem: "",
  //       isEditing: false,
  //     });
  //   } catch (error) {
  //     console.error("Error saving edited version:", error);
  //   }
  // };

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

  const handleDownloadAsPdf = () => {
    const columns = [
      "DateofAudit",
      "reviewedBy",
      "status",
      "reviewedSection",
      "comment",
      "actionItem",
    ];
    ExportAsPdf(AuditHistory, columns, "audit_history","Audit History");
  };

  const handleEditAudit = (audit) => {
    setEditAudit(audit);
    setShowEditModal(true);
  };

  const handleUpdateAudit = async (updatedAudit) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/audit-history/${updatedAudit._id}`,
        updatedAudit
      );
      const updatedAudits = AuditHistory.map((audit) =>
      audit._id === updatedAudit._id ? response.data : audit
      );
      setAuditHistory(updatedAudits);
      setShowEditModal(false);
      await axios.post('http://localhost:5000/api/send-email', {
        projectId:{projectId},
        subject: 'Audit Updated',
        text: 'A audit has been Updates.',...updatedAudit
      });

      toast.success("Email sent to Client for updated Audit");

      
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };



  return (
    <div>
    <div className="top-btns">
      {(role==="Admin" || role==="Auditor" || role==="Project Manager") && ( <button className="add-version-btn" onClick={handleAddNewAudit}>
        Add Audit
      </button>)}
     
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
                <button className="edit-btn" onClick={() => handleEditAudit(audit)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteAudit(audit._id)}>Delete</button>
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

      {showEditModal && <EditAuditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        AuditData={editAudit}
        handleUpdate={handleUpdateAudit}
      />}
    </div>
  );
}

export default AuditHistory;
