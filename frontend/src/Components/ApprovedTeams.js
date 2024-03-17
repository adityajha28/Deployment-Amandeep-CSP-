import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/ApprovedTeams.css";

function ApprovedTeams({ projectId,role }) {
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [formData, setFormData] = useState({
    projectId: `${projectId}`,
    phase: 3, // Initialize with a default value representing the number of tables to render initially
    numberOfResources: "",
    role: "",
    availabilityPercentage: "",
    duration: "",
  });

  useEffect(() => {
    const fetchApprovedTeams = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/approved-team/${projectId}`
        );
        setApprovedTeams(response.data);
      } catch (error) {
        console.error("Error fetching approved teams:", error);
      }
    };

    fetchApprovedTeams();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/approved-team",
        formData
      );
      console.log("Data added successfully:", response.data);
      setApprovedTeams([...approvedTeams, response.data]);
      setFormData({
        ...formData,
        numberOfResources: "",
        role: "",
        availabilityPercentage: "",
        duration: "",
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // Function to render a table for each phase
  const renderPhaseTables = () => {
    if (approvedTeams.length === 0) {
      return null; // If no data available, don't render tables
    }

    const phaseTables = [];
    for (let i = 1; i <= formData.phase; i++) {
      const phaseData = approvedTeams.filter((team) => team.phase === i);
      phaseTables.push(
        <div key={i}>
          <h3>Phase {i}</h3>
          <table className="approved-teams-table">
            <thead>
              <tr>
                <th>No. of Resources</th>
                <th>Role</th>
                <th>Availability %</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {phaseData.map((team) => (
                <tr key={team._id}>
                  <td>{team.numberOfResources}</td>
                  <td>{team.role}</td>
                  <td>{team.availabilityPercentage}</td>
                  <td>{team.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return phaseTables;
  };

  return (
    <div className="approved-teams-container">
      {(role==="Admin" || role==="Project Manager") && (<div className="form-container">
        <h2>Add Approved Team Data</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Phase:
            <input
              type="number"
              name="phase"
              value={formData.phase}
              onChange={handleChange}
            />
          </label>
          <label>
            Number of Resources:
            <input
              type="number"
              name="numberOfResources"
              value={formData.numberOfResources}
              onChange={handleChange}
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </label>
          <label>
            Availability:
            <input
              type="number"
              name="availabilityPercentage"
              value={formData.availabilityPercentage}
              onChange={handleChange}
            />
          </label>
          <label>
            Duration:
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </label>
          <div className="button-container">
          <button type="submit">Add Data</button>
          </div>
        </form>
      </div>)}
      
      <div className="phase-tables">{renderPhaseTables()}</div>
    </div>
  );
}

export default ApprovedTeams;
