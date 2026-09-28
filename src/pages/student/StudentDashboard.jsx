import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { Button, Card, Badge } from '../../components/ui';
import { FileText, AlertCircle, ArrowRight, Clock, CheckCircle } from 'lucide-react';

export const StudentDashboard = () => {
  const { applications, currentUser } = useAppContext();
  
  // Filter for the current user's applications
  const myApps = applications.filter(app => app.applicantId === currentUser.id);
  const activeApp = myApps.length > 0 ? myApps[0] : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Welcome, {currentUser.name}</h1>
        <p className="text-text-muted">Here's what's happening with your applications today.</p>
      </div>

      {!activeApp ? (
        <Card className="p-8 text-center bg-primary-50 border-primary-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">No Active Applications</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">You haven't started any scholarship or fellowship applications yet. Explore available schemes to get started.</p>
          <Link to="/student/schemes">
            <Button>Explore Schemes</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Application ID: {activeApp.id}</div>
                  <h3 className="text-xl font-bold text-primary">{activeApp.schemeId === 'nfst' ? 'National Fellowship for Scheduled Tribes' : 'National Overseas Scholarship'}</h3>
                </div>
                <Badge variant={
                  activeApp.status === 'verified' || activeApp.status === 'selected' ? 'success' :
                  activeApp.status === 'correction' ? 'warning' : 'default'
                }>
                  {activeApp.stage}
                </Badge>
              </div>

              {activeApp.status === 'correction' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Action Required</h4>
                    <p className="text-sm text-amber-700 mt-1">Reviewing officer has requested corrections. Please update your application to continue.</p>
                    <Link to={`/student/applications/${activeApp.id}`}>
                      <Button variant="secondary" size="sm" className="mt-3">Review & Correct</Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeApp.status === 'draft' && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 flex gap-3">
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Draft Saved</h4>
                    <p className="text-sm text-slate-600 mt-1">You have an incomplete application. Continue where you left off.</p>
                    <Link to={`/student/applications/${activeApp.id}`}>
                      <Button size="sm" className="mt-3">Continue Application</Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="font-semibold text-slate-800 mb-4">Progress</h4>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                  <div className="space-y-6 relative">
                    <div className="flex gap-4 items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${['submitted', 'correction', 'verified', 'selected'].includes(activeApp.status) ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Application Submitted</div>
                        <div className="text-xs text-slate-500">{activeApp.submittedAt ? new Date(activeApp.submittedAt).toLocaleDateString() : 'Pending'}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${['verified', 'selected'].includes(activeApp.status) ? 'bg-green-100 text-green-600' : activeApp.status === 'correction' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                        {activeApp.status === 'correction' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium">Document Verification</div>
                        <div className="text-xs text-slate-500">
                          {activeApp.status === 'correction' ? 'Correction Requested' : ['verified', 'selected'].includes(activeApp.status) ? 'Verified' : 'Pending'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${activeApp.status === 'selected' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Selection Committee</div>
                        <div className="text-xs text-slate-500">{activeApp.status === 'selected' ? 'Selected' : 'Pending'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-800 mb-4">Recent Notifications</h3>
              <div className="space-y-4">
                {activeApp.history.map((hist, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div className="text-sm font-medium">{hist.action}</div>
                    <div className="text-xs text-slate-500 mt-1">{new Date(hist.date).toLocaleString()} by {hist.by}</div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h3 className="font-bold text-accent-800 mb-2">Need Help?</h3>
              <p className="text-sm text-slate-600 mb-4">Read our guide on document requirements and the selection process.</p>
              <Link to="/student/help" className="text-sm font-medium text-accent flex items-center gap-1 hover:underline">
                View Guidelines <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
