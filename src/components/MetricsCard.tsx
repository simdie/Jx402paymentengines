import { LucideIcon, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MetricsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
  isLive?: boolean;
}

export function MetricsCard({ title, value, change, trend, subtitle, icon: Icon, color, isLive }: MetricsCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [value]);

  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      glow: 'shadow-blue-500/20'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      light: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      glow: 'shadow-green-500/20'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      glow: 'shadow-purple-500/20'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      light: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      glow: 'shadow-orange-500/20'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${isAnimating ? 'animate-count-up' : ''}`}>
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 ${currentColor.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${currentColor.bg}`} />
            <div className={`absolute inset-0 w-2 h-2 rounded-full ${currentColor.bg} animate-ping opacity-75`} />
          </div>
          <span className="text-xs text-slate-500">Live</span>
        </div>
      )}

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 mb-2 group-hover:text-slate-700 transition-colors">{title}</p>
          <p className={`text-slate-900 mb-1 transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
            {value}
          </p>
          {change && (
            <div className="flex items-center gap-1.5 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-600" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
              <span className="text-xs text-slate-400">vs last period</span>
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
              <span>{subtitle}</span>
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl ${currentColor.bg} flex items-center justify-center shadow-lg ${currentColor.glow} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${currentColor.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </div>
  );
}
