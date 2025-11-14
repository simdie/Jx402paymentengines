import { LayoutDashboard, ArrowLeftRight, Key, BarChart3, Settings, ChevronLeft, Menu, Zap, Shield, Globe } from 'lucide-react';

type Page = 'overview' | 'transactions' | 'api-keys' | 'analytics' | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { id: 'overview' as Page, label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'transactions' as Page, label: 'Transactions', icon: ArrowLeftRight, badge: '12' },
    { id: 'api-keys' as Page, label: 'API Keys', icon: Key, badge: null },
    { id: 'analytics' as Page, label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'settings' as Page, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 md:hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-lg shadow-premium-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-gradient-to-b from-blue-950 via-blue-950 to-blue-900 text-white flex flex-col
          transition-transform duration-300 shadow-premium-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-900/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-premium">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl text-white">JX402</h1>
              </div>
              <p className="text-xs text-blue-300 mt-1">Cross Border Payment Engine</p>
            </div>
            <button onClick={onToggle} className="md:hidden text-blue-300 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-blue-900/50">
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-3 border border-blue-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-blue-300">Today's Volume</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
            <p className="text-white">$142,580</p>
            <p className="text-xs text-green-400 mt-1">↑ 12.5% vs yesterday</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (window.innerWidth < 768) onToggle();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group relative overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-premium-lg scale-[1.02]' 
                    : 'text-blue-200 hover:bg-blue-900/50 hover:text-white'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500" />
                )}
                
                {/* Icon with hover effect */}
                <div className={`
                  ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                  transition-transform duration-200
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <span className="flex-1 text-left">{item.label}</span>
                
                {/* Badge */}
                {item.badge && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse-slow">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-blue-900/50">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-300">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400">Active</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-300">
                <Globe className="w-4 h-4" />
                <span>Network</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400">Online</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-300">
                <Zap className="w-4 h-4" />
                <span>API</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400">99.9%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-900/50">
            <p className="text-xs text-blue-400">Version 1.2.0</p>
            <p className="text-xs text-blue-500 mt-1">Build 2025.11.13</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
        />
      )}
    </>
  );
}
