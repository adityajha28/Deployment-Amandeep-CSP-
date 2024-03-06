const express = require('express');
const router = express.Router();
const SprintDetails = require('../models/sprintdetails');

// Create sprint entry
router.post('/sprints', async (req, res) => {
    const sprintDetails=new SprintDetails({
          projectId:req.body.projectId,
          sprint: req.body.sprint,
          startDate: req.body.startDate,
          EndDate: req.body.EndDate,
          Status:req.body.Status,
          Comments:req.body.Comments
    })
  try {
    const newSprint= await sprintDetails.save();
    res.status(201).json(newSprint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all sprints for a specific project
router.get('/sprints/:projectId', async (req, res) => {
  try {
    const sprints = await SprintDetails.find({ projectId: req.params.projectId });
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a specific sprint by ID
router.get('/sprints/:projectId/:id', async (req, res) => {
  try {
    const sprint = await SprintDetails.findOne({ _id: req.params.id, projectId: req.params.projectId });
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update sprint entry
router.patch('/sprints/:projectId/:id', async (req, res) => {
  try {
    const updatedSprint = await SprintDetails.findOneAndUpdate(
      { _id: req.params.id, projectId: req.params.projectId },
      req.body,
      { new: true }
    );
    res.json(updatedSprint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete sprint entry
router.delete('/sprints/:projectId/:id', async (req, res) => {
  try {
    await SprintDetails.findOneAndDelete({ _id: req.params.id, projectId: req.params.projectId });
    res.json({ message: 'Sprint deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
