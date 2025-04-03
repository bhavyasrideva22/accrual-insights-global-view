
/**
 * Formats a number as Indian Rupee (INR) currency
 * @param value The number to format
 * @returns Formatted string with currency symbol
 */
export function formatCurrency(value: number): string {
  // Format as Indian currency with ₹ symbol
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(value);
}
