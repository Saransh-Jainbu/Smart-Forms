import { LogOut, User, Coins, Zap } from 'lucide-react';
import { Logo } from '../landing/Logo';

interface TopNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userEmail?: string;
  credits?: number;
}

export function TopNav({ currentView, onViewChange, userEmail = 'user@email.com', credits = 2450 }: TopNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'forms', label: 'Forms' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="text-lg text-gray-900 hidden sm:block">SmartScreen AI</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${currentView === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Section with Credits */}
          <div className="flex items-center gap-3">
            {/* Credits Display */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-900">{credits.toLocaleString()}</span>
              <span className="hidden lg:inline text-xs text-amber-700">credits</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{userEmail}</span>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${currentView === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Credits */}
          <div className="sm:hidden flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg ml-2">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs text-amber-900">{credits.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}