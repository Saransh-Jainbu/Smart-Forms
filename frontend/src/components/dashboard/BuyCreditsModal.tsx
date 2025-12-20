import { X, Zap, Check, Sparkles, Crown } from 'lucide-react';

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BuyCreditsModal({ isOpen, onClose }: BuyCreditsModalProps) {
  if (!isOpen) return null;

  const packages = [
    {
      name: 'Starter',
      credits: 1000,
      price: 9,
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        '1,000 credits',
        'Valid for 6 months',
        'Email support',
        'Basic analytics',
      ],
    },
    {
      name: 'Professional',
      credits: 5000,
      price: 39,
      icon: <Sparkles className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        '5,000 credits',
        'Valid for 1 year',
        'Priority support',
        'Advanced analytics',
        'API access',
      ],
    },
    {
      name: 'Enterprise',
      credits: 20000,
      price: 99,
      icon: <Crown className="w-6 h-6" />,
      gradient: 'from-amber-500 to-orange-500',
      popular: false,
      features: [
        '20,000 credits',
        'Never expires',
        '24/7 dedicated support',
        'Full analytics suite',
        'API access',
        'Custom integrations',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl text-gray-900">Buy Credits</h2>
            <p className="text-sm text-gray-600 mt-1">Choose the perfect plan for your needs</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white border-2 rounded-xl p-6 transition-all hover:shadow-xl ${
                  pkg.popular ? 'border-purple-500 shadow-lg' : 'border-gray-200 hover:border-blue-400'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${pkg.gradient} rounded-xl flex items-center justify-center text-white shadow-lg mb-4`}>
                  {pkg.icon}
                </div>

                {/* Package Name */}
                <h3 className="text-xl text-gray-900 mb-2">{pkg.name}</h3>

                {/* Credits */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl text-gray-900">{pkg.credits.toLocaleString()}</span>
                  <span className="text-gray-600">credits</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl text-gray-900">${pkg.price}</span>
                  <span className="text-gray-600 text-sm">one-time</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Buy Button */}
                <button
                  className={`w-full py-3 rounded-lg transition-all shadow-sm ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                      : 'bg-gray-900 hover:bg-black text-white'
                  }`}
                >
                  Buy {pkg.name}
                </button>

                {/* Cost per Credit */}
                <div className="text-center mt-3 text-xs text-gray-500">
                  ${(pkg.price / pkg.credits).toFixed(3)} per credit
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-gray-900 mb-3">Credit Usage</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Plagiarism Detection</span>
                <span className="text-gray-900">5 credits/submission</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">AI Content Detection</span>
                <span className="text-gray-900">5 credits/submission</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Quality Scoring</span>
                <span className="text-gray-900">3 credits/submission</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Bulk Analysis (100+)</span>
                <span className="text-gray-900">3 credits/submission</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-3">Secure payment powered by Stripe</p>
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">💳 Visa</div>
              <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">💳 Mastercard</div>
              <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">💳 Amex</div>
              <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">🅿️ PayPal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}