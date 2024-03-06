import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreateProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    projectManagerName: '',
    status: 'Ongoing',
    clientName:'',
    clientEmail:'',
    description:'',
    totalBudget: '',
    projectMembers: 0
  });

  const navigate = useNavigate(); // Initialize navigate

  const handlename = (e) => {
    setFormData({ ...formData, name:e.target.value});
  }

  const handleProjectManager=(e)=>{
    setFormData({...formData,projectManagerName:e.target.value});
  }

  const handleClientName =(e)=>{
    setFormData({...formData, clientName:e.target.value});
  }

  
  const handleClientEmail =(e)=>{
    setFormData({...formData,clientEmail:e.target.value});
  }

  
  const handleMembers =(e)=>{
    setFormData({...formData,projectMembers:e.target.value});
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post('http://localhost:5000/api/projects', formData);
      navigate('/'); // Use navigate to redirect
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="projectName">Project Name:</label>
        <input type="text" id="name" name="name" value={formData.projectName} onChange={handlename} required />
      </div>
      <div>
        <label htmlFor="projectManager">Project Manager:</label>
        <input type="text" id="projectManagerName" name="projectManagerName" value={formData.projectManager} onChange={handleProjectManager} required />
      </div>
      <div>
        <label htmlFor="clientName">Client Name:</label>
        <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleClientName} required />
      </div>
      <div>
        <label htmlFor="clientEmail">Client Email:</label>
        <input type="text" id="clientEmail" name="clientEmail" value={formData.clientEmail} onChange={handleClientEmail} required />
      </div>
      <div>
        <label htmlFor="numberOfMembers">Number of Members:</label>
        <input type="number" id="projectMembers" name="projectMembers" value={formData.numberOfMembers} onChange={handleMembers} required />
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;
