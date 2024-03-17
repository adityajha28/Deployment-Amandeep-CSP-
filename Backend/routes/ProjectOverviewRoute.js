const express = require('express');
const router = express.Router();
const ProjectOverview = require('../models/ProjectOverview');

// Create project scope and stack
router.post('/overview', async (req, res) => {
    const projectScope=new ScopeandStack({
        projectId:req.body.projectId,
        brief:req.body.brief,
        Purpose:req.body.Purpose,
        Goals:req.body.Goals,
        Objectives:req.body.Objectives,
        Budget:req.body.Budget,
        
    })
  try {
    const newProjectScope=await projectScope.save()
    res.status(201).json(newProjectScope);
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all project scope&stack
router.get('/overview/:projectId', async (req, res) => {
  try {
    const projectScopes = await ScopeandStack.find({ projectId: req.params.projectId});
    res.json(projectScopes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a specific project scope by ID
router.get('/overview/:id', async (req, res) => {
  try {
    const projectScope = await ScopeandStack.findById(req.params.id);
    if (!projectScope) {
      return res.status(404).json({ message: 'Project scope not found' });
    }
    res.json(projectBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project scope entry
router.put('/overview/:id', async (req, res) => {
  try {
    const updatedProjectScope = await ScopeandStack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProjectScope);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project budget Scope
router.delete('/overview/:id', async (req, res) => {
  try {
    await ScopeandStack.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project scope deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
