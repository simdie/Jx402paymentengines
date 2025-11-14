import { useState } from 'react';
import { createContext, useContext } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './components/pages/Overview';
import { Transactions } from './components/pages/Transactions';
import { APIKeys } from './components/pages/APIKeys';
import { Analytics } from './components/pages/Analytics';
import { Settings } from './components/pages/Settings';
import { LogoutModal } from './components/LogoutModal';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'overview' | 'transactions' | 'api-keys' | 'analytics' | 'settings'>('overview');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '');

  const handleLogout = () => {
    localStorage.clear();
    // Mock logout - in real app would redirect to login
    console.log('User logged out');
    setShowLogoutModal(false);
    alert('Logged out successfully');
  };

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey }}>
      <>
        <Toaster position="top-right" richColors />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
          <Sidebar 
            currentPage={currentPage} 
            onNavigate={setCurrentPage}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Header onLogout={() => setShowLogoutModal(true)} />
            
            <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
              <div key={currentPage} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentPage === 'overview' && <Overview />}
                {currentPage === 'transactions' && <Transactions onNavigate={setCurrentPage} />}
                {currentPage === 'api-keys' && <APIKeys onNavigate={setCurrentPage} />}
                {currentPage === 'analytics' && <Analytics onNavigate={setCurrentPage} />}
                {currentPage === 'settings' && <Settings onNavigate={setCurrentPage} />}
              </div>
            </main>
          </div>

          <LogoutModal 
            isOpen={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
          />
        </div>
      </>
    </ApiContext.Provider>
  );
}

// Create ApiContext
interface ApiContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within ApiContext.Provider');
  }
  return context;
}