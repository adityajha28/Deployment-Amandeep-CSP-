import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/VersionHistory.css";
import ExportAsPdf from "../Service/ExportAsPdf";

function ClientFeedback({ projectId,role }) {
  // console.log(`in versionhistory ${projectId}`)
  const [MoMData, setMoMData] = useState([]);
  const [newMoM, setNewMoM] = useState({
    projectId: `${projectId}`,
    date: "",
    duration: "",
    momLink: "",
    comments: "",
    isEditing: false,
  });

  useEffect(() => { 
    const fetchClientMoM = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/mom/${projectId}`
        );
        setMoMData(response.data);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };

    fetchClientMoM();
  }, [projectId]);

//   console.log(AuditHistory);


  const handleAddNewMoM = () => {
    setNewMoM({ ...newMoM, isEditing: true });
  };

  const handleSaveNewAudit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/mom`,
        newMoM
      );
      setMoMData([...MoMData, newMoM]);
      setNewMoM({
        projectId: `${projectId}`,
        date: "",
        duration: "",
        momLink:"",
        comments: "",
        isEditing: false,
      });

      await axios.post('http://localhost:5000/api/send-email', {
        subject: 'New MoM Added',
        text: 'A new MoM has been added.',...newMoM
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error saving new version:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMoM({ ...newMoM, [name]: value });
  };

  // deleting a version data from table
  const deleteMoM = async (momId) => {
    try {
      await axios.delete(`http://localhost:5000/api/mom/${momId}`);
      // Remove the deleted project from the project list
      setMoMData(MoMData.filter((moms) => moms._id !== momId));
    } catch (error) {
      console.error("Error deleting audit:", error);
    }
  };

  const handleDownloadAsPdf = () => {
    const columns = [
      "date",
      "duration",
      "momLink",
      "comments",
    ];
    ExportAsPdf(MoMData, columns, "MoM_Data", "MoM of Meeting");
  };


  return (
    <div>
    <div className="top-btns">
      {(role==="Admin" || role==="Project Manager") && (<button className="add-version-btn" onClick={handleAddNewMoM}>
        Add MoM
      </button>)}
      <button className="download-pdf-btn" onClick={handleDownloadAsPdf}>Download As PDF</button>
      </div>
      <table className="version-history-table">
        <thead>
          <tr>
            <th>date</th>
            <th>duration</th>
            <th>momLink</th>
            <th>comments</th>
            {(role==="Admin" || role==="Project Manager") && (<th>Actions</th>)}
            
          </tr>
        </thead>
        <tbody>
          {MoMData.map((mom, index) => (
            <tr key={index}>
              <td>{mom.date}</td>
              <td>{mom.duration}</td>
              <td>{mom.momLink}</td>
              <td>{mom.comments}</td>
              {(role==="Admin" || role==="Project Manager") && (<td>
                <button className="delete-btn" onClick={() => deleteMoM(mom._id)}>Delete</button>
              </td>)}
            </tr>
          ))}
          {newMoM.isEditing && (
            <tr>
              <td>
                <input
                  className="inputfield"
                  type="date"
                  name="date"
                  value={newMoM.date}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="duration"
                  value={newMoM.duration}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="momLink"
                  value={newMoM.momLink}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="comments"
                  value={newMoM.comments}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button onClick={handleSaveNewAudit} className="save-btn">
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClientFeedback;
