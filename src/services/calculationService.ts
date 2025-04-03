
import { PTOCalculationParams, PTOCalculationResult } from "@/types/calculator";

/**
 * Calculates PTO accrual based on input parameters
 */
export const calculatePTOAccrual = (params: PTOCalculationParams): PTOCalculationResult => {
  const { annualSalary, employmentType, yearsOfService, workingDaysPerWeek } = params;
  
  // Base accrual rates by employment type (days per year)
  const baseAccrualRates = {
    "Full-Time": 15,
    "Part-Time": 10,
    "Contract": 5
  };
  
  // Additional days based on years of service
  let additionalDays = 0;
  if (yearsOfService >= 5 && yearsOfService < 10) {
    additionalDays = 5;
  } else if (yearsOfService >= 10) {
    additionalDays = 10;
  }
  
  // Calculate total PTO days
  const baseAccrual = baseAccrualRates[employmentType];
  const totalPTODays = baseAccrual + additionalDays;
  
  // Calculate PTO accrual rate as percentage
  const workingDaysPerYear = workingDaysPerWeek * 52;
  const accrualRatePercentage = (totalPTODays / workingDaysPerYear) * 100;
  
  // Calculate PTO value per day
  const ptoValuePerDay = annualSalary / workingDaysPerYear;
  
  // Calculate total PTO value
  const totalPTOValue = ptoValuePerDay * totalPTODays;
  
  // Calculate monthly accrual
  const ptoDaysPerMonth = totalPTODays / 12;
  
  // Generate monthly accrual data for visualization
  const monthlyAccrualDays = Array(12).fill(ptoDaysPerMonth);
  
  // Generate cumulative accrual data for visualization
  const cumulativeAccrualDays = monthlyAccrualDays.reduce(
    (acc: number[], curr: number, i: number) => {
      if (i === 0) return [curr];
      return [...acc, acc[i - 1] + curr];
    },
    []
  );
  
  return {
    ...params,
    totalPTODays,
    ptoDaysPerMonth,
    ptoValuePerDay,
    totalPTOValue,
    accrualRatePercentage,
    monthlyAccrualDays,
    cumulativeAccrualDays
  };
};
