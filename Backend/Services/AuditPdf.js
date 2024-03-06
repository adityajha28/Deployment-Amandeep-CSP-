const express = require('express');
const router = express.Router();
const pdfkit = require('pdfkit');
// const jsPDF = require('jspdf');

// Endpoint for generating PDF from audit history data
router.post('/audit-history/pdf', async (req, res) => {
  try {
    // Create a new PDF document
    const doc = new pdfkit();

    // Set content type as PDF
    res.setHeader('Content-Type', 'application/pdf');
    
    // Pipe PDF content to response
    doc.pipe(res);

    // Add header row to the table
    doc.font('Helvetica-Bold').text('Audit History', { align: 'center' });
    doc.moveDown(1);
    const headers = ['Date of Audit', 'Reviewed By', 'Status', 'Reviewed Section', 'Comments', 'Action Items'];
    doc.font('Helvetica-Bold').text(headers.join('\t\t'), { align: 'left' });

    // Add audit history data to the table with spacing
    req.body.forEach(audit => {
      const rowData = [
        audit.DateofAudit.padEnd(20),
        audit.reviewedBy.padEnd(20),
        audit.status.padEnd(20),
        audit.reviewedSection.padEnd(20),
        audit.comment.padEnd(20),
        audit.actionItem.padEnd(20)
      ];
      doc.font('Helvetica').text(rowData.join('\t\t'), { align: 'left' });
    });

    // Finalize the PDF and send it to the client
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

module.exports = router;
