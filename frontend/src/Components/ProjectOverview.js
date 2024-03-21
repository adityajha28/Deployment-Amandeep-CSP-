// ProjectOverviewForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ProjectOverview.css';

function ProjectOverview({ projectId }) {
  const [formData, setFormData] = useState({
    brief: '',
    Purpose: '',
    Goals: '',
    Objectives: '',
    Budget: ''
  });

  // Fetch existing project overview data when component mounts
  useEffect(() => {
    const fetchProjectOverview = async () => {
      try {
        const response = await axios.get(`http://3.108.217.170:5000/api/project-scope/overview/${projectId}`);
        if (response.data.length > 0) {
          const { brief, Purpose, Goals, Objectives, Budget } = response.data[0];
          setFormData({ brief, Purpose, Goals, Objectives, Budget });
        }
      } catch (error) {
        console.error('Error fetching project overview:', error);
      }
    };

    fetchProjectOverview();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://3.108.217.170:5000/api/project-scope/overview/${projectId}`, formData);
      if (response.status === 200) {
        alert('Project overview updated successfully!');
      } else {
        alert('Failed to update project overview data');
      }
    } catch (error) {
      console.error('Error updating project overview data:', error);
      // alert('An error occurred while updating project overview data');
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
          <label htmlFor="Purpose">Purpose</label>
          <textarea
            type="text"
            placeholder="Write project purpose here"
            id="Purpose"
            name="Purpose"
            value={formData.Purpose}
            onChange={handleChange}
          />
        </div>
        <div className="goal input-container">
          <label htmlFor="Goals">Goals</label>
          <textarea
            type="text"
            placeholder="Write project goals here"
            id="Goals"
            name="Goals"
            value={formData.Goals}
            onChange={handleChange}
          />
        </div>
        <div className="objective input-container">
          <label htmlFor="Objectives">Objectives</label>
          <textarea
            type="text"
            placeholder="Write project objectives here"
            id="Objectives"
            name="Objectives"
            value={formData.Objectives}
            onChange={handleChange}
          />
        </div>
        <div className="budget input-container">
          <label htmlFor="Budget">Budget</label>
          <div>
            <input
              type="number"
              name="Budget"
              id="Budget"
              placeholder="Write project budget here"
              value={formData.Budget}
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
