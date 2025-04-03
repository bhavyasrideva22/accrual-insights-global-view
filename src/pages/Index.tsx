
import React from "react";
import PTOCalculator from "@/components/PTOCalculator";
import PTOExplanation from "@/components/PTOExplanation";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream pb-16">
      <header className="bg-primary text-primary-foreground py-8 mb-8 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">PTO Accrual Calculator</h1>
          <p className="text-xl text-primary-foreground/80">
            Plan your paid time off with precision for global teams
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4">
        <PTOExplanation />
        <PTOCalculator />
        
        <div className="mt-16 text-center text-sm text-charcoal/60">
          <p>© 2025 Accrual Insights. All rights reserved.</p>
          <p>This calculator is for informational purposes only and does not constitute legal or HR advice.</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
