import { useState } from 'react';
import { ChevronLeft, Download, Calendar, TrendingUp, Activity, BarChart3, PieChart as PieChartIcon, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AnalyticsProps {
  onNavigate: (page: any) => void;
}

export function Analytics({ onNavigate }: AnalyticsProps) {
  const [dateRange, setDateRange] = useState('30days');
  const [activeView, setActiveView] = useState('overview');

  // Volume by Corridor Data
  const volumeByCorridorData = [
    { corridor: 'USA-NGN', volume: 845000, percentage: 60, transactions: 3380, avgSize: 250 },
    { corridor: 'USA-GHS', volume: 352000, percentage: 25, transactions: 1408, avgSize: 250 },
    { corridor: 'USA-BRL', volume: 141000, percentage: 10, transactions: 564, avgSize: 250 },
    { corridor: 'USA-KES', volume: 70500, percentage: 5, transactions: 282, avgSize: 250 },
  ];

  // Fees Saved Data
  const feesSavedData = [
    { name: 'JX402', value: 90, color: '#10b981' },
    { name: 'Legacy', value: 10, color: '#ef4444' },
  ];

  // Transaction Flow Bottlenecks (Heatmap Data)
  const flowBottlenecksData = [
    { step: 'Fiat Input', avgTime: 0.1, status: 'excellent', p95: 0.15, p99: 0.2 },
    { step: 'Rust Router', avgTime: 0.2, status: 'excellent', p95: 0.3, p99: 0.4 },
    { step: 'Polygon Transfer', avgTime: 2.3, status: 'good', p95: 3.2, p99: 4.1 },
    { step: 'Micropay Split', avgTime: 0.3, status: 'excellent', p95: 0.5, p99: 0.7 },
    { step: 'Off-ramp', avgTime: 1.8, status: 'good', p95: 2.5, p99: 3.2 },
    { step: 'Bank Payout', avgTime: 3.5, status: 'warning', p95: 5.2, p99: 6.8 },
    { step: 'Rewards Trigger', avgTime: 0.1, status: 'excellent', p95: 0.2, p99: 0.3 },
  ];

  // Monthly Trends Data
  const monthlyTrendsData = [
    { month: 'Jun', volume: 420000, transactions: 1680, successRate: 99.5, fees: 420 },
    { month: 'Jul', volume: 580000, transactions: 2320, successRate: 99.6, fees: 580 },
    { month: 'Aug', volume: 710000, transactions: 2840, successRate: 99.8, fees: 710 },
    { month: 'Sep', volume: 840000, transactions: 3360, successRate: 99.7, fees: 840 },
    { month: 'Oct', volume: 980000, transactions: 3920, successRate: 99.9, fees: 980 },
    { month: 'Nov', volume: 1230000, transactions: 4920, successRate: 99.9, fees: 1230 },
  ];

  // Peak Hours Data
  const peakHoursData = [
    { hour: '00:00', txns: 120, volume: 30000 },
    { hour: '04:00', txns: 80, volume: 20000 },
    { hour: '08:00', txns: 450, volume: 112500 },
    { hour: '12:00', txns: 680, volume: 170000 },
    { hour: '16:00', txns: 520, volume: 130000 },
    { hour: '20:00', txns: 340, volume: 85000 },
  ];

  // User Growth Data
  const userGrowthData = [
    { month: 'Jun', newUsers: 245, activeUsers: 1680, retention: 85 },
    { month: 'Jul', newUsers: 320, activeUsers: 2320, retention: 87 },
    { month: 'Aug', newUsers: 410, activeUsers: 2840, retention: 88 },
    { month: 'Sep', newUsers: 520, activeUsers: 3360, retention: 89 },
    { month: 'Oct', newUsers: 640, activeUsers: 3920, retention: 91 },
    { month: 'Nov', newUsers: 780, activeUsers: 4920, retention: 92 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-slate-300';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 text-green-700 border-green-200';
      case 'good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleDownloadReport = (format: 'png' | 'csv' | 'pdf') => {
    if (format === 'csv') {
      const csv = [
        ['Corridor', 'Volume', 'Percentage', 'Transactions', 'Avg Size'],
        ...volumeByCorridorData.map(item => [
          item.corridor, 
          `$${item.volume}`, 
          `${item.percentage}%`,
          item.transactions,
          `$${item.avgSize}`
        ])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jx402-analytics-${dateRange}-${Date.now()}.csv`;
      a.click();
    } else if (format === 'pdf') {
      alert('PDF export feature: Would generate a comprehensive PDF report with all charts and metrics');
    } else {
      alert('PNG export feature: Would capture the current analytics view as a high-resolution image');
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-premium-lg p-3">
          <p className="text-sm text-slate-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate('overview')}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Overview
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-slate-900">Analytics Dashboard</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span className="text-xs text-green-700">Live Data</span>
            </div>
          </div>
          <p className="text-slate-600">Comprehensive insights into your payment flows and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-44 shadow-premium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleDownloadReport('csv')} variant="outline" size="sm" className="gap-2 shadow-premium">
            <Download className="w-4 h-4" />
            CSV
          </Button>
          <Button onClick={() => handleDownloadReport('pdf')} variant="outline" size="sm" className="gap-2 shadow-premium">
            <Download className="w-4 h-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-premium-lg">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-blue-100">Total Volume</p>
            <BarChart3 className="w-5 h-5 text-blue-100" />
          </div>
          <p className="text-white mb-1">$1.23M</p>
          <div className="flex items-center gap-1 text-xs text-blue-100">
            <TrendingUp className="w-3 h-3" />
            <span>+26% vs last period</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-premium-lg">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-green-100">Avg Transaction</p>
            <Activity className="w-5 h-5 text-green-100" />
          </div>
          <p className="text-white mb-1">$250</p>
          <div className="flex items-center gap-1 text-xs text-green-100">
            <TrendingUp className="w-3 h-3" />
            <span>Consistent performance</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-premium-lg">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-purple-100">Processing Time</p>
            <Activity className="w-5 h-5 text-purple-100" />
          </div>
          <p className="text-white mb-1">2.3s</p>
          <div className="flex items-center gap-1 text-xs text-purple-100">
            <TrendingUp className="w-3 h-3" />
            <span>-15% faster</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-premium-lg">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-orange-100">Success Rate</p>
            <PieChartIcon className="w-5 h-5 text-orange-100" />
          </div>
          <p className="text-white mb-1">99.9%</p>
          <div className="flex items-center gap-1 text-xs text-orange-100">
            <TrendingUp className="w-3 h-3" />
            <span>Industry leading</span>
          </div>
        </div>
      </div>

      {/* Tabs for Different Views */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="bg-white border border-slate-200 p-1 shadow-premium">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="corridors">Corridors</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Volume by Corridor */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-slate-900">Volume by Corridor</h3>
                  <p className="text-sm text-slate-500 mt-1">Transaction distribution across regions</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeByCorridorData}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="corridor" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="volume" fill="url(#colorVolume)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {volumeByCorridorData.map((item) => (
                  <div key={item.corridor} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-sm text-slate-700">{item.corridor}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-900">${(item.volume / 1000).toFixed(0)}K</span>
                      <span className="text-sm text-blue-600">{item.percentage}%</span>
                      <span className="text-xs text-slate-500">{item.transactions} txns</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees Saved */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300">
              <h3 className="text-slate-900 mb-1">Fees: JX402 vs Legacy Systems</h3>
              <p className="text-sm text-slate-500 mb-4">Cost comparison and savings</p>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feesSavedData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {feesSavedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-900">
                      <span>Average savings: </span>
                      <span className="text-green-700">90% lower fees</span> compared to traditional wire transfers
                    </p>
                    <p className="text-xs text-green-700 mt-1">Estimated monthly savings: $11,070</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900">Monthly Trends</h3>
                <p className="text-sm text-slate-500 mt-1">Volume and performance over time</p>
              </div>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendsData}>
                  <defs>
                    <linearGradient id="colorVolumeArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="volume" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVolumeArea)" strokeWidth={2} name="Volume ($)" />
                  <Area yAxisId="right" type="monotone" dataKey="successRate" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccess)" strokeWidth={2} name="Success Rate (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="corridors" className="space-y-6">
          {/* Peak Hours */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900">Peak Transaction Hours</h3>
                <p className="text-sm text-slate-500 mt-1">Hourly transaction volume distribution</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={peakHoursData}>
                  <defs>
                    <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="txns" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPeak)" strokeWidth={2} name="Transactions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Transaction Flow Bottlenecks */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-slate-900">A-Z Flow Performance Analysis</h3>
              <p className="text-sm text-slate-500 mt-1">Average processing time per step with percentile metrics</p>
            </div>
            <div className="space-y-4">
              {flowBottlenecksData.map((step, index) => (
                <div key={step.step} className="group">
                  <div className="flex items-center gap-4">
                    <div className="w-40 text-sm text-slate-700">{step.step}</div>
                    <div className="flex-1 bg-slate-100 rounded-full h-10 relative overflow-hidden">
                      <div
                        className={`h-full ${getStatusColor(step.status)} transition-all duration-500 ease-out`}
                        style={{ 
                          width: `${(step.avgTime / 3.5) * 100}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-sm text-slate-700">
                        {step.avgTime}s avg
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs border ${getStatusBadgeColor(step.status)}`}>
                      {step.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-44 mt-1 flex items-center gap-4 text-xs text-slate-500">
                    <span>P95: {step.p95}s</span>
                    <span>P99: {step.p99}s</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-8 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Excellent {'(<0.5s)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Good (0.5-2.5s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Warning (2.5-5s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Critical {('(>5s)')}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Growth */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900">User Growth & Retention</h3>
                <p className="text-sm text-slate-500 mt-1">New user acquisition and retention metrics</p>
              </div>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} name="New Users" />
                  <Line yAxisId="left" type="monotone" dataKey="activeUsers" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} name="Active Users" />
                  <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Retention (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}