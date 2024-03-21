import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import EditAuditModal from "../Modals/EditAuditModal";
import ExportAsPdf from "../Service/ExportAsPdf";

function ClientFeedback({ projectId,role}) {
  // console.log(`in versionhistory ${projectId}`)
  const [ClientFeedback, setClientFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    projectId: `${projectId}`,
    feedbackType: "",
    dateReceived: "",
    detailedFeedback: "",
    actionTaken: "",
    closureDate: "",
    isEditing: false,
  });

  const [editAudit, setEditAudit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => { 
    const fetchAuditHistory = async () => {
      try {
        const response = await axios.get(
          `http://3.108.217.170:5000/api/client-feedback/${projectId}`
        );
        setClientFeedback(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchAuditHistory();
  }, [projectId]);

//   console.log(AuditHistory);


  const handleAddNewFeedback = () => {
    setNewFeedback({ ...newFeedback, isEditing: true });
  };

  const handleSaveNewAudit = async () => {
    try {
      const response = await axios.post(
        `http://3.108.217.170:5000/api/client-feedback`,
        newFeedback
      );
      setClientFeedback([...ClientFeedback, newFeedback]);
      setNewFeedback({
        projectId: `${projectId}`,
        feedbackType: "",
        dateReceived: "",
        detailedFeedback:"",
        actionTaken: "",
        closureDate: "",
        isEditing: false,
      });

      await axios.post('http://3.108.217.170:5000/api/send-email', {
        subject: 'New Audit Added',
        text: 'A new audit has been added.',...newFeedback
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  // deleting a version data from table
  const deleteAudit = async (auditId) => {
    try {
      await axios.delete(`http://3.108.217.170:5000/api/client-feedback/${auditId}`);
      // Remove the deleted project from the project list
      setClientFeedback(ClientFeedback.filter((Audit) => Audit._id !== auditId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = () => {
    const columns = [
      "feedbackType",
      "dateReceived",
      "detailedFeedback",
      "actionTaken",
      "closureDate",
    ];
    ExportAsPdf(ClientFeedback, columns, "Client_Feedback","Client Feedback");
  };

  

  const handleEditFeedback = (audit) => {
    setEditAudit(audit);
    setShowEditModal(true);
  };

  const handleUpdateFeedback = async (updatedAudit) => {
    try {
      const response = await axios.put(
        `http://3.108.217.170:5000/api/client-feedback/${updatedAudit._id}`,
        updatedAudit
      );
      const updatedAudits = ClientFeedback.map((audit) =>
      audit._id === updatedAudit._id ? response.data : audit
      );
      setClientFeedback(updatedAudits);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };



  return (
    <div>
    <div className="top-btns">
    {(role==="Admin"  || role==="Project Manger") && ( <button className="add-version-btn" onClick={handleAddNewFeedback}>
        Add ClientFeedback
      </button>)}
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>
      <table className="version-history-table">
        <thead>
          <tr>
            <th>feedbackType</th>
            <th>dateReceived</th>
            <th>detailedFeedback</th>
            <th>actionTaken</th>
            <th>closureDate</th>
            {(role==="Admin" || role==="Project Manger") &&(<th>Actions</th>)}
          </tr>
        </thead>
        <tbody>
          {ClientFeedback.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.feedbackType}</td>
              <td>{feedback.dateReceived}</td>
              <td>{feedback.detailedFeedback}</td>
              <td>{feedback.actionTaken}</td>
              <td>{feedback.closureDate}</td>
              {(role==="Admin" || role=="Project Manger") && ( <td>
                {/* <button className="edit-btn" onClick={() => handleEditFeedback(feedback)}>Edit</button> */}
                <button className="delete-btn" onClick={() => deleteAudit(feedback._id)}>Delete</button>
              </td>)}
             
            </tr>
          ))}
          {newFeedback.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="feedbackType"
                  value={newFeedback.feedbackType}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="dateReceived"
                  value={newFeedback.dateReceived}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="detailedFeedback"
                  value={newFeedback.detailedFeedback}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="actionTaken"
                  value={newFeedback.actionTaken}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="closureDate"
                  value={newFeedback.closureDate}
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
        handleUpdate={handleUpdateFeedback}
      />}
    </div>
  );
}

export default ClientFeedback;
