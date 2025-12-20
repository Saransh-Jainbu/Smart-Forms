import { FileText, CheckCircle, AlertTriangle, ClipboardList } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
  subtitle?: string;
}

function StatCard({ icon, label, value, gradient, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}

export function QuickStats() {
  const stats = [
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      label: 'Forms',
      value: 5,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      label: 'Total Submissions',
      value: '1,247',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      subtitle: '623 credits used',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      label: 'Flagged Submissions',
      value: 23,
      gradient: 'bg-gradient-to-br from-red-500 to-red-600',
      subtitle: 'Needs review',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      label: 'Analyzed Submissions',
      value: '1,224',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}