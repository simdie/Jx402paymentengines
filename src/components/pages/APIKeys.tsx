import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../App';
import { ChevronLeft, Plus, Copy, Trash2, AlertTriangle, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface APIKeysProps {
  onNavigate: (page: any) => void;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'expired';
  calls: number;
}

export function APIKeys({ onNavigate }: APIKeysProps) {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const { apiKey } = useApi();

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production Key',
      key: 'jx402_pk_live_abc123def456ghi789',
      created: '2025-09-15',
      lastUsed: '2025-11-11 14:30',
      status: 'active',
      calls: 12450
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'jx402_pk_test_xyz789uvw456rst123',
      created: '2025-10-20',
      lastUsed: '2025-11-11 12:15',
      status: 'active',
      calls: 3280
    },
    {
      id: '3',
      name: 'Legacy Key',
      key: 'jx402_pk_live_old456exp789ired123',
      created: '2025-05-10',
      lastUsed: '2025-09-30 18:45',
      status: 'expired',
      calls: 45120
    }
  ]);

  const usageData = [
    { month: 'Jun', calls: 4200 },
    { month: 'Jul', calls: 5800 },
    { month: 'Aug', calls: 7100 },
    { month: 'Sep', calls: 8400 },
    { month: 'Oct', calls: 9800 },
    { month: 'Nov', calls: 12300 },
  ];

  const errorLogs = [
    { id: 1, timestamp: '2025-11-11 14:25', endpoint: '/api/remit', error: 'Invalid currency code', status: 400 },
    { id: 2, timestamp: '2025-11-11 13:10', endpoint: '/api/balance', error: 'Rate limit exceeded', status: 429 },
    { id: 3, timestamp: '2025-11-11 11:05', endpoint: '/api/remit', error: 'Insufficient funds', status: 402 },
  ];

  const handleGenerateKey = () => {
    const newKey = `jx402_pk_live_${Math.random().toString(36).substr(2, 20)}`;
    const newApiKey: APIKey = {
      id: String(apiKeys.length + 1),
      name: newKeyName || 'New API Key',
      key: newKey,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active',
      calls: 0
    };
    
    setApiKeys([...apiKeys, newApiKey]);
    setGeneratedKey(newKey);
    setNewKeyName('');
  };

  const handleRevokeKey = () => {
    if (selectedKey) {
      setApiKeys(apiKeys.filter(k => k.id !== selectedKey.id));
      setShowRevokeDialog(false);
      setSelectedKey(null);
    }
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate('overview')}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Overview
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-1">API Keys</h1>
          <p className="text-slate-600">Manage your API keys and monitor usage</p>
        </div>
        <Button onClick={() => setShowGenerateModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Generate New Key
        </Button>
      </div>

      {/* API Keys List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-slate-900 mb-4">Your API Keys</h3>
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-slate-900">{apiKey.name}</p>
                    <Badge className={apiKey.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {apiKey.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                      {apiKey.key.substring(0, 30)}...
                    </code>
                    <span>•</span>
                    <span>Created: {apiKey.created}</span>
                    <span>•</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                    <span>•</span>
                    <span>{apiKey.calls.toLocaleString()} calls</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleCopy(apiKey.key)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedKey === apiKey.key ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedKey(apiKey);
                      setShowRevokeDialog(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="gap-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Analytics */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">API Usage (Last 6 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Error Logs */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-slate-900 mb-4">Recent Error Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Endpoint</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Error</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {errorLogs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-100">
                    <td className="py-3 px-4 text-sm text-slate-600">{log.timestamp}</td>
                    <td className="py-3 px-4 text-sm">
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">{log.endpoint}</code>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">{log.error}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-slate-900 mb-3">Quick Integration Guide</h3>
        <p className="text-sm text-slate-600 mb-4">Example Node.js code to get started:</p>
        <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`const JX402 = require('@jx402/sdk');

const client = new JX402({
  apiKey: 'your_api_key_here'
});

// Send remittance
await client.remit({
  amount: 100,
  from: 'USD',
  to: 'NGN',
  recipient: {
    name: 'Chinedu A.',
    account: '1234567890'
  }
});`}
        </pre>
      </div>

      {/* Generate Key Modal */}
      <Dialog open={showGenerateModal} onOpenChange={setShowGenerateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate New API Key</DialogTitle>
            <DialogDescription>
              Create a new API key for your integration. Keep it secure!
            </DialogDescription>
          </DialogHeader>
          
          {generatedKey ? (
            <div className="space-y-4 py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900 mb-2">✓ API Key Generated!</p>
                <p className="text-xs text-green-700 mb-3">
                  Copy this key now - you won't be able to see it again.
                </p>
                <code className="block bg-slate-900 text-green-400 p-3 rounded text-xs break-all">
                  {generatedKey}
                </code>
              </div>
              <Button
                onClick={() => handleCopy(generatedKey)}
                className="w-full gap-2"
              >
                {copiedKey === generatedKey ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Key Name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g., Production API Key"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => {
                setShowGenerateModal(false);
                setGeneratedKey(null);
                setNewKeyName('');
              }}
              variant="outline"
            >
              {generatedKey ? 'Done' : 'Cancel'}
            </Button>
            {!generatedKey && (
              <Button onClick={handleGenerateKey}>
                Generate Key
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Key Dialog */}
      <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Revoke API Key
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke "{selectedKey?.name}"? This action cannot be undone and will
              immediately invalidate all requests using this key.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevokeKey} className="bg-red-600 hover:bg-red-700">
              Revoke Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}