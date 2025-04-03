
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PTOCalculationResult } from "@/types/calculator";

interface AccrualVisualizationProps {
  result: PTOCalculationResult;
}

// Format data for charts
const prepareChartData = (result: PTOCalculationResult) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return months.map((month, index) => ({
    month,
    monthlyAccrual: parseFloat(result.monthlyAccrualDays[index].toFixed(2)),
    cumulativeAccrual: parseFloat(result.cumulativeAccrualDays[index].toFixed(2)),
  }));
};

export const AccrualVisualization: React.FC<AccrualVisualizationProps> = ({ result }) => {
  const chartData = prepareChartData(result);

  return (
    <Card className="w-full shadow-lg border-secondary/30 animate-fade-in">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-xl">PTO Accrual Visualization</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Visual representation of your PTO accrual throughout the year
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="bar">Monthly Accrual</TabsTrigger>
            <TabsTrigger value="line">Cumulative Accrual</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} days`, 'Monthly Accrual']}
                  labelStyle={{ color: '#333' }}
                  contentStyle={{ 
                    backgroundColor: '#f8f8f8', 
                    border: '1px solid #7ac9a7',
                    borderRadius: '4px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: 20 }} />
                <Bar 
                  dataKey="monthlyAccrual" 
                  name="Monthly Accrual (Days)" 
                  fill="#7ac9a7" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="line" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} days`, 'Cumulative Accrual']}
                  labelStyle={{ color: '#333' }}
                  contentStyle={{ 
                    backgroundColor: '#f8f8f8', 
                    border: '1px solid #245e4f',
                    borderRadius: '4px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: 20 }} />
                <Line 
                  type="monotone"
                  dataKey="cumulativeAccrual"
                  name="Cumulative Accrual (Days)"
                  stroke="#245e4f"
                  strokeWidth={2}
                  dot={{ fill: '#245e4f', r: 4 }}
                  activeDot={{ r: 6, fill: "#e9c46a" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccrualVisualization;
