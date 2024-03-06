const express = require('express');
const router = express.Router();
const ScopeandStack = require('../models/ScopeandStack');

// Create project scope and stack
router.post('/project-scope', async (req, res) => {
    const projectScope=new ScopeandStack({
        projectId:req.body.projectId,
        projectStack:req.body.projectStack,
        projectScope:req.body.projectScope,
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
router.get('/project-scope/:projectId', async (req, res) => {
  try {
    const projectScopes = await ScopeandStack.find({ projectId: req.params.projectId});
    res.json(projectScopes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a specific project scope by ID
router.get('/project-scope/:id', async (req, res) => {
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
router.put('/project-scope/:id', async (req, res) => {
  try {
    const updatedProjectScope = await ScopeandStack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProjectScope);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project budget Scope
router.delete('/project-scope/:id', async (req, res) => {
  try {
    await ScopeandStack.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project scope deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
