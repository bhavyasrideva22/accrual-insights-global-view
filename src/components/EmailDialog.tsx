
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendEmailWithResults } from "@/services/emailService";
import { PTOCalculationResult } from "@/types/calculator";
import { Mail } from "lucide-react";

interface EmailDialogProps {
  result: PTOCalculationResult;
  userName: string;
}

export const EmailDialog: React.FC<EmailDialogProps> = ({ result, userName }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSendEmail = async () => {
    if (!email) return;
    
    setIsLoading(true);
    try {
      await sendEmailWithResults(result, userName, email);
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-soft text-white hover:bg-soft/90 border-none shadow-md"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Results
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email PTO Calculation Results</DialogTitle>
          <DialogDescription>
            Send your PTO accrual calculation results to any email address.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSendEmail} 
            disabled={!email || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Sending..." : "Send Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
