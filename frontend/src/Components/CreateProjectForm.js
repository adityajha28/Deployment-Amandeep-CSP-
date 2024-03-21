import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/CreateProject.css";

function CreateProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    projectManagerName: '',
    status: 'Ongoing',
    clientName: '',
    clientEmail: '',
    description: '',
    totalBudget: '',
    projectMembers: 0
  });

  const navigate = useNavigate();

  const handlename = (e) => {
    setFormData({ ...formData, name: e.target.value });
  }

  const handleProjectManager = (e) => {
    setFormData({ ...formData, projectManagerName: e.target.value });
  }

  const handleClientName = (e) => {
    setFormData({ ...formData, clientName: e.target.value });
  }

  const handleClientEmail = (e) => {
    setFormData({ ...formData, clientEmail: e.target.value });
  }

  const handleMembers = (e) => {
    setFormData({ ...formData, projectMembers: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post('http://3.108.217.170:5000/api/projects', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <form className="create-project-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="projectName">Project Name:</label>
        <input type="text" id="name" name="name" value={formData.projectName} onChange={handlename} required />
      </div>
      <div className="form-group">
        <label htmlFor="projectManager">Project Manager:</label>
        <input type="text" id="projectManagerName" name="projectManagerName" value={formData.projectManager} onChange={handleProjectManager} required />
      </div>
      <div className="form-group">
        <label htmlFor="clientName">Client Name:</label>
        <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleClientName} required />
      </div>
      <div className="form-group">
        <label htmlFor="clientEmail">Client Email:</label>
        <input type="text" id="clientEmail" name="clientEmail" value={formData.clientEmail} onChange={handleClientEmail} required />
      </div>
      <div className="form-group">
        <label htmlFor="numberOfMembers">Number of Members:</label>
        <input type="number" id="projectMembers" name="projectMembers" value={formData.numberOfMembers} onChange={handleMembers} required />
      </div>
      <button type="submit" className="submit-btn">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;
