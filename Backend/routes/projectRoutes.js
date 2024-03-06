const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const bodyParser = require('body-parser');


router.use(bodyParser.json());

//get all project details
router.get('/projects', async (req,res)=>{
    try {
        const projects = await Project.find();
        res.send(projects);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

//create new projects
router.post('/projects',async (req, res) => {
    const project = new Project({
      // const {} = req.body;
      // startDate: req.body.startDate,
      name: req.body.name,
      projectManagerName:req.body.projectManagerName,
      status: req.body.status,
      projectMembers:req.body.projectMembers,
      clientName:req.body.clientName,
      clientEmail:req.body.clientEmail,
      
      totalBudget:req.body.totalBudget,
      description: req.body.description
    });
    console.log(project);
    try {
      const newProject = await project.save();
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //get project by id
  router.get('/projects/:id',async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (project == null) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //update a project by id
  router.put('/projects/:id',async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  //delete a project by id
  router.delete('/projects/:id',async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ message: 'Project deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports=router;