const express = require('express');
const router = express.Router();
const StakeHolders = require('../models/stakeHolders');

// Create stakeholder entry
router.post('/stakeholders', async (req, res) => {
    const stakeholder = new StakeHolders({
        projectId:req.body.projectId,
        Title:req.body.Title,
        Name:req.body.Name,
        Contact:req.body.Contact
    });
  try {
    const newstakeHolder=await stakeholder.save();
    res.status(201).json(newstakeHolder);
  }
   catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all stakeholders for a project
router.get('/stakeholders/:projectId', async (req, res) => {
  try {
    const stakeholders = await StakeHolders.find({ projectId: req.params.projectId });
    res.json(stakeholders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update stakeholder entry
router.put('/stakeholders/:id', async (req, res) => {
  try {
    const updatedStakeholder = await StakeHolders.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStakeholder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete stakeholder entry
router.delete('/stakeholders/:id', async (req, res) => {
  try {
    await StakeHolders.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stakeholder entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
