import React from "react";
import { Check, Mail, Building2, Wallet, Settings, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Step {
  id: number;
  title: string;
  description: string;
  status: "completed" | "active" | "pending";
  icon: React.ComponentType<any>;
  action?: string;
  details?: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Account Setup",
    description: "Complete your profile and verification",
    status: "completed",
    icon: Building2,
    details: ["✓ Verify Your Email", "✓ Business Information"]
  },
  {
    id: 2,
    title: "Payment Methods",
    description: "Configure your payment options",
    status: "completed",
    icon: Wallet,
    details: ["✓ Choose WalletConnect or Manual Payments", "✓ Configure Blockchain Networks"]
  },
  {
    id: 3,
    title: "Create Invoice",
    description: "Generate your first payment link",
    status: "active",
    icon: FileText,
    action: "Start",
    details: ["Generate Your First Payment Link"]
  },
  {
    id: 4,
    title: "Wallet Top-Up",
    description: "$10 credit included for gas fees",
    status: "pending",
    icon: Plus,
    details: ["Add funds for future transactions"]
  }
];

const OnboardingChecklist: React.FC = () => {
  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const getStepIcon = (step: Step) => {
    const IconComponent = step.icon;
    
    if (step.status === "completed") {
      return (
        <div className="relative">
          <div className="w-12 h-12 rounded-full step-completed flex items-center justify-center transition-all duration-300">
            <Check className="w-6 h-6" />
          </div>
        </div>
      );
    }
    
    if (step.status === "active") {
      return (
        <div className="w-12 h-12 rounded-full step-active flex items-center justify-center transition-all duration-300 animate-pulse">
          <IconComponent className="w-6 h-6" />
        </div>
      );
    }
    
    return (
      <div className="w-12 h-12 rounded-full step-pending flex items-center justify-center transition-all duration-300">
        <IconComponent className="w-6 h-6" />
      </div>
    );
  };

  const handleStepAction = (stepId: number) => {
    console.log(`Action triggered for step ${stepId}`);
    // Add your step action logic here
  };

  return (
    <Card className="crypto-card max-w-2xl mx-auto transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Getting Started
          </CardTitle>
          <div className="text-right">
            <p className="text-sm text-crypto-muted mb-1">Progress</p>
            <p className="text-xl font-bold text-crypto-primary">{progressPercentage}% completed</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div 
              className="crypto-progress-bar h-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`relative flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-slate-50 ${
              step.status === "active" ? "bg-violet-50 ring-1 ring-violet-200" : ""
            }`}
          >
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute left-6 top-16 w-0.5 h-8 transition-colors duration-300 ${
                  step.status === "completed" ? "bg-emerald-500" : "bg-slate-200"
                }`}
              />
            )}
            
            {/* Step icon */}
            {getStepIcon(step)}
            
            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold text-lg ${
                  step.status === "active" ? "text-crypto-primary" : "text-foreground"
                }`}>
                  {step.title}
                </h3>
                
                {step.action && step.status === "active" && (
                  <Button 
                    onClick={() => handleStepAction(step.id)}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {step.action}
                  </Button>
                )}
              </div>
              
              <p className={`text-sm mb-3 ${
                step.status === "active" ? "text-crypto-muted" : "text-muted-foreground"
              }`}>
                {step.description}
              </p>
              
              {/* Step details */}
              {step.details && (
                <div className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <p 
                      key={detailIndex}
                      className={`text-xs ${
                        step.status === "completed" 
                          ? "text-emerald-600 font-medium" 
                          : step.status === "active"
                          ? "text-crypto-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OnboardingChecklist;