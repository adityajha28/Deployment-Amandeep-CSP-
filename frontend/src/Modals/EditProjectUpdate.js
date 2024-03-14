import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditProjectUpdate({ show, handleClose, ProjectUpdate, handleUpdate }) {
  const [updatedProjectUpdate, setUpdatedProjectUpdate] = useState({
    ...ProjectUpdate,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProjectUpdate({ ...updatedProjectUpdate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedProjectUpdate);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Project Update</h2>
        <form  onSubmit={handleSubmit}>
          <label>
            Date:
            </label>
            <input
              type="date"
              name="date"
              value={updatedProjectUpdate.date}
              onChange={handleInputChange}
            />
        
          <label>
            General Updates:
            </label>
            <input
              type="text"
              name="generalUpdates"
              value={updatedProjectUpdate.generalUpdates}
              onChange={handleInputChange}
            />
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProjectUpdate;
