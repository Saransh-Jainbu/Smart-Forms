import { X, Upload } from 'lucide-react';

interface ConnectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectFormModal({ isOpen, onClose }: ConnectFormModalProps) {
  if (!isOpen) return null;

  const platforms = [
    {
      name: 'Google Forms',
      logo: '🔵',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      name: 'Microsoft Forms',
      logo: '🟣',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    },
    {
      name: 'Typeform',
      logo: '🟢',
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700',
    },
    {
      name: 'JotForm',
      logo: '🟠',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl text-gray-900">Connect a New Form</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">Choose your form platform:</p>

          {/* Platform Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{platform.logo}</div>
                  <h3 className="text-gray-900 mb-3">{platform.name}</h3>
                  <div className={`inline-block px-6 py-2 bg-gradient-to-r ${platform.color} ${platform.hoverColor} text-white rounded-lg transition-all text-sm shadow-sm`}>
                    Connect
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CSV Upload */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-4">Or upload your data:</p>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Custom CSV Upload</h3>
              <p className="text-sm text-gray-600 mb-4">Upload your form responses as a CSV file</p>
              <button className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all text-sm shadow-sm">
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
