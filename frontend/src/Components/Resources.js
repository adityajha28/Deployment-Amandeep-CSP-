import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import EditResourceModal from '../Modals/EditResourceModal';
import ExportAsPdf from "../Service/ExportAsPdf";

function Resources({ projectId,role }) {
  // console.log(`in versionhistory ${projectId}`)
  const [ProjectResources, setResources] = useState([]);
  const [newProjectResource, setNewResource] = useState({
            projectId: `${projectId}`,
            resourceName: "",
            role: "",
            startDate: "",
            endDate: "",
            comment: "",
            isEditing: false,
  });

  const [editResources, setEditResources] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProjectResources = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/resources/${projectId}`
        );
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchProjectResources();
  }, [projectId]);

  const handleAddNewResource = () => {
    setNewResource({ ...newProjectResource, isEditing: true });
  };

  const handleSaveNewResource = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/resources`,
        newProjectResource
      );
      setResources([...ProjectResources, newProjectResource]);
      setNewResource({
        projectId: `${projectId}`,
        resourceName: "",
        role: "",
        startDate: "",
        endDate: "",
        comment: "",
        isEditing: false,
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newProjectResource, [name]: value });
  };

  // deleting a resource data from table
  const deleteResource = async (resourceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/${resourceId}`);
      // Remove the deleted project from the project list
      setResources(ProjectResources.filter((resource) => resource._id !== resourceId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  
  const handleDownloadAsPdf = () => {
    const columns = [
      "resourceName",
      "role",
      "startDate",
      "endDate",
      "comment",
    ];
    ExportAsPdf(ProjectResources, columns, "Project_Resources", "Project Resources");
  };

  const handleEditResource = (resource) => {
    setEditResources(resource);
    setShowEditModal(true);
  };

  const handleUpdateResource = async (updatedResource) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/resources/${updatedResource._id}`,
        updatedResource
      );
      const updatedResources = ProjectResources.map((resource) =>
      resource._id === updatedResource._id ? response.data : resource
      );
      setResources(updatedResources);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <div>
      <div className="top-btns">
      {(role==="Admin"  || role==="Project Manger")  &&( <button className="add-version-btn" onClick={handleAddNewResource}>
        Add Resource
      </button>)}
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>

      <table className="version-history-table">
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Comment</th>
            {(role==="Admin"||role==="Project Manger") && (<th>Actions</th>)}
          </tr>
        </thead>
        <tbody>
          {ProjectResources.map((projectresource, index) => (
            <tr key={index}>
              <td>{projectresource.resourceName}</td>
              <td>{projectresource.role}</td>
              <td>{projectresource.startDate}</td>
              <td>{projectresource.endDate}</td>
              <td>{projectresource.comment}</td>
              {(role=="Admin" || role==="Project Manger")&&(<td>
                <button className="edit-btn" onClick={() => handleEditResource(projectresource)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteResource(projectresource._id)}>Delete</button>
              </td>)}
            </tr>
          ))}
          {newProjectResource.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="Text"
                  name="resourceName"
                  value={newProjectResource.resourceName}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="role"
                  value={newProjectResource.role}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="startDate"
                  value={newProjectResource.startDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="endDate"
                  value={newProjectResource.endDate}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="comment"
                  value={newProjectResource.comment}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button onClick={handleSaveNewResource} className="save-btn">
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showEditModal && <EditResourceModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        ResourceData={editResources}
        handleUpdate={handleUpdateResource}
      />}
    </div>
  );
}

export default Resources;
