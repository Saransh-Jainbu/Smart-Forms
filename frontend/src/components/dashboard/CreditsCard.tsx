import { Zap, TrendingUp, Clock, Plus } from 'lucide-react';

interface CreditsCardProps {
  credits: number;
  usedThisMonth: number;
  onBuyCredits: () => void;
}

export function CreditsCard({ credits, usedThisMonth, onBuyCredits }: CreditsCardProps) {
  const monthlyLimit = 5000;
  const usagePercent = (usedThisMonth / monthlyLimit) * 100;

  return (
    <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-xl overflow-hidden shadow-lg">
      <div className="p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg">Credits Balance</span>
          </div>
          <button
            onClick={onBuyCredits}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all border border-white/30"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Buy</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="text-5xl mb-2">{credits.toLocaleString()}</div>
          <div className="text-amber-100 text-sm">Available credits</div>
        </div>

        {/* Usage Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-amber-100">This Month</span>
            <span className="text-sm">{usedThisMonth.toLocaleString()} / {monthlyLimit.toLocaleString()}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            ></div>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Used: {usagePercent.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Resets in 12 days</span>
            </div>
          </div>
        </div>

        {/* Credit Costs Info */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="text-xs text-amber-100 mb-2">Credit Usage:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-100">Per submission:</span>
              <span>5 credits</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-100">Bulk analysis:</span>
              <span>3 credits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
