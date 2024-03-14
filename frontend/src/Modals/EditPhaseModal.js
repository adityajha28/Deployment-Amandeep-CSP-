import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditPhaseModal({ show, handleClose, PhaseData, handleUpdate }) {
  const [updatedPhase, setUpdatedPhase] = useState({
    ...PhaseData,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPhase({ ...updatedPhase, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedPhase);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Project Phase</h2>
        <form  onSubmit={handleSubmit}>
          <label>
            Title :
            </label>
            <input
              type="text"
              name="Title"
              value={updatedPhase.Title}
              onChange={handleInputChange}
            />
        
          <label>
          startDate:
            </label>
            <input
              type="date"
              name="startDate"
              value={updatedPhase.startDate}
              onChange={handleInputChange}
            />
          
          <label>
          completionDate:
            </label>
            <input
              type="date"
              name="completionDate"
              value={updatedPhase.completionDate}
              onChange={handleInputChange}
            />
            <label>
            approvalDate:
            </label>
            <input
              type="date"
              name="approvalDate"
              value={updatedPhase.approvalDate}
              onChange={handleInputChange}
            />
            <label>
            Status:
            </label>
            <input
              type="text"
              name="Status"
              value={updatedPhase.Status}
              onChange={handleInputChange}
            />
            <label>
            RevisedDate:
            </label>
            <input
              type="date"
              name="RevisedDate"
              value={updatedPhase.RevisedDate}
              onChange={handleInputChange}
            />
            <label>
            Comments:
            </label>
            <input
              type="text"
              name="Comments"
              value={updatedPhase.Comments}
              onChange={handleInputChange}
            />
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditPhaseModal;
