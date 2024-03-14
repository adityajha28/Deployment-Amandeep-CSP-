// Import necessary packages
const express = require('express');
const router = express.Router();
const jsPDF = require('jspdf');
require('jspdf-autotable');

// Define route for generating PDF
router.post('/audit-history/pdf', (req, res) => {
  try {
    const auditHistory = req.body;

    // Create a new PDF document
    const doc = new jsPDF();

    // Define columns for the table
    const columns = ['Date of Audit', 'Reviewed By', 'Status', 'Reviewed Section', 'Comment', 'Action Item'];

    // Map audit history data to rows
    const rows = auditHistory.map((audit) => [
      audit.DateofAudit,
      audit.reviewedBy,
      audit.status,
      audit.reviewedSection,
      audit.comment,
      audit.actionItem
    ]);
    console.log(rows);

    // Add table to PDF document
    doc.autoTable({
      theme:grid,
      head: [columns],
      body: rows,
    });

    // Generate PDF as a Blob
    const pdfBlob = doc.output('blob');

    // Send PDF file as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=audit_history.pdf');
    res.send(pdfBlob);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

// Export router
module.exports = router;
