import { DollarSign, TrendingUp, Zap, Award, Activity, Globe, Shield, Clock } from 'lucide-react';
import { MetricsCard } from '../MetricsCard';
import { TransactionFlowChart } from '../TransactionFlowChart';
import { RewardsWidget } from '../RewardsWidget';
import { RecentTransactions } from '../RecentTransactions';
import { QuickActions } from '../QuickActions';
import { useEffect, useState } from 'react';
import { useApi } from '../../App';

export function Overview() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { apiKey } = useApi();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Wire to QuickActions button in separate file
  const handleSimulate = async () => {
    if (!apiKey) {
      return console.error('No API key');
    }
    
    try {
      const res = await fetch('https://jx402-api.lubaking-co.workers.dev/remit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          amount: 100,
          to: 'NGN',
          corridor: 'USA-Nigeria'
        })
      });
      const data = await res.json();
      console.log('Remit Success:', data);
    } catch (err) {
      console.error('Remit Failed:', err);
    }
  };

  const metrics = [
    {
      title: 'Volume Today',
      value: '$142,580',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'blue' as const,
      isLive: true
    },
    {
      title: 'Success Rate',
      value: '99.9%',
      change: '+0.2%',
      trend: 'up' as const,
      icon: Zap,
      color: 'green' as const,
      isLive: true
    },
    {
      title: 'Fees Saved',
      value: '90%',
      subtitle: 'vs. legacy systems',
      icon: TrendingUp,
      color: 'purple' as const
    },
    {
      title: '$HYPE Rewards',
      value: '1,247',
      change: '+89 today',
      trend: 'up' as const,
      icon: Award,
      color: 'orange' as const
    }
  ];

  const systemStats = [
    { label: 'Active Corridors', value: '24', icon: Globe },
    { label: 'Avg Processing', value: '2.3s', icon: Clock },
    { label: 'Uptime', value: '99.99%', icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Section with Real-time Clock */}
      <div className="relative">
        <div className="absolute top-0 right-0 text-right">
          <div className="text-sm text-slate-500">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="text-sm text-slate-400">
            {currentTime.toLocaleTimeString('en-US')}
          </div>
        </div>
        <div className="pr-48">
          <h1 className="text-slate-900 mb-1 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text">
            Welcome back!
          </h1>
          <p className="text-slate-600">Here's what's happening with your cross-border payments today.</p>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-in slide-in-from-bottom-4 duration-500"
          >
            <MetricsCard {...metric} />
          </div>
        ))}
      </div>

      {/* System Stats Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-premium-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white">System Status</h3>
              <p className="text-sm text-blue-100">All systems operational</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {systemStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-blue-100" />
                  <p className="text-xs text-blue-100">{stat.label}</p>
                </div>
                <p className="text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions handleSimulate={handleSimulate} />

      {/* Transaction Flow */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-slate-900">Live Transaction Flow</h3>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="text-xs text-green-600">Active</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Real-time visualization of the A-Z payment journey from fiat input to final payout
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-600">Avg: 2.3s</span>
          </div>
        </div>
        <TransactionFlowChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>

        {/* Rewards Widget */}
        <div>
          <RewardsWidget />
        </div>
      </div>
    </div>
  );
}