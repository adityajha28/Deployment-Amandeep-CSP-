const express = require('express');
const router = express.Router();
const pdfkit = require('pdfkit');
// const jsPDF = require('jspdf');

// Endpoint for generating PDF from audit history data
router.post('/stakeholder/pdf', async (req, res) => {
  try {
    // Create a new PDF document
    const doc = new pdfkit();

    // Set content type as PDF
    res.setHeader('Content-Type', 'application/pdf');
    
    // Pipe PDF content to response
    doc.pipe(res);

    // Add header row to the table
    doc.font('Helvetica-Bold').text('StakeHolders', { align: 'center' });
    doc.moveDown(1);
    const headers = ['Title'.padEnd(20), 'Name'.padEnd(20), 'Budgeted Hours'.padEnd(20)];
    doc.font('Helvetica-Bold').text(headers.join('\t\t'), { align: 'left' });

    // Add audit history data to the table with spacing
    req.body.forEach(stakeholder => {
      const rowData = [
        stakeholder.Title.padEnd(20),
        stakeholder.Name.padEnd(20),
        stakeholder.Contact.padEnd(20),
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
