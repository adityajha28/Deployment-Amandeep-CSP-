import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditAuditModal({ show, handleClose, VersionData, handleUpdate }) {
  const [updatedVersion, setUpdatedVersion] = useState({
    ...VersionData,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVersion({ ...updatedVersion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedVersion);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Project Version</h2>
        <form  onSubmit={handleSubmit}>
          <label>
            version :
            </label>
            <input
              type="text"
              name="version"
              value={updatedVersion.version}
              onChange={handleInputChange}
            />
        
          <label>
            Type:
            </label>
            <input
              type="text"
              name="Type"
              value={updatedVersion.Type}
              onChange={handleInputChange}
            />
          
          <label>
          change:
            </label>
            <input
              type="text"
              name="change"
              value={updatedVersion.change}
              onChange={handleInputChange}
            />
            <label>
            changeReason:
            </label>
            <input
              type="text"
              name="changeReason"
              value={updatedVersion.changeReason}
              onChange={handleInputChange}
            />
            <label>
            createdBy:
            </label>
            <input
              type="text"
              name="createdBy"
              value={updatedVersion.createdBy}
              onChange={handleInputChange}
            />
            <label>
            revisionDate:
            </label>
            <input
              type="date"
              name="revisionDate"
              value={updatedVersion.revisionDate}
              onChange={handleInputChange}
            />

            <label>
            approvalDate:
            </label>
            <input
              type="date"
              name="approvalDate"
              value={updatedVersion.approvalDate}
              onChange={handleInputChange}
            />

            <label>
            approvedBy:
            </label>
            <input
              type="text"
              name="approvedBy"
              value={updatedVersion.approvedBy}
              onChange={handleInputChange}
            />
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditAuditModal;
