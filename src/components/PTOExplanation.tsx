
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const PTOExplanation: React.FC = () => {
  return (
    <Card className="shadow-lg border-secondary/30 mb-8 animate-fade-in">
      <CardContent className="prose prose-lg max-w-none p-6 text-charcoal">
        <h2 className="text-3xl font-bold text-primary mb-4">Understanding PTO Accrual: A Global Perspective</h2>
        
        <p className="text-lg">
          Paid Time Off (PTO) is a crucial aspect of employment benefits worldwide, providing employees with paid leave for vacations, personal time, and sometimes sick days. Our PTO Accrual Calculator offers a comprehensive tool for global teams to understand and plan their time-off benefits.
        </p>
        
        <h3 className="text-2xl font-semibold text-primary mt-6 mb-3">What is PTO Accrual?</h3>
        
        <p>
          PTO accrual refers to the gradual accumulation of paid time off throughout the employment period. Rather than receiving a lump sum of days at the start of the year, employees "earn" or "accrue" their time off as they work. This system is particularly beneficial for global companies with teams across different countries, as it:
        </p>
        
        <ul className="list-disc ml-6 mb-4">
          <li>Provides a standardized approach to time-off management</li>
          <li>Allows for fair distribution of benefits based on tenure</li>
          <li>Helps both employers and employees track available time off</li>
          <li>Enables financial planning for both parties</li>
          <li>Accommodates different regional employment practices</li>
        </ul>
        
        <h3 className="text-2xl font-semibold text-primary mt-6 mb-3">How Our Calculator Works</h3>
        
        <p>
          Our calculator takes into account several key factors that influence PTO accrual:
        </p>
        
        <ol className="list-decimal ml-6 mb-4">
          <li><strong>Annual Salary:</strong> Your yearly compensation in Indian Rupees (₹)</li>
          <li><strong>Employment Type:</strong> Whether you're full-time, part-time, or on contract</li>
          <li><strong>Years of Service:</strong> How long you've been with your employer</li>
          <li><strong>Working Days Per Week:</strong> Your standard work schedule</li>
        </ol>
        
        <p>
          Based on these inputs, the calculator determines your total annual PTO days, monthly accrual rate, the monetary value of each PTO day, and the total value of your annual PTO benefits.
        </p>
        
        <h3 className="text-2xl font-semibold text-primary mt-6 mb-3">Benefits of Understanding Your PTO Accrual</h3>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">For Employees</h4>
            <ul className="list-disc ml-4">
              <li>Better planning of vacations and personal time</li>
              <li>Understanding the financial value of your benefits</li>
              <li>Tracking accumulated time off throughout the year</li>
              <li>Making informed decisions about taking unpaid leave</li>
            </ul>
          </div>
          
          <div className="bg-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">For Employers</h4>
            <ul className="list-disc ml-4">
              <li>Standardizing benefits across global teams</li>
              <li>Better forecasting of workforce availability</li>
              <li>Transparent communication of employee benefits</li>
              <li>Managing the financial aspects of PTO programs</li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold text-primary mt-6 mb-3">Global Variations in PTO Policies</h3>
        
        <p>
          While our calculator provides a standardized approach, it's important to note that PTO policies vary significantly across different countries:
        </p>
        
        <ul className="list-disc ml-6 mb-4">
          <li><strong>European countries</strong> typically offer more generous statutory PTO (often 20-30 days annually)</li>
          <li><strong>The United States</strong> has no federal PTO requirements, with policies determined by employers</li>
          <li><strong>Asian countries</strong> like Japan, South Korea, and India have varying statutory minimums</li>
          <li><strong>Australia and New Zealand</strong> generally mandate 4 weeks of annual leave</li>
        </ul>
        
        <p>
          For global teams, having a unified understanding of PTO accrual helps create equity across regions while respecting local regulations.
        </p>
        
        <h3 className="text-2xl font-semibold text-primary mt-6 mb-3">Making the Most of Your PTO Benefits</h3>
        
        <p>
          Understanding your PTO accrual is just the first step. To maximize the benefits of your paid time off:
        </p>
        
        <ol className="list-decimal ml-6 mb-4">
          <li>Plan your time off strategically throughout the year</li>
          <li>Be aware of any "use it or lose it" policies at your company</li>
          <li>Consider the monetary value when making decisions about unused PTO</li>
          <li>Understand how PTO fits into your overall compensation package</li>
          <li>Keep track of your accrual and usage throughout the year</li>
        </ol>
        
        <p className="text-lg font-medium text-primary mt-6">
          Our PTO Accrual Calculator provides the insights you need to make informed decisions about your paid time off benefits. Try it today to better understand and plan your valuable time away from work.
        </p>
      </CardContent>
    </Card>
  );
};

export default PTOExplanation;
