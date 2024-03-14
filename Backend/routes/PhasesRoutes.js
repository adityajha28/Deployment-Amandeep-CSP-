const express = require('express');
const router = express.Router();
const Phases = require('../models/Phases');

// Create phase entry
router.post('/phases', async (req, res) => {
    const phase=new Phases({
        projectId: req.body.projectId,
          Title: req.body.Title,
          startDate: req.body.startDate,
          completionDate: req.body.completionDate,
          approvalDate: req.body.approvalDate,
          RevisedDate: req.body.RevisedDate,
          Comments: req.body.Comments
    })
  try {
    const phase = new Phases(req.body);
    await phase.save();
    res.status(201).json(phase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all phases for a specific project
router.get('/phases/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const phases = await Phases.find({ projectId });
    res.json(phases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a specific phase by ID
router.get('/phases/:id', async (req, res) => {
  try {
    const phase = await Phases.findById(req.params.id);
    if (!phase) {
      return res.status(404).json({ message: 'Phase not found' });
    }
    res.json(phase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update phase entry
router.put('/phases/:id', async (req, res) => {
  try {
    const updatedPhase = await Phases.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPhase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete phase entry
router.delete('/phases/:id', async (req, res) => {
  try {
    await Phases.findByIdAndDelete(req.params.id);
    res.json({ message: 'Phase deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
