import React from "react";
import { Check, UserCheck, CreditCard, FileText, Wallet2 } from "lucide-react";
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
    icon: UserCheck,
    details: ["✓ Verify Your Email", "✓ Business Information"]
  },
  {
    id: 2,
    title: "Payment Methods",
    description: "Configure your payment options",
    status: "completed",
    icon: CreditCard,
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
    icon: Wallet2,
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
          <div className="w-14 h-14 rounded-full step-completed flex items-center justify-center transition-all duration-500 hover:scale-105">
            <Check className="w-7 h-7" strokeWidth={2.5} />
          </div>
        </div>
      );
    }
    
    if (step.status === "active") {
      return (
        <div className="w-14 h-14 rounded-full step-active flex items-center justify-center transition-all duration-500 hover:scale-105">
          <IconComponent className="w-7 h-7" strokeWidth={2.5} />
        </div>
      );
    }
    
    return (
      <div className="w-14 h-14 rounded-full step-pending flex items-center justify-center transition-all duration-500 hover:scale-105">
        <IconComponent className="w-7 h-7" strokeWidth={2} />
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
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Getting Started
          </CardTitle>
          <div className="text-right">
            <p className="text-sm text-crypto-muted mb-1">Progress</p>
            <p className="text-2xl font-bold text-crypto-primary">{progressPercentage}% completed</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gradient-to-r from-gray-200 to-orange-100 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="crypto-progress-bar h-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-500 ease-out hover:shadow-lg ${
              step.status === "active" 
                ? "bg-gradient-to-br from-orange-50/70 to-yellow-50/50 ring-2 ring-orange-200/60 shadow-lg" 
                : "hover:bg-gradient-to-br hover:from-orange-50/30 hover:to-yellow-50/20"
            }`}
          >
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute left-7 top-20 w-1 h-10 rounded-full transition-all duration-500 ${
                  step.status === "completed" 
                    ? "bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-sm" 
                    : "bg-gradient-to-b from-gray-200 to-gray-300"
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
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 text-white font-semibold px-6 py-2"
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