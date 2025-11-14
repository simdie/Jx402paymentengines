import { useState } from 'react';
import { ChevronRight, Check, Clock, Coins, CreditCard, Wallet } from 'lucide-react';

interface FlowStep {
  id: string;
  label: string;
  status: 'completed' | 'pending' | 'waiting';
  time?: string;
  icon: any;
  color: 'green' | 'blue' | 'orange' | 'purple';
  description: string;
}

export function TransactionFlowChart() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const steps: FlowStep[] = [
    {
      id: 'fiat-input',
      label: 'Carlos: Fiat Input',
      status: 'completed',
      time: '0.1s',
      icon: CreditCard,
      color: 'green',
      description: 'USD $100 via Circle ACH on-ramp'
    },
    {
      id: 'rust-router',
      label: 'Rust Security Router',
      status: 'completed',
      time: '0.2s',
      icon: Shield,
      color: 'blue',
      description: 'Rust-secured validation & routing engine'
    },
    {
      id: 'polygon',
      label: 'Polygon Transfer',
      status: 'pending',
      time: '2.0s',
      icon: Coins,
      color: 'blue',
      description: 'Sub-second USDC transfer on Polygon'
    },
    {
      id: 'micropay',
      label: 'x402 Micropay Split',
      status: 'waiting',
      icon: DollarSign,
      color: 'blue',
      description: 'Micropayment processing & splits'
    },
    {
      id: 'offramp',
      label: 'Yellow Card Off-ramp',
      status: 'waiting',
      icon: ArrowDownToLine,
      color: 'green',
      description: 'Compliant NGN conversion'
    },
    {
      id: 'payout',
      label: 'Chinedu: Bank Payout',
      status: 'waiting',
      icon: Wallet,
      color: 'green',
      description: 'Final delivery to mobile wallet/bank'
    },
    {
      id: 'rewards',
      label: '$HYPE Rewards',
      status: 'waiting',
      icon: Award,
      color: 'orange',
      description: 'Loyalty rewards webhook trigger'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-blue-500 animate-pulse';
      case 'waiting': return 'bg-slate-300';
      default: return 'bg-slate-300';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'border-green-200 bg-green-50';
      case 'blue': return 'border-blue-200 bg-blue-50';
      case 'orange': return 'border-orange-200 bg-orange-50';
      case 'purple': return 'border-purple-200 bg-purple-50';
      default: return 'border-slate-200 bg-slate-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Flow visualization */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 min-w-max">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = selectedStep === step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setSelectedStep(step.id)}
                  className={`
                    relative flex flex-col items-center p-4 rounded-lg border-2
                    transition-all hover:scale-105
                    ${getColorClasses(step.color)}
                    ${isSelected ? 'ring-2 ring-blue-600 shadow-lg' : ''}
                  `}
                >
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(step.status)} mb-2`}></div>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                    <Icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <p className="text-xs text-slate-900 text-center whitespace-nowrap">{step.label}</p>
                  {step.time && (
                    <p className="text-xs text-slate-500 mt-1">{step.time}</p>
                  )}
                  {step.status === 'completed' && (
                    <Check className="absolute -top-1 -right-1 w-5 h-5 text-green-600 bg-white rounded-full" />
                  )}
                  {step.status === 'pending' && (
                    <Clock className="absolute -top-1 -right-1 w-5 h-5 text-blue-600 bg-white rounded-full" />
                  )}
                </button>
                
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-slate-400 mx-1 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected step details */}
      {selectedStep && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-900">
            {steps.find(s => s.id === selectedStep)?.description}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300"></div>
          <span>Waiting</span>
        </div>
        <div className="ml-auto text-slate-500">Total time: ~2.3s</div>
      </div>
    </div>
  );
}

// Icons
function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ArrowDownToLine({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3m0 18H4m16 0h-4" />
    </svg>
  );
}

function Award({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}
