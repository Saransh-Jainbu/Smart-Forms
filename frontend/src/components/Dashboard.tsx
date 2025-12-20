import { useState } from 'react';
import { TopNav } from './dashboard/TopNav';
import { QuickStats } from './dashboard/QuickStats';
import { ConnectedFormsList } from './dashboard/ConnectedFormsList';
import { RecentActivity } from './dashboard/RecentActivity';
import { ConnectFormModal } from './dashboard/ConnectFormModal';
import { FormAnalysisView } from './dashboard/FormAnalysisView';
import { SubmissionDetailView } from './dashboard/SubmissionDetailView';
import { CreditsCard } from './dashboard/CreditsCard';
import { BuyCreditsModal } from './dashboard/BuyCreditsModal';

type View = 'dashboard' | 'forms' | 'settings' | 'analysis' | 'submission';

export function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isBuyCreditsModalOpen, setIsBuyCreditsModalOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [credits, setCredits] = useState(2450);
  const [usedThisMonth, setUsedThisMonth] = useState(2550);

  const handleViewAnalysis = (formId: string) => {
    setSelectedFormId(formId);
    setCurrentView('analysis');
  };

  const handleViewSubmission = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setCurrentView('submission');
  };

  const handleBackToDashboard = () => {
    setSelectedFormId(null);
    setSelectedSubmissionId(null);
    setCurrentView('dashboard');
  };

  const handleBackToAnalysis = () => {
    setSelectedSubmissionId(null);
    setCurrentView('analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav
        currentView={currentView === 'analysis' || currentView === 'submission' ? 'dashboard' : currentView}
        onViewChange={(view) => setCurrentView(view as View)}
        userEmail="john@example.com"
        credits={credits}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <>
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl text-gray-900 mb-2">Welcome back, John! 👋</h1>
              <p className="text-gray-600">Manage your forms and analyze submissions</p>
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
              <QuickStats />
            </div>

            {/* Main Content with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Connected Forms - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                <ConnectedFormsList
                  onViewAnalysis={handleViewAnalysis}
                  onConnectNew={() => setIsConnectModalOpen(true)}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Credits Card */}
                <CreditsCard
                  credits={credits}
                  usedThisMonth={usedThisMonth}
                  onBuyCredits={() => setIsBuyCreditsModalOpen(true)}
                />
                
                {/* Recent Activity */}
                <RecentActivity />
              </div>
            </div>
          </>
        )}

        {/* Forms View */}
        {currentView === 'forms' && (
          <div>
            <h1 className="text-3xl text-gray-900 mb-6">All Forms</h1>
            <ConnectedFormsList
              onViewAnalysis={handleViewAnalysis}
              onConnectNew={() => setIsConnectModalOpen(true)}
            />
          </div>
        )}

        {/* Settings View */}
        {currentView === 'settings' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h1 className="text-3xl text-gray-900 mb-6">Settings</h1>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg text-gray-900 mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Email</label>
                    <input
                      type="email"
                      value="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      value="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Email me when flagged submissions are detected</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Daily summary reports</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Weekly analytics digest</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analysis View */}
        {currentView === 'analysis' && selectedFormId && (
          <FormAnalysisView
            formId={selectedFormId}
            onBack={handleBackToDashboard}
            onViewSubmission={handleViewSubmission}
          />
        )}

        {/* Submission Detail View */}
        {currentView === 'submission' && selectedSubmissionId && (
          <SubmissionDetailView
            submissionId={selectedSubmissionId}
            onBack={handleBackToAnalysis}
          />
        )}
      </div>

      {/* Connect Form Modal */}
      <ConnectFormModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

      {/* Buy Credits Modal */}
      <BuyCreditsModal
        isOpen={isBuyCreditsModalOpen}
        onClose={() => setIsBuyCreditsModalOpen(false)}
      />
    </div>
  );
}