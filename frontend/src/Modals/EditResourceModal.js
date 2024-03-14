import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditResourceModal({ show, handleClose, ResourceData, handleUpdate }) {
  const [updatedResource, setUpdatedResource] = useState({
    ...ResourceData,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedResource({ ...updatedResource, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedResource);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Project Resource</h2>
        <form  onSubmit={handleSubmit}>
          <label>
          ResourceName :
            </label>
            <input
              type="text"
              name="resourceName"
              value={updatedResource.resourceName}
              onChange={handleInputChange}
            />
        
          <label>
          role:
            </label>
            <input
              type="text"
              name="role"
              value={updatedResource.role}
              onChange={handleInputChange}
            />
          
          <label>
          startDate:
            </label>
            <input
              type="date"
              name="startDate"
              value={updatedResource.startDate}
              onChange={handleInputChange}
            />
            <label>
            endDate:
            </label>
            <input
              type="date"
              name="endDate"
              value={updatedResource.endDate}
              onChange={handleInputChange}
            />
            <label>
            comment:
            </label>
            <input
              type="text"
              name="comment"
              value={updatedResource.comment}
              onChange={handleInputChange}
            />
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditResourceModal;
