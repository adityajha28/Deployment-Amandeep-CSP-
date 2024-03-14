const express = require('express');
const router = express.Router();
const EscalationMatrix = require('../models/EscalationMatrix');

// Create escaltion matrix entry
router.post('/escalation-matrix', async (req, res) => {
    const escaltionMatrix = new EscalationMatrix({
        projectId:req.body.projectId,
        escalationType:req.body.escalationType,
        escaltionLevel:req.body.escaltionLevel,
        role:req.body.role,
    });
    try{
        const newEscalation=await escaltionMatrix.save()
        res.status(201).json(newEscalation);
    }
    catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all escaltion matrix entries for a project
router.get('/escalation-matrix/:projectId', async (req, res) => {
  try {
    const escaltionMatrix = await EscalationMatrix.find({ projectId: req.params.projectId });
    res.json(escaltionMatrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update escaltion matrix entry
router.put('/escalation-matrix/:id', async (req, res) => {
  try {
    const updatedEscaltion = await EscalationMatrix.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEscaltion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete escaltion matrix entry
router.delete('/escalation-matrix/:id', async (req, res) => {
  try {
    await EscalationMatrix.findByIdAndDelete(req.params.id);
    res.json({ message: 'Audit history entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
