
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { calculatePTOAccrual } from "@/services/calculationService";
import { downloadPDF } from "@/services/pdfService";
import { EmploymentType, PTOCalculationResult } from "@/types/calculator";
import { formatCurrency } from "@/lib/format-currency";
import { Download, Calculator, BadgeIndianRupee, ChartBar } from "lucide-react";
import AccrualVisualization from "./AccrualVisualization";
import EmailDialog from "./EmailDialog";
import { toast } from "@/components/ui/use-toast";

export const PTOCalculator: React.FC = () => {
  const [name, setName] = useState("");
  const [annualSalary, setAnnualSalary] = useState(500000);
  const [employmentType, setEmploymentType] = useState<EmploymentType>("Full-Time");
  const [yearsOfService, setYearsOfService] = useState(1);
  const [workingDaysPerWeek, setWorkingDaysPerWeek] = useState(5);
  const [result, setResult] = useState<PTOCalculationResult | null>(null);
  
  const handleCalculate = () => {
    if (!name || annualSalary <= 0) {
      toast({
        title: "Missing Information",
        description: "Please ensure you've entered your name and a valid salary.",
        variant: "destructive",
      });
      return;
    }
    
    const calculationParams = {
      annualSalary,
      employmentType,
      yearsOfService,
      workingDaysPerWeek,
    };
    
    const calculationResult = calculatePTOAccrual(calculationParams);
    setResult(calculationResult);
    
    toast({
      title: "Calculation Complete",
      description: "Your PTO accrual has been calculated successfully.",
    });
  };
  
  const handleDownloadPDF = () => {
    if (!result || !name) return;
    downloadPDF(result, name);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-4">
      <Card className="shadow-lg border-secondary/30 animate-fade-in">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl">PTO Accrual Calculator</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Calculate your Paid Time Off accrual based on your employment details
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="salary">Annual Salary</Label>
                <div className="flex items-center text-primary font-semibold">
                  <BadgeIndianRupee className="h-4 w-4 mr-1" />
                  {formatCurrency(annualSalary)}
                </div>
              </div>
              <Input
                id="salary"
                type="number"
                min="100000"
                step="10000"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="employment-type">Employment Type</Label>
              <Select
                value={employmentType}
                onValueChange={(value) => setEmploymentType(value as EmploymentType)}
              >
                <SelectTrigger id="employment-type" className="w-full">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="years-service">Years of Service</Label>
                <span className="text-charcoal">{yearsOfService} years</span>
              </div>
              <Slider
                id="years-service"
                min={0}
                max={20}
                step={1}
                value={[yearsOfService]}
                onValueChange={(values) => setYearsOfService(values[0])}
                className="py-4"
              />
            </div>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="working-days">Working Days per Week</Label>
                <span className="text-charcoal">{workingDaysPerWeek} days</span>
              </div>
              <Slider
                id="working-days"
                min={1}
                max={6}
                step={1}
                value={[workingDaysPerWeek]}
                onValueChange={(values) => setWorkingDaysPerWeek(values[0])}
                className="py-4"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={handleCalculate} 
            className="bg-accent text-accent-foreground hover:bg-accent/90 w-full py-6 text-lg font-semibold shadow-md"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate PTO Accrual
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <>
          <Card className="shadow-lg border-secondary/30 animate-slide-in">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-2xl">Your PTO Accrual Results</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Based on your provided employment details
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-4">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h3 className="text-primary font-semibold mb-1">Total Annual PTO</h3>
                    <p className="text-3xl font-bold">{result.totalPTODays} days</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h3 className="text-primary font-semibold mb-1">Monthly Accrual</h3>
                    <p className="text-3xl font-bold">{result.ptoDaysPerMonth.toFixed(2)} days</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h3 className="text-primary font-semibold mb-1">PTO Value Per Day</h3>
                    <p className="text-3xl font-bold">{formatCurrency(result.ptoValuePerDay)}</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h3 className="text-primary font-semibold mb-1">Total PTO Value</h3>
                    <p className="text-3xl font-bold">{formatCurrency(result.totalPTOValue)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={handleDownloadPDF} 
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Results (PDF)
              </Button>
              <EmailDialog result={result} userName={name} />
            </CardFooter>
          </Card>

          <AccrualVisualization result={result} />
        </>
      )}
    </div>
  );
};

export default PTOCalculator;
