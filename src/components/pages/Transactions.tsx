import { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from '../../App';
import { ChevronLeft, Search, Download, Filter, CheckCircle2, Clock, XCircle, ArrowUpDown, Eye, RefreshCcw, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface TransactionsProps {
  onNavigate: (page: any) => void;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  corridor: string;
  status: 'completed' | 'processing' | 'failed';
  fee: number;
  recipient: string;
  processingTime?: string;
  fromCurrency?: string;
  toCurrency?: string;
}

export function Transactions({ onNavigate }: TransactionsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCorridor, setFilterCorridor] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { apiKey } = useApi();

  // Mock transaction data
  const allTransactions: Transaction[] = [
    { id: 'TXN-8942', date: '2025-11-11 14:32', amount: 250.00, corridor: 'USA-NGN', status: 'completed', fee: 1.25, recipient: 'Chinedu A.', processingTime: '1.8s', fromCurrency: 'USD', toCurrency: 'NGN' },
    { id: 'TXN-8941', date: '2025-11-11 13:18', amount: 100.00, corridor: 'USA-GHS', status: 'completed', fee: 0.50, recipient: 'Kwame O.', processingTime: '2.1s', fromCurrency: 'USD', toCurrency: 'GHS' },
    { id: 'TXN-8940', date: '2025-11-11 12:45', amount: 500.00, corridor: 'USA-BRL', status: 'processing', fee: 2.50, recipient: 'Maria S.', processingTime: '-', fromCurrency: 'USD', toCurrency: 'BRL' },
    { id: 'TXN-8939', date: '2025-11-11 11:22', amount: 75.00, corridor: 'USA-KES', status: 'completed', fee: 0.38, recipient: 'James M.', processingTime: '2.3s', fromCurrency: 'USD', toCurrency: 'KES' },
    { id: 'TXN-8938', date: '2025-11-11 09:15', amount: 1000.00, corridor: 'USA-NGN', status: 'failed', fee: 0.00, recipient: 'Ada N.', processingTime: '-', fromCurrency: 'USD', toCurrency: 'NGN' },
    { id: 'TXN-8937', date: '2025-11-10 18:45', amount: 350.00, corridor: 'USA-GHS', status: 'completed', fee: 1.75, recipient: 'Ama K.', processingTime: '2.0s', fromCurrency: 'USD', toCurrency: 'GHS' },
    { id: 'TXN-8936', date: '2025-11-10 16:30', amount: 200.00, corridor: 'USA-BRL', status: 'completed', fee: 1.00, recipient: 'Pedro L.', processingTime: '1.9s', fromCurrency: 'USD', toCurrency: 'BRL' },
    { id: 'TXN-8935', date: '2025-11-10 14:20', amount: 450.00, corridor: 'USA-NGN', status: 'completed', fee: 2.25, recipient: 'Tunde B.', processingTime: '2.2s', fromCurrency: 'USD', toCurrency: 'NGN' },
    { id: 'TXN-8934', date: '2025-11-10 11:05', amount: 125.00, corridor: 'USA-KES', status: 'completed', fee: 0.63, recipient: 'Lucy W.', processingTime: '2.4s', fromCurrency: 'USD', toCurrency: 'KES' },
    { id: 'TXN-8933', date: '2025-11-10 09:30', amount: 800.00, corridor: 'USA-NGN', status: 'completed', fee: 4.00, recipient: 'Ibrahim Y.', processingTime: '1.7s', fromCurrency: 'USD', toCurrency: 'NGN' },
  ];

  useEffect(() => {
    // Simulate fetching transactions from an API
    const fetchTransactions = async () => {
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTxns(allTransactions);
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = txns.filter(txn => {
    const matchesSearch = txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCorridor = filterCorridor === 'all' || txn.corridor === filterCorridor;
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    return matchesSearch && matchesCorridor && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </Badge>;
      case 'processing':
        return <Badge className="gap-1 bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 animate-pulse-slow">
          <Clock className="w-3 h-3" />
          Processing
        </Badge>;
      case 'failed':
        return <Badge className="gap-1 bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
          <XCircle className="w-3 h-3" />
          Failed
        </Badge>;
      default:
        return null;
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['ID', 'Date', 'Amount', 'Corridor', 'Status', 'Fee', 'Recipient', 'Processing Time'],
      ...filteredTransactions.map(txn => [
        txn.id, txn.date, txn.amount, txn.corridor, txn.status, txn.fee, txn.recipient, txn.processingTime || '-'
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jx402-transactions-${Date.now()}.csv`;
    a.click();
  };

  const handleViewDetails = (txn: Transaction) => {
    setSelectedTransaction(txn);
    setShowDetailsModal(true);
  };

  const stats = {
    total: txns.length,
    completed: txns.filter(t => t.status === 'completed').length,
    processing: txns.filter(t => t.status === 'processing').length,
    failed: txns.filter(t => t.status === 'failed').length,
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
          <h1 className="text-slate-900 mb-1">Transaction History</h1>
          <p className="text-slate-600">View and manage all cross-border payment transactions</p>
        </div>
        <Button onClick={handleExportCSV} className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-premium">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-premium">
          <p className="text-sm text-slate-600 mb-1">Total Transactions</p>
          <p className="text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-4 shadow-premium bg-gradient-to-br from-green-50 to-white">
          <p className="text-sm text-green-700 mb-1">Completed</p>
          <p className="text-green-900">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-premium bg-gradient-to-br from-blue-50 to-white">
          <p className="text-sm text-blue-700 mb-1">Processing</p>
          <p className="text-blue-900">{stats.processing}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-4 shadow-premium bg-gradient-to-br from-red-50 to-white">
          <p className="text-sm text-red-700 mb-1">Failed</p>
          <p className="text-red-900">{stats.failed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-premium">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by ID or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 shadow-sm"
            />
          </div>
          <Select value={filterCorridor} onValueChange={setFilterCorridor}>
            <SelectTrigger className="shadow-sm">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="All Corridors" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Corridors</SelectItem>
              <SelectItem value="USA-NGN">USA-NGN</SelectItem>
              <SelectItem value="USA-GHS">USA-GHS</SelectItem>
              <SelectItem value="USA-BRL">USA-BRL</SelectItem>
              <SelectItem value="USA-KES">USA-KES</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="shadow-sm">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="All Statuses" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'date' | 'amount')}>
            <SelectTrigger className="shadow-sm">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="amount">Sort by Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 text-sm text-slate-700">Transaction ID</th>
                <th className="text-left p-4 text-sm text-slate-700">Date & Time</th>
                <th className="text-left p-4 text-sm text-slate-700">Recipient</th>
                <th className="text-left p-4 text-sm text-slate-700">Corridor</th>
                <th className="text-right p-4 text-sm text-slate-700">Amount</th>
                <th className="text-right p-4 text-sm text-slate-700">Fee</th>
                <th className="text-center p-4 text-sm text-slate-700">Time</th>
                <th className="text-center p-4 text-sm text-slate-700">Status</th>
                <th className="text-center p-4 text-sm text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((txn, index) => (
                <tr 
                  key={txn.id} 
                  className="hover:bg-slate-50 transition-colors group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-4">
                    <code className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {txn.id}
                    </code>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{txn.date}</td>
                  <td className="p-4 text-sm text-slate-900">{txn.recipient}</td>
                  <td className="p-4">
                    <span className="text-sm px-2 py-1 bg-slate-100 rounded text-slate-700">
                      {txn.corridor}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm text-slate-900">
                    ${txn.amount.toFixed(2)}
                  </td>
                  <td className="p-4 text-right text-sm text-slate-600">
                    ${txn.fee.toFixed(2)}
                  </td>
                  <td className="p-4 text-center text-sm text-slate-600">
                    {txn.processingTime}
                  </td>
                  <td className="p-4 text-center">
                    {getStatusBadge(txn.status)}
                  </td>
                  <td className="p-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(txn)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {txn.status === 'failed' && (
                          <DropdownMenuItem>
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Retry Transaction
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download Receipt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 mb-1">No transactions found</p>
            <p className="text-sm text-slate-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information for transaction {selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Transaction ID</p>
                  <code className="text-sm text-blue-600">{selectedTransaction.id}</code>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  {getStatusBadge(selectedTransaction.status)}
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Date & Time</p>
                  <p className="text-sm text-slate-900">{selectedTransaction.date}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Processing Time</p>
                  <p className="text-sm text-slate-900">{selectedTransaction.processingTime}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Recipient</p>
                  <p className="text-sm text-slate-900">{selectedTransaction.recipient}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Corridor</p>
                  <p className="text-sm text-slate-900">{selectedTransaction.corridor}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Amount</p>
                  <p className="text-slate-900">${selectedTransaction.amount.toFixed(2)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Fee</p>
                  <p className="text-slate-900">${selectedTransaction.fee.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm text-blue-900 mb-2">Transaction Flow</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm text-slate-700">Fiat Input: Complete</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm text-slate-700">Polygon Transfer: Complete</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm text-slate-700">Bank Payout: Complete</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}