import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditBudgetModal({ show, handleClose, budgetData, handleUpdate }) {
  const [updatedBudget, setUpdatedBudget] = useState({
    ...budgetData,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBudget({ ...updatedBudget, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedBudget);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Project Budget</h2>
        <form  onSubmit={handleSubmit}>
          <label>
            Project Type:
            </label>
            <input
              type="text"
              name="projectType"
              value={updatedBudget.projectType}
              onChange={handleInputChange}
            />
        
          <label>
            Duration in Months:
            </label>
            <input
              type="number"
              name="Duration"
              value={updatedBudget.Duration}
              onChange={handleInputChange}
            />
          
          <label>
            Budgeted Hours:
            </label>
            <input
              type="number"
              name="budgetHours"
              value={updatedBudget.budgetHours}
              onChange={handleInputChange}
            />
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditBudgetModal;
