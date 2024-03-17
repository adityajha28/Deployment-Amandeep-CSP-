import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import EditStakeHolderModal from "../Modals/EditStakeHolderModal";
import ExportAsPdf from "../Service/ExportAsPdf";

function StakeHolder({ projectId,role }) {
  // console.log(`in versionhistory ${projectId}`)
  const [StakeHolders, setStakeHolder] = useState([]);
  const [newStakeHolder, setNewStakeHolder] = useState({
    projectId: `${projectId}`,
    Title: "",
    Name: "",
    Contact: "",
    isEditing: false,
  });

  const [editStakeHolder, setEditStakeHolder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchBudgetHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/stakeholders/${projectId}`
        );
        setStakeHolder(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchBudgetHistory();
  }, [projectId]);

  const handleAddNewStakeHolder = () => {
    setNewStakeHolder({ ...newStakeHolder, isEditing: true });
  };

  const handleSaveNewStakeHolder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/stakeholders`,
        newStakeHolder
      );
      setStakeHolder([...StakeHolders, newStakeHolder]);
      setNewStakeHolder({
        projectId: `${projectId}`,
        Title: "",
        Name: "",
        Contact: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStakeHolder({ ...newStakeHolder, [name]: value });
  };

  // deleting a version data from table
  const deleteStakeHolder = async (auditId) => {
    try {
      await axios.delete(`http://localhost:5000/api/stakeholders/${auditId}`);
      // Remove the deleted project from the project list
      setStakeHolder(StakeHolders.filter((budget) => budget._id !== auditId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = () => {
    const columns = [
      "Title",
      "Name",
      "Contact",
    ];
    ExportAsPdf(StakeHolders, columns, "Stake_holders", "Stake Holders");
  };

  const handleEditStakeHolder = (stakeholder) => {
    setEditStakeHolder(stakeholder);
    setShowEditModal(true);
  };

  const handleUpdateStakeHolder = async (updatedStake) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/stakeholders/${updatedStake._id}`,
        updatedStake
      );
      const updatedStakeHolder = StakeHolders.map((stake) =>
      stake._id === updatedStake._id ? response.data : stake
      );
      setStakeHolder(updatedStakeHolder);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating version:", error);
    }
  };



  return (
    <div>
      <div className="top-btns">
      {(role==="Admin" || role==="Auditor" || role==="Project Manager") && ( <button className="add-version-btn" onClick={handleAddNewStakeHolder}>
        Add StakeHolder
      </button>)}
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {StakeHolders.map((stakeHolder, index) => (
            <tr key={index}>
              <td>{stakeHolder.Title}</td>
              <td>{stakeHolder.Name}</td>
              <td>{stakeHolder.Contact}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditStakeHolder(stakeHolder)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteStakeHolder(stakeHolder._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {newStakeHolder.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Title"
                  value={newStakeHolder.Title}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Name"
                  value={newStakeHolder.Name}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="Contact"
                  value={newStakeHolder.Contact}
                  onChange={handleInputChange}
                />
              </td>
              
              <td>
                <button onClick={handleSaveNewStakeHolder} className="save-btn">
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showEditModal && <EditStakeHolderModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        StakeHolderData={editStakeHolder}
        handleUpdate={handleUpdateStakeHolder}
      />}

    </div>
  );
}

export default StakeHolder;
