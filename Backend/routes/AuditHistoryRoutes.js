const express = require('express');
const router = express.Router();
const AuditHistory = require('../models/AuditHistory');

// Create audit history entry
router.post('/audit-history', async (req, res) => {
    const auditHistory = new AuditHistory({
        projectId:req.body.projectId,
        DateofAudit:req.body.DateofAudit,
        reviewedBy:req.body.reviewedBy,
        status:req.body.status,
        reviewedSection:req.body.reviewedSection,
        comment:req.body.comment,
        actionItem:req.body.actionItem
    });
    try{
        const newauditHistory=await auditHistory.save()
        res.status(201).json(newauditHistory);
    }
    catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all audit history entries for a project
router.get('/audit-history/:projectId', async (req, res) => {
  try {
    const auditHistory = await AuditHistory.find({ projectId: req.params.projectId });
    res.json(auditHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update audit history entry
router.put('/audit-history/:id', async (req, res) => {
  try {
    const updatedAuditHistory = await AuditHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAuditHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete audit history entry
router.delete('/audit-history/:id', async (req, res) => {
  try {
    await AuditHistory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Audit history entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
