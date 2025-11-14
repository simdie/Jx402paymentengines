import { ArrowUpRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Badge } from './ui/badge';

export function RecentTransactions() {
  const transactions = [
    {
      id: 'TXN-8942',
      date: '2025-11-11 14:32',
      amount: 250.00,
      corridor: 'USA-NGN',
      status: 'completed',
      fee: 1.25
    },
    {
      id: 'TXN-8941',
      date: '2025-11-11 13:18',
      amount: 100.00,
      corridor: 'USA-GHS',
      status: 'completed',
      fee: 0.50
    },
    {
      id: 'TXN-8940',
      date: '2025-11-11 12:45',
      amount: 500.00,
      corridor: 'USA-BRL',
      status: 'processing',
      fee: 2.50
    },
    {
      id: 'TXN-8939',
      date: '2025-11-11 11:22',
      amount: 75.00,
      corridor: 'USA-KES',
      status: 'completed',
      fee: 0.38
    },
    {
      id: 'TXN-8938',
      date: '2025-11-11 09:15',
      amount: 1000.00,
      corridor: 'USA-NGN',
      status: 'failed',
      fee: 0.00
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </Badge>;
      case 'processing':
        return <Badge className="gap-1 bg-blue-100 text-blue-700 hover:bg-blue-100">
          <Clock className="w-3 h-3" />
          Processing
        </Badge>;
      case 'failed':
        return <Badge className="gap-1 bg-red-100 text-red-700 hover:bg-red-100">
          <XCircle className="w-3 h-3" />
          Failed
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-900">Recent Transactions</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View all
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-sm text-slate-600">ID</th>
              <th className="text-left py-3 px-2 text-sm text-slate-600">Date</th>
              <th className="text-right py-3 px-2 text-sm text-slate-600">Amount</th>
              <th className="text-left py-3 px-2 text-sm text-slate-600">Corridor</th>
              <th className="text-right py-3 px-2 text-sm text-slate-600">Fee</th>
              <th className="text-left py-3 px-2 text-sm text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-2 text-sm text-slate-900">{txn.id}</td>
                <td className="py-3 px-2 text-sm text-slate-600">{txn.date}</td>
                <td className="py-3 px-2 text-sm text-slate-900 text-right">
                  ${txn.amount.toFixed(2)}
                </td>
                <td className="py-3 px-2">
                  <Badge variant="outline" className="text-xs">{txn.corridor}</Badge>
                </td>
                <td className="py-3 px-2 text-sm text-slate-600 text-right">
                  ${txn.fee.toFixed(2)}
                </td>
                <td className="py-3 px-2">
                  {getStatusBadge(txn.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
