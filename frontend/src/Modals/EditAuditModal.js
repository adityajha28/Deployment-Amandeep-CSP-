import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditAuditModal({ show, handleClose, AuditData, handleUpdate }) {
  const [updatedAudit, setUpdatedAudit] = useState({
    ...AuditData,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAudit({ ...updatedAudit, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedAudit);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Project Audit</h2>
        <form  onSubmit={handleSubmit}>
          <label>
            DateofAudit :
            </label>
            <input
              type="date"
              name="DateofAudit"
              value={updatedAudit.DateofAudit}
              onChange={handleInputChange}
            />
        
          <label>
          reviewedBy:
            </label>
            <input
              type="text"
              name="reviewedBy"
              value={updatedAudit.reviewedBy}
              onChange={handleInputChange}
            />
          
          <label>
          status:
            </label>
            <input
              type="text"
              name="status"
              value={updatedAudit.status}
              onChange={handleInputChange}
            />
            <label>
            reviewedSection:
            </label>
            <input
              type="text"
              name="reviewedSection"
              value={updatedAudit.reviewedSection}
              onChange={handleInputChange}
            />
            <label>
            reviewedSection:
            </label>
            <input
              type="date"
              name="reviewedSection"
              value={updatedAudit.reviewedSection}
              onChange={handleInputChange}
            />
            <label>
            Comments:
            </label>
            <input
              type="text"
              name="comment"
              value={updatedAudit.comment}
              onChange={handleInputChange}
            />

            <label>
            actionItem:
            </label>
            <input
              type="text"
              name="actionItem"
              value={updatedAudit.actionItem}
              onChange={handleInputChange}
            />
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditAuditModal;
