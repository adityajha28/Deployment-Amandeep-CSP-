const express = require('express');
const router = express.Router();
const ProjectUpdate = require('../models/ProjectUpdates');

// Create project update entry
router.post('/project-update', async (req, res) => {
    const update=new ProjectUpdate({
          projectId: req.body.projectId,
          date: req.body.date,
          generalUpdates: req.body.generalUpdates,
    })
  try {
    const newUpdate=await update.save()
    res.status(201).json(newUpdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all  project-update for a specific project
router.get('/project-update/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const update = await ProjectUpdate.find({ projectId });
    res.json(update);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update project-update entry
router.put('/project-update/:id', async (req, res) => {
  try {
    const updatedProjectUpdate = await ProjectUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProjectUpdate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete  project-update entry
router.delete('/project-update/:id', async (req, res) => {
  try {
    await ProjectUpdate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Phase deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
