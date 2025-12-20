import { AlertTriangle, CheckCircle, FileText, RefreshCw } from 'lucide-react';

interface Activity {
  id: string;
  type: 'flagged' | 'synced' | 'submission' | 'warning';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'flagged',
      title: 'High plagiarism detected',
      description: 'John Doe',
      timestamp: '2 min ago',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: '2',
      type: 'synced',
      title: 'Form synced successfully',
      description: 'Marketing Form',
      timestamp: '5 min ago',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      id: '3',
      type: 'submission',
      title: 'New submission received',
      description: 'Jane Smith',
      timestamp: '10 min ago',
      icon: <FileText className="w-4 h-4" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: '4',
      type: 'warning',
      title: 'AI content detected',
      description: 'Alex Rivera - 45%',
      timestamp: '15 min ago',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    {
      id: '5',
      type: 'synced',
      title: 'Auto-sync completed',
      description: 'SE Applications',
      timestamp: '20 min ago',
      icon: <RefreshCw className="w-4 h-4" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-gray-900">Recent Activity</h3>
      </div>

      {/* Activities List */}
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 mb-0.5">{activity.title}</div>
                <div className="text-xs text-gray-600 mb-1">{activity.description}</div>
                <div className="text-xs text-gray-500">{activity.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
