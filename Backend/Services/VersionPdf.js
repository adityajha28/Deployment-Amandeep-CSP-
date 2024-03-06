const express = require('express');
const router = express.Router();
const pdfkit = require('pdfkit');
// const jsPDF = require('jspdf');

// Endpoint for generating PDF from version history data
router.post('/version-history/pdf', async (req, res) => {
  try {
    // Create a new PDF document
    const doc = new pdfkit();

    // Set content type as PDF
    res.setHeader('Content-Type', 'application/pdf');
    
    // Pipe PDF content to response
    doc.pipe(res);

    // Add header row to the table
    doc.font('Helvetica-Bold').text('Version History', { align: 'center' });
    doc.moveDown(1);
    const headers = ['Version', 'Type', 'Change', 'Change Reason', 'Created By', 'Revision Date','Approval Date','Approved By'];
    doc.font('Helvetica-Bold').text(headers.join('\t\t'), { align: 'left' });

    // Add audit history data to the table with spacing
    req.body.forEach(Version => {
      const rowData = [
        Version.version,
        Version.Type,
        Version.change,
        Version.changeReason,
        Version.createdBy,
        Version.revisionDate,
        Version.approvalDate,
        Version.approvedBy,
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
