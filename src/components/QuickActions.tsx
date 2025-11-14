import { useState } from 'react';
import { Send, DollarSign, Zap, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from 'sonner@2.0.3';

export function QuickActions() {
  const [showSimulator, setShowSimulator] = useState(false);
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('NGN');
  const [simulating, setSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const simulationSteps = [
    { label: 'Fiat Input (Circle ACH)', duration: 100 },
    { label: 'Rust Router Validation', duration: 200 },
    { label: 'Polygon USDC Transfer', duration: 2300 },
    { label: 'x402 Micropay Split', duration: 300 },
    { label: `${currency} Off-ramp`, duration: 1800 },
    { label: 'Bank/Wallet Payout', duration: 3500 },
    { label: '$HYPE Rewards Trigger', duration: 100 },
  ];

  const handleSimulate = () => {
    setSimulating(true);
    setSimulationComplete(false);
    setCurrentStep(0);
    
    // Simulate each step
    let totalTime = 0;
    simulationSteps.forEach((step, index) => {
      totalTime += step.duration;
      setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === simulationSteps.length - 1) {
          setSimulating(false);
          setSimulationComplete(true);
          toast.success('Simulation Complete!', {
            description: `$${amount} USD → ${currency} in ${(totalTime / 1000).toFixed(1)}s`,
          });
        }
      }, totalTime);
    });
  };

  const exchangeRates: Record<string, number> = {
    NGN: 1650,
    GHS: 15.5,
    BRL: 5.2,
    KES: 158,
  };

  const convertedAmount = (parseFloat(amount) || 0) * exchangeRates[currency];

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-xl p-6 text-white shadow-premium-xl">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-blue-200" />
              <h3 className="text-white">Quick Actions</h3>
            </div>
            <p className="text-blue-100 text-sm">Test the payment flow or send a real transaction instantly</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowSimulator(true)}
              className="gap-2 bg-white text-blue-700 hover:bg-blue-50 shadow-premium transition-all hover-scale"
            >
              <Send className="w-4 h-4" />
              Simulate Remit
            </Button>
            <Button className="gap-2 bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all hover-scale">
              <DollarSign className="w-4 h-4" />
              New Transaction
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showSimulator} onOpenChange={setShowSimulator}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Simulate Remittance Flow
            </DialogTitle>
            <DialogDescription>
              Test the complete USD → {currency} payment journey with real-time flow visualization
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="100"
                />
              </div>
              
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Destination Currency</label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                    <SelectItem value="GHS">GHS - Ghanaian Cedi</SelectItem>
                    <SelectItem value="BRL">BRL - Brazilian Real</SelectItem>
                    <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Conversion Preview */}
            {!simulating && !simulationComplete && (
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">You send</p>
                    <p className="text-slate-900">${amount} USD</p>
                  </div>
                  <div className="text-slate-400">→</div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Recipient gets</p>
                    <p className="text-slate-900">{convertedAmount.toLocaleString()} {currency}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Processing fee</span>
                  <span className="text-green-600">$0.50 (0.5%)</span>
                </div>
              </div>
            )}

            {/* Simulation Progress */}
            {simulating && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <p className="text-sm text-blue-900">Processing simulation...</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  {simulationSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {currentStep > index ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : currentStep === index ? (
                        <Clock className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${
                        currentStep > index ? 'text-green-700' :
                        currentStep === index ? 'text-blue-700' :
                        'text-slate-500'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / simulationSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Completion */}
            {simulationComplete && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-green-900 mb-1">Simulation Complete!</p>
                    <p className="text-xs text-green-700">
                      ${amount} USD → {convertedAmount.toLocaleString()} {currency}
                    </p>
                    <div className="mt-2 pt-2 border-t border-green-200 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-green-600">Processing Time:</span>
                        <span className="text-green-900 ml-1">2.3s</span>
                      </div>
                      <div>
                        <span className="text-green-600">Fee:</span>
                        <span className="text-green-900 ml-1">$0.50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => {
                setShowSimulator(false);
                setSimulationComplete(false);
                setSimulating(false);
              }} 
              variant="outline" 
              className="flex-1"
            >
              Close
            </Button>
            <Button 
              onClick={handleSimulate} 
              disabled={simulating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {simulating ? 'Simulating...' : simulationComplete ? 'Run Again' : 'Run Simulation'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
