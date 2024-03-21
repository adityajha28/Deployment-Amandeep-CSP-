// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const userRoutes = require('./routes/userRoutes');
const projectRoutes=require('./routes/projectRoutes');
const cors = require('cors'); // Import cors package
const AuditHistoryRoutes = require('./routes/AuditHistoryRoutes');
const VersionHistoryRoutes =require('./routes/VersionHistoryRoutes');
const stakeHolderRoutes = require('./routes/stakeHolderRoutes');
const RiskProfileRoutes=require('./routes/RiskProfileRoutes');
const PhasesRoutes=require('./routes/PhasesRoutes');
const ProjectBudget=require('./routes/projectBudgetRoutes');
const SprintDetails =require('./routes/sprintDetailsRoutes');
const ScopeAndStack=require('./routes/ScopeandStackRoutes');
const SendMail =require('./Services/SendMail');
const MoMRoutes=require('./routes/MoMRoutes');
const ProjectUpdates=require('./routes/ProjectUpdatesRoutes');
const clientFeedback=require('./routes/ClientFeedbackRoutes');
const Resources=require('./routes/ResourcesRoutes');
const approvedTeam=require('./routes/ApprovedTeamRoutes');
const EscalationMatrix=require('./routes/EscaltionMatrixRoutes');
const ProjectOverview=require('./routes/ProjectOverviewRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api',projectRoutes);
app.use('/api',AuditHistoryRoutes);
app.use('/api',VersionHistoryRoutes);
app.use('/api',stakeHolderRoutes);
app.use('/api',RiskProfileRoutes);
app.use('/api',PhasesRoutes);
app.use('/api',ProjectBudget);
app.use('/api',SprintDetails);
app.use('/api',ScopeAndStack);
app.use('/api',SendMail);
app.use('/api',MoMRoutes);
app.use('/api',ProjectUpdates);
app.use('/api',clientFeedback);
app.use('/api',Resources);
app.use('/api',approvedTeam);
app.use('/api',EscalationMatrix);
app.use('/api',ProjectOverview);


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
