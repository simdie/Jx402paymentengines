import { Bell, User, LogOut, Search, Settings, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  const [notificationCount] = useState(3);

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 lg:px-8 py-4 shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-slate-900">Client Dashboard</h2>
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-premium">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-white" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-white animate-ping opacity-75" />
              </div>
              <span className="text-xs text-white">Production</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">JX402 Cross Border Payment Engine</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Quick search..."
                className="pl-9 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Help */}
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors group">
            <HelpCircle className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors group">
                <Bell className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                {notificationCount > 0 && (
                  <>
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">{notificationCount}</span>
                    </span>
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer border-l-4 border-blue-500">
                  <p className="text-sm text-slate-900">New transaction completed</p>
                  <p className="text-xs text-slate-500 mt-1">TXN-8942 • $250.00 • 2 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer border-l-4 border-green-500">
                  <p className="text-sm text-slate-900">$HYPE rewards earned</p>
                  <p className="text-xs text-slate-500 mt-1">+89 tokens • 1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer border-l-4 border-orange-500">
                  <p className="text-sm text-slate-900">System update scheduled</p>
                  <p className="text-xs text-slate-500 mt-1">Maintenance window • Tomorrow 2AM UTC</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600 cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all group border border-slate-200">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-premium">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm hidden md:block text-left">
                  <p className="text-slate-900 group-hover:text-blue-600 transition-colors">Admin User</p>
                  <p className="text-xs text-slate-500">admin@client.com</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
