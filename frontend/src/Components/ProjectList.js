import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/ProjectList.css";
import { useNavigate } from "react-router-dom";

function ProjectList() {
  // State to store projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/projects")
      .then((response) => {
        // console.log("Data",response.data);
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error occured");
        setLoading(false);
      });
  }, []);

  // Function to delete a project
  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
      // Remove the deleted project from the project list
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const editProject = (projectId) => {
    navigate(`/edit-projects/${projectId}`); // Navigating to edit project route with projectId as a parameter
  };
  return (
    <div className="TopContainer">
        <div className="StatusCards">
            <div className="CardStyle">
                <h1>41</h1>
                <span>All projects</span>
            </div>
            <div className="CardStyle">
                <h1>41</h1>
                <span>All projects</span>
            </div>
            <div className="CardStyle">
                <h1>41</h1>
                <span>All projects</span>
            </div>
            <div className="CardStyle">
                <h1>41</h1>
                <span>All projects</span>
            </div>
        </div>
      <div className="ProjectTable">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Started On</th>
              <th>Status</th>
              <th>Project Manager</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>
          {projects &&
            projects.length > 0 && // Check if projects is defined and not empty
            projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.startDate}</td>
                <td>{project.status}</td>
                <td>{project.projectManagerName}</td>
                <td>{project.projectMembers}</td>
                <td>
                  <button onClick={() => editProject(project._id)}>Edit</button>
                  <button onClick={() => deleteProject(project._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default ProjectList;
