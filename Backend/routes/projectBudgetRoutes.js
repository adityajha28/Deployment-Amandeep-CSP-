const express = require('express');
const router = express.Router();
const ProjectBudget = require('../models/ProjectBudget');

// Create project budget entry
router.post('/project-budget', async (req, res) => {
    const projectBudget=new ProjectBudget({
        projectId:req.body.projectId,
        projectType:req.body.projectType,
        Duration:req.body.Duration,
        budgetHours:req.body.budgetHours
    })
  try {
    const newProjectBudget=await projectBudget.save()
    res.status(201).json(newProjectBudget);
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all project budgets
router.get('/project-budget/:projectId', async (req, res) => {
  try {
    const projectBudgets = await ProjectBudget.find({ projectId: req.params.projectId});
    res.json(projectBudgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a specific project budget by ID
router.get('/project-budget/:id', async (req, res) => {
  try {
    const projectBudget = await ProjectBudget.findById(req.params.id);
    if (!projectBudget) {
      return res.status(404).json({ message: 'Project budget not found' });
    }
    res.json(projectBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project budget entry
router.put('/project-budget/:id', async (req, res) => {
  try {
    const updatedProjectBudget = await ProjectBudget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProjectBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project budget entry
router.delete('/project-budget/:id', async (req, res) => {
  try {
    await ProjectBudget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project budget deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
