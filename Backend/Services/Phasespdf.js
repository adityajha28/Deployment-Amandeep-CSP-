const express = require('express');
const router = express.Router();
const pdfkit = require('pdfkit');
// const jsPDF = require('jspdf');

// Endpoint for generating PDF from audit history data
router.post('/phases/pdf', async (req, res) => {
  try {
    // Create a new PDF document
    const doc = new pdfkit();

    // Set content type as PDF
    res.setHeader('Content-Type', 'application/pdf');
    
    // Pipe PDF content to response
    doc.pipe(res);

    // Add header row to the table
    doc.font('Helvetica-Bold').text('Phases', { align: 'center' });
    doc.moveDown(1);
    const headers = ['Title', 'Start Date', 'Completion Date', 'Approval Date', 'Status', 'RevisedCompletion Date','Comments'];
    doc.font('Helvetica-Bold').text(headers.join('\t\t'), { align: 'left' });

    // Add audit history data to the table with spacing
    req.body.forEach(phases => {
      const rowData = [
        phases.Title.padEnd(20),
        phases.startDate.padEnd(20),
        phases.completionDate.padEnd(20),
        phases.approvalDate.padEnd(20),
        phases.Status.padEnd(20),
        phases.RevisedDate.padEnd(20),        
        phases.Comments.padEnd(20),        

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
