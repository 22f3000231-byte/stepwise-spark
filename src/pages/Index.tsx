import OnboardingChecklist from "@/components/OnboardingChecklist";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Web3 Payment Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with crypto payments in just a few simple steps. Complete your onboarding to unlock seamless blockchain transactions.
          </p>
        </div>
        
        <OnboardingChecklist />
      </div>
    </div>
  );
};

export default Index;
