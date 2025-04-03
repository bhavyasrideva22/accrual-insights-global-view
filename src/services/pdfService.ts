
import { jsPDF } from "jspdf";
import { PTOCalculationResult } from "@/types/calculator";
import { formatCurrency } from "@/lib/format-currency";

// Define company branding info
const COMPANY_NAME = "Accrual Insights";
const COMPANY_TAGLINE = "Global PTO Solutions";
const COMPANY_WEBSITE = "accrualinsights.com";
const FOOTER_TEXT = "© 2025 Accrual Insights. All rights reserved.";

/**
 * Generates a PDF document from the PTO calculation results
 */
export const generatePDF = (
  result: PTOCalculationResult,
  userName: string
): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Set document properties
  doc.setProperties({
    title: "PTO Accrual Calculation Results",
    subject: "PTO Accrual Report",
    author: COMPANY_NAME,
    creator: COMPANY_NAME,
  });

  // Add header with company info
  doc.setFillColor(36, 94, 79); // Primary dark green
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(248, 248, 248); // Cream white
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(COMPANY_NAME, 15, 15);
  doc.setFontSize(12);
  doc.text(COMPANY_TAGLINE, 15, 22);

  // Add report title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(51, 51, 51); // Charcoal
  doc.text("PTO Accrual Calculation Report", 105, 45, { align: "center" });

  // Add user info and date
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated for: ${userName}`, 15, 60);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 15, 67);

  // Add calculation details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Calculation Details", 15, 80);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Annual Salary: ${formatCurrency(result.annualSalary)}`, 20, 90);
  doc.text(`Employment Type: ${result.employmentType}`, 20, 97);
  doc.text(`Years of Service: ${result.yearsOfService}`, 20, 104);
  doc.text(`Working Days per Week: ${result.workingDaysPerWeek}`, 20, 111);
  
  // Add results section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Accrual Results", 15, 125);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Total Annual PTO Days: ${result.totalPTODays}`, 20, 135);
  doc.text(`PTO Days Accrued Per Month: ${result.ptoDaysPerMonth.toFixed(2)}`, 20, 142);
  doc.text(`PTO Value Per Day: ${formatCurrency(result.ptoValuePerDay)}`, 20, 149);
  doc.text(`Total Annual PTO Value: ${formatCurrency(result.totalPTOValue)}`, 20, 156);

  // Add explanation section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Understanding Your PTO Accrual", 15, 175);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const explanation = 
    "The PTO accrual calculation is based on your annual salary, employment status, " +
    "and years of service. Your total PTO days are distributed evenly across the year, " +
    "with the accrual happening on a monthly basis. The PTO value represents the monetary " +
    "worth of your paid time off, calculated from your daily rate.";
    
  const splitExplanation = doc.splitTextToSize(explanation, 180);
  doc.text(splitExplanation, 15, 185);

  // Add footer
  doc.setFillColor(36, 94, 79); // Primary dark green
  doc.rect(0, 277, 210, 20, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(248, 248, 248); // Cream white
  doc.text(FOOTER_TEXT, 105, 285, { align: "center" });
  doc.text(COMPANY_WEBSITE, 105, 290, { align: "center" });

  return doc;
};

/**
 * Downloads the generated PDF with a specific filename
 */
export const downloadPDF = (
  result: PTOCalculationResult,
  userName: string
): void => {
  const doc = generatePDF(result, userName);
  const fileName = `PTO_Accrual_Report_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
};
