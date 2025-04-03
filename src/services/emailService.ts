
import { PTOCalculationResult } from "@/types/calculator";
import { generatePDF } from "./pdfService";
import { toast } from "@/components/ui/use-toast";

/**
 * Sends an email with the PTO calculation results
 * Note: In a real application, this would connect to a backend API
 * For demonstration, we'll simulate the email sending process
 */
export const sendEmailWithResults = (
  result: PTOCalculationResult,
  userName: string,
  recipientEmail: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    // In a real implementation, this would call a backend API
    // that handles the email sending with the PDF attachment
    
    // For demo purposes, we'll simulate a successful email send after a delay
    setTimeout(() => {
      // Show success toast
      toast({
        title: "Email Sent Successfully",
        description: `Results have been sent to ${recipientEmail}`,
      });
      
      resolve(true);
    }, 1500);
  });
};
