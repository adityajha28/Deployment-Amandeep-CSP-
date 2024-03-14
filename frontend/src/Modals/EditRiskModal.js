import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditAuditModal({ show, handleClose, RiskData, handleUpdate }) {
  const [updatedRisk, setUpdatedRisk] = useState({
    ...RiskData,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRisk({ ...updatedRisk, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedRisk);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Project Version</h2>
        <form  onSubmit={handleSubmit}>
          <label>
          RiskType :
            </label>
            <input
              type="text"
              name="RiskType"
              value={updatedRisk.RiskType}
              onChange={handleInputChange}
            />
        
          <label>
          Description:
            </label>
            <input
              type="text"
              name="Description"
              value={updatedRisk.Description}
              onChange={handleInputChange}
            />
          
          <label>
          Severity:
            </label>
            <input
              type="text"
              name="Severity"
              value={updatedRisk.Severity}
              onChange={handleInputChange}
            />
            <label>
            Impact:
            </label>
            <input
              type="text"
              name="Impact"
              value={updatedRisk.Impact}
              onChange={handleInputChange}
            />
            <label>
            RemedialSteps:
            </label>
            <input
              type="text"
              name="RemedialSteps"
              value={updatedRisk.RemedialSteps}
              onChange={handleInputChange}
            />
            <label>
            Status:
            </label>
            <input
              type="date"
              name="Status"
              value={updatedRisk.Status}
              onChange={handleInputChange}
            />

            <label>
            closureDate:
            </label>
            <input
              type="date"
              name="closureDate"
              value={updatedRisk.closureDate}
              onChange={handleInputChange}
            />
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditAuditModal;
