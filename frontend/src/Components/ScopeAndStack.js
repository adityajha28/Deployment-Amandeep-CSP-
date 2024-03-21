import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ScopeAndStack.css'

function ScopeAndStack({ projectId }) {
  const [projectTech, setProjectTech] = useState('');
  const [projectScope, setProjectScope] = useState('');

  // Fetch existing project scope and stack data when component mounts
  useEffect(() => {
    const fetchProjectScope = async () => {
      try {
        const response = await axios.get(`http://3.108.217.170:5000/api/project-scope/${projectId}`);
        if (response.data.length > 0) {
            console.log(response.data);
          const { projectStack, projectScope } = response.data[0];
          setProjectTech(projectStack);
          setProjectScope(projectScope);
        }
      } catch (error) {
        console.error('Error fetching project scope:', error);
      }
    };

    fetchProjectScope();
  }, [projectId]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://3.108.217.170:5000/api/project-scope/${projectId}`, { projectStack: projectTech, projectScope });
      alert('Project scope updated successfully');
    } catch (error) {
      console.error('Error updating project scope:', error);
    }
  };

  return (
    <div className="scope-and-stack-container">
      <h2>Project Scope and Stack</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectTech">Project Technology:</label>
          <select id="projectTech" value={projectTech} onChange={(e) => setProjectTech(e.target.value)}>
            {/* Populate dropdown with project technologies */}
            <option value="Backend">Backend</option>
            <option value="Front-end">Front-end</option>
            <option value="Mobile app">Mobile app</option>
            <option value="Database">Database</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="projectScope">Project Scope:</label>
          <textarea id="projectScope" value={projectScope} onChange={(e) => setProjectScope(e.target.value)} />
        </div>
        <button className='Save-btn' type="submit">Save</button>
      </form>
    </div>
  );
}

export default ScopeAndStack;
