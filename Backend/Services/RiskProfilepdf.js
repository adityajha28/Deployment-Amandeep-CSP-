const express = require('express');
const router = express.Router();
const pdfkit = require('pdfkit');
// const jsPDF = require('jspdf');

// Endpoint for generating PDF from audit history data
router.post('/riskprofile/pdf', async (req, res) => {
  try {
    // Create a new PDF document
    const doc = new pdfkit();

    // Set content type as PDF
    res.setHeader('Content-Type', 'application/pdf');
    
    // Pipe PDF content to response
    doc.pipe(res);

    // Add header row to the table
    doc.font('Helvetica-Bold').text('RiskProfile', { align: 'center' });
    doc.moveDown(1);
    const headers = ['Risk Type	'.padEnd(8), 'Description'.padEnd(8), 'Severity'.padEnd(8),'Impact'.padEnd(8),'Remedial Steps'.padEnd(8),'Status'.padEnd(8),'closureDate'.padEnd(8)];
    doc.font('Helvetica-Bold').text(headers.join('\t\t'), { align: 'left' });

    // Add audit history data to the table with spacing
    req.body.forEach(riskprofile => {
      const rowData = [
        riskprofile.RiskType.padEnd(20),
        riskprofile.Description.padEnd(20),
        riskprofile.Severity.padEnd(20),
        riskprofile.Impact.padEnd(20),
        riskprofile.RemedialSteps.padEnd(20),
        riskprofile.Status.padEnd(20),
        riskprofile.closureDate.padEnd(20),
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
