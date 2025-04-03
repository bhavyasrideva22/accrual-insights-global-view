
// Employment type options
export type EmploymentType = "Full-Time" | "Part-Time" | "Contract";

// Input parameters for PTO calculation
export interface PTOCalculationParams {
  annualSalary: number;
  employmentType: EmploymentType;
  yearsOfService: number;
  workingDaysPerWeek: number;
}

// Results of PTO calculation
export interface PTOCalculationResult extends PTOCalculationParams {
  totalPTODays: number;
  ptoDaysPerMonth: number;
  ptoValuePerDay: number;
  totalPTOValue: number;
  accrualRatePercentage: number;
  monthlyAccrualDays: number[];
  cumulativeAccrualDays: number[];
}
