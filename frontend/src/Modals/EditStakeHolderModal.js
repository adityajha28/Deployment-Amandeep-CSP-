import React, { useState } from "react";
import '../Styles/EditModal.css';

function EditStakeHolderModal({ show, handleClose, StakeHolderData, handleUpdate }) {
  const [updatedStakeHolder, setUpdatedStake] = useState({
    ...StakeHolderData,
    isEditing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStake({ ...updatedStakeHolder, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedStakeHolder);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 className="Heading">Edit Stake Holder</h2>
        <form  onSubmit={handleSubmit}>
          <label>
          Title :
            </label>
            <input
              type="text"
              name="Title"
              value={updatedStakeHolder.Title}
              onChange={handleInputChange}
            />
        
          <label>
          Name:
            </label>
            <input
              type="text"
              name="Name"
              value={updatedStakeHolder.Name}
              onChange={handleInputChange}
            />
          
          <label>
          Contact:
            </label>
            <input
              type="text"
              name="Contact"
              value={updatedStakeHolder.Contact}
              onChange={handleInputChange}
            />
            
         
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditStakeHolderModal;
