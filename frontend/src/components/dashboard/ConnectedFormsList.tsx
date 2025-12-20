import { FileText, RefreshCw, Settings, Eye, Plus } from 'lucide-react';

interface Form {
  id: string;
  name: string;
  platform: string;
  submissions: number;
  lastSync: string;
  status: 'active' | 'syncing' | 'error';
}

interface ConnectedFormsListProps {
  onViewAnalysis: (formId: string) => void;
  onConnectNew: () => void;
}

export function ConnectedFormsList({ onViewAnalysis, onConnectNew }: ConnectedFormsListProps) {
  const forms: Form[] = [
    {
      id: '1',
      name: 'Software Engineer Applications 2024',
      platform: 'Google Forms',
      submissions: 247,
      lastSync: '2 minutes ago',
      status: 'active',
    },
    {
      id: '2',
      name: 'Marketing Intern Screening',
      platform: 'Microsoft Forms',
      submissions: 89,
      lastSync: '1 hour ago',
      status: 'active',
    },
    {
      id: '3',
      name: 'Product Manager Applications',
      platform: 'Typeform',
      submissions: 156,
      lastSync: '5 minutes ago',
      status: 'active',
    },
    {
      id: '4',
      name: 'Customer Success Representative',
      platform: 'Google Forms',
      submissions: 423,
      lastSync: '15 minutes ago',
      status: 'active',
    },
    {
      id: '5',
      name: 'Data Analyst Positions',
      platform: 'JotForm',
      submissions: 332,
      lastSync: '30 minutes ago',
      status: 'active',
    },
  ];

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      'Google Forms': 'bg-blue-50 text-blue-700 border-blue-200',
      'Microsoft Forms': 'bg-purple-50 text-purple-700 border-purple-200',
      'Typeform': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'JotForm': 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[platform] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg text-gray-900">Your Connected Forms</h2>
        <button
          onClick={onConnectNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Connect New Form</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Forms List */}
      <div className="divide-y divide-gray-200">
        {forms.map((form) => (
          <div key={form.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-gray-900">{form.name}</h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getPlatformColor(form.platform)}`}>
                    {form.platform}
                  </span>
                  <span className="text-sm text-gray-600">
                    {form.submissions} submissions
                  </span>
                  <span className="text-sm text-gray-500">
                    Last synced: {form.lastSync}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onViewAnalysis(form.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Analysis
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <RefreshCw className="w-4 h-4" />
                    Sync Now
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
