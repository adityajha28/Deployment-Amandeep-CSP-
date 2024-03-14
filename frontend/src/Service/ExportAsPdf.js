import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportAsPdf = (data, columns, filename,heading) => {
  // Initialize a new jsPDF instance
  const doc = new jsPDF();

  // Map data to rows
  const rows = data.map((item) => columns.map((col) => item[col]));

  doc.setFontSize(20);
//   doc.setFontStyle('bold');

  // Calculate the width of the text and center it horizontally
  const textWidth = doc.getStringUnitWidth(heading) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const xOffset = (doc.internal.pageSize.width - textWidth) / 2;

  // Add heading
  doc.text(heading, xOffset, 10);

  // Add table to PDF document
  doc.autoTable({
    theme:'grid',
    head: [columns],
    body: rows,
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
};

export default ExportAsPdf;