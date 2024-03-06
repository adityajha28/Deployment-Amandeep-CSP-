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
const auditPdf =require('./Services/AuditPdf');
const VersionPdf =require('./Services/VersionPdf');
const StakeHolderpdf =require('./Services/StakeHolderpdf');
const RiskProfilepdf =require('./Services/RiskProfilepdf');
const Phasespdf =require('./Services/Phasespdf');

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
app.use('/api',auditPdf);
app.use('/api',VersionPdf);
app.use('/api',StakeHolderpdf);
app.use('/api',RiskProfilepdf);
app.use('/api',Phasespdf);



db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
