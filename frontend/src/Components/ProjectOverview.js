import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/ProjectOverview.css';

function ProjectOverview({projectId}) {
  const [formData, setFormData] = useState({
    brief: '',
    purpose: '',
    goal: '',
    objective: '',
    totalBudget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( `http://localhost:5000/api/projects${projectId}/overview`, formData);
      if (response.status === 201) {
        // Clear form data after successful submission
        setFormData({
          brief: '',
          purpose: '',
          goal: '',
          objective: '',
          totalBudget: ''
        });
        alert('Project overview saved successfully!');
      } else {
        alert('Failed to save project overview data');
      }
    } catch (error) {
      console.error('Error saving project overview data:', error);
      alert('An error occurred while saving project overview data');
    }
  };

  return (
    <div className="FormContainer">
      <form className="project-overview" onSubmit={handleSubmit}>
        <h3>Project Overview</h3>
        <div className="brief input-container">
          <label htmlFor="brief">Project Brief</label>
          <textarea
            type="text"
            placeholder="Write project brief here"
            id="brief"
            name="brief"
            value={formData.brief}
            onChange={handleChange}
          />
        </div>
        <div className="purpose input-container">
          <label htmlFor="purpose">Purpose</label>
          <textarea
            type="text"
            placeholder="Write project purpose here"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
        </div>
        <div className="goal input-container">
          <label htmlFor="goal">Goals</label>
          <textarea
            type="text"
            placeholder="Write project goals here"
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          />
        </div>
        <div className="objective input-container">
          <label htmlFor="objective">Objectives</label>
          <textarea
            type="text"
            placeholder="Write project objectives here"
            id="objective"
            name="objective"
            value={formData.objective}
            onChange={handleChange}
          />
        </div>
        <div className="budget input-container">
          <label htmlFor="budget">Budget</label>
          <div>
            <input
              type="number"
              name="totalBudget"
              id="budget"
              placeholder="Write project budget here"
              value={formData.totalBudget}
              onChange={handleChange}
            />
            <span>US Dollar</span>
          </div>
        </div>
        <div>
          <button className="btn save-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectOverview;
