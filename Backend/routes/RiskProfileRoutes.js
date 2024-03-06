const express = require('express');
const router = express.Router();
const RiskProfile = require('../models/RiskProfile');

// Create risk profile entry
router.post('/risk-profiles', async (req, res) => {
    const riskProfile=new RiskProfile({
        projectId:req.body.projectId,
        RiskType: req.body.RiskType,
        Description: req.body.Description,
        Severity: req.body.Severity,
        Impact:req.body.Impact,
        RemedialSteps:req.body.RemedialSteps,
        Status: req.body.Status,
        closureDate: req.body.closureDate,
    })
  try {
    const newriskProfile = await riskProfile.save();
    res.status(201).json(newriskProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all RiskProfile for a project
router.get('/risk-profiles/:projectId', async (req, res) => {
    try {
      const riskProfile = await RiskProfile.find({ projectId: req.params.projectId });
      res.json(riskProfile);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Read a specific risk profile by ID
router.get('/risk-profiles/:id', async (req, res) => {
  try {
    const riskProfile = await RiskProfile.findById(req.params.id);
    if (!riskProfile) {
      return res.status(404).json({ message: 'Risk profile not found' });
    }
    res.json(riskProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update risk profile entry
router.put('/risk-profiles/:id', async (req, res) => {
  try {
    const updatedRiskProfile = await RiskProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRiskProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete risk profile entry
router.delete('/risk-profiles/:id', async (req, res) => {
  try {
    await RiskProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Risk profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
