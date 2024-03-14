import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/EscalationMatrix.css';

function EscalationMatrix({ projectId }) {
  const [escalationData, setEscalationData] = useState([]);
  const [newEscalation, setNewEscalation] = useState({
    projectId: projectId,
    escalationType: '',
    escaltionLevel: '',
    role: ''
  });

  useEffect(() => {
    const fetchEscalationData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/escalation-matrix/${projectId}`);
        setEscalationData(response.data);
      } catch (error) {
        console.error('Error fetching escalation data:', error);
      }
    };

    fetchEscalationData();
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEscalation({ ...newEscalation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/escalation-matrix', newEscalation);
      setEscalationData([...escalationData, response.data]);
      setNewEscalation({
        projectId: projectId,
        escalationType: '',
        escaltionLevel: '',
        role: ''
      });
    } catch (error) {
      console.error('Error adding new escalation matrix data:', error);
    }
  };

  const deleteEscalation = async (escId) => {
    try {
      await axios.delete(`http://localhost:5000/api/escalation-matrix/${escId}`);
      // Remove the deleted project from the project list
      setEscalationData(escalationData.filter((esc) => esc._id !== escId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };


function OperationalEscalationTable({ escalationData }) {
    const operationalEscalations = escalationData.filter(entry => entry.escalationType === 'Operational');
  
    return (
      <div>
        <h3>Operational Escalation Matrix</h3>
        <table className="version-history-table">
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {operationalEscalations.map(entry => (
              <tr key={entry._id}>
                <td>{entry.escaltionLevel}</td>
                <td>{entry.role}</td>
                <td><button className='delete-btn' onClick={() => deleteEscalation(entry._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  function FinancialEscalationTable({ escalationData }) {
    const financialEscalations = escalationData.filter(entry => entry.escalationType === 'Financial');
  
    return (
      <div>
        <h3>Financial Escalation Matrix</h3>
        <table className="version-history-table">
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {financialEscalations.map(entry => (
              <tr key={entry._id}>
                <td>{entry.escaltionLevel}</td>
                <td>{entry.role}</td>
                <td><button className='delete-btn' onClick={() => deleteEscalation(entry._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  function TechnicalEscalationTable({ escalationData }) {
    const technicalEscalations = escalationData.filter(entry => entry.escalationType === 'Technical');
  
    return (
      <div>
        <h3>Technical Escalation Matrix</h3>
        <table className="version-history-table">
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {technicalEscalations.map(entry => (
              <tr key={entry._id}>
                <td>{entry.escaltionLevel}</td>
                <td>{entry.role}</td>
                <td><button className='delete-btn' onClick={() => deleteEscalation(entry._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="escalation-matrix">
    <h2>Add New Escalation Matrix Entry</h2>
    <form onSubmit={handleSubmit} className='FormContainer'>
      <label>
        Escalation Type:
        <input className="input-field" type="text" name="escalationType" value={newEscalation.escalationType} onChange={handleInputChange} />
      </label>
      <label>
        Escalation Level:
        <input className="input-field" type="number" name="escaltionLevel" value={newEscalation.escaltionLevel} onChange={handleInputChange} />
      </label>
      <label>
        Role:
        <input className="input-field" type="text" name="role" value={newEscalation.role} onChange={handleInputChange} />
      </label>
      <div className='addbtn'>
      <button className="AddEntry" type="submit">Add</button>
      </div>
    </form>

    <div className="escalation-tables">
      <OperationalEscalationTable escalationData={escalationData} />
      <FinancialEscalationTable escalationData={escalationData} />
      <TechnicalEscalationTable escalationData={escalationData} />
    </div>
  </div>
  );
}


// OperationalEscalationTable, FinancialEscalationTable, TechnicalEscalationTable components remain the same

export default EscalationMatrix;
