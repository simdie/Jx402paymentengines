import { useState } from 'react';
import { Trophy, Gift, TrendingUp, Sparkles, Coins, Star } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { Progress } from './ui/progress';

export function RewardsWidget() {
  const [hypeBalance, setHypeBalance] = useState(1247);
  const nextTierTarget = 2000;
  const progress = (hypeBalance / nextTierTarget) * 100;

  const leaderboard = [
    { name: 'Carlos M.', txns: 1834, rewards: 2456, tier: 'Gold' },
    { name: 'Chinedu A.', txns: 1621, rewards: 2180, tier: 'Gold' },
    { name: 'Maria S.', txns: 1455, rewards: 1967, tier: 'Silver' },
    { name: 'You', txns: 892, rewards: 1247, isCurrentUser: true, tier: 'Silver' },
  ];

  const handleTip = (amount: number) => {
    const hypeEarned = Math.floor(amount * 10);
    toast.success(`Sent $${amount.toFixed(2)} tip! +${hypeEarned} $HYPE earned`, {
      description: 'Micropayment processed in 0.1s',
    });
    setHypeBalance(prev => prev + hypeEarned);
  };

  const handleRedeem = () => {
    toast.success('Redeemed 500 $HYPE for fee rebate!', {
      description: 'Credit will be applied to your next transaction',
    });
    setHypeBalance(prev => prev - 500);
  };

  const getTierBadge = (tier: string) => {
    const colors = {
      Gold: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      Silver: 'bg-gradient-to-r from-slate-400 to-slate-500 text-white',
      Bronze: 'bg-gradient-to-r from-orange-700 to-orange-800 text-white',
    };
    return colors[tier as keyof typeof colors] || colors.Bronze;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-premium hover:shadow-premium-lg transition-all duration-300">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-premium">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-slate-900">$HYPE Rewards</h3>
            <p className="text-xs text-slate-500">Earn rewards on every transaction</p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 pb-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-xl p-5 text-white shadow-premium-lg">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-orange-100">Your Balance</p>
              <Coins className="w-5 h-5 text-orange-100" />
            </div>
            <p className="text-white mb-3">{hypeBalance.toLocaleString()} $HYPE</p>
            <div className="flex items-center gap-2 text-xs text-orange-100 mb-3">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+89 today</span>
              </div>
              <span>•</span>
              <span>0.1% cashback</span>
            </div>

            {/* Progress to next tier */}
            <div>
              <div className="flex items-center justify-between text-xs text-orange-100 mb-2">
                <span>Progress to Gold Tier</span>
                <span>{nextTierTarget - hypeBalance} more needed</span>
              </div>
              <div className="h-2 bg-orange-900/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* x402 Tipping */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <p className="text-sm text-slate-700">x402 Micropayment Tips</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[0.01, 0.10, 0.50, 1.00].map((amount) => (
            <Button
              key={amount}
              onClick={() => handleTip(amount)}
              variant="outline"
              size="sm"
              className="text-xs hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all hover-scale"
            >
              ${amount.toFixed(2)}
            </Button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">Instant tips • Earn 10x $HYPE</p>
      </div>

      {/* Leaderboard */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-yellow-600" />
          <p className="text-sm text-slate-700">Top Users (This Month)</p>
        </div>
        <div className="space-y-2">
          {leaderboard.map((user, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-all hover-scale ${
                user.isCurrentUser 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 shadow-premium' 
                  : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-premium' :
                    index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white' :
                    'bg-slate-200 text-slate-600'}
                `}>
                  {index + 1}
                </div>
                <div>
                  <p className={`text-sm ${user.isCurrentUser ? 'text-blue-900' : 'text-slate-900'}`}>
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500">{user.txns} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-0.5 rounded-full text-xs mb-1 ${getTierBadge(user.tier)}`}>
                  {user.tier}
                </div>
                <p className="text-xs text-orange-600">{user.rewards} $HYPE</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption */}
      <div className="px-6 pb-6">
        <Button
          onClick={handleRedeem}
          disabled={hypeBalance < 500}
          className="w-full gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-premium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover-scale"
        >
          <Gift className="w-4 h-4" />
          Redeem for Fee Rebate (500 $HYPE)
        </Button>
        {hypeBalance < 500 && (
          <p className="text-xs text-center text-slate-500 mt-2">
            Need {500 - hypeBalance} more $HYPE to redeem
          </p>
        )}
      </div>
    </div>
  );
}
