import React from 'react';
import { useAppContext } from '../../store/AppContext';
import { Card, Button, Badge } from '../../components/ui';
import { CreditCard, CheckCircle, Clock, FileText } from 'lucide-react';

export const Payments = () => {
  const { applications, currentUser } = useAppContext();
  
  // Find selected applications
  const selectedApps = applications.filter(a => a.applicantId === currentUser.id && a.status === 'selected');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Payments & Renewal</h1>
        <p className="text-text-muted">Track your scholarship disbursement and submit renewal reports.</p>
      </div>

      {selectedApps.length === 0 ? (
        <Card className="p-8 text-center text-slate-500">
          <CreditCard className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <p>No active disbursements. You must be selected for a scheme to view payments.</p>
        </Card>
      ) : (
        selectedApps.map(app => (
          <div key={app.id} className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-primary">{app.schemeId.toUpperCase()} Fellowship</h2>
                  <p className="text-sm text-slate-500">Application ID: {app.id}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 grid sm:grid-cols-3 gap-4 border border-slate-200">
                <div>
                  <div className="text-sm text-slate-500 font-medium">Disbursement Status</div>
                  <div className="font-bold text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Paid</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-medium">Last Payment</div>
                  <div className="font-bold text-slate-800">₹31,000 (Oct 2024)</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-medium">Next Renewal Due</div>
                  <div className="font-bold text-slate-800">March 31, 2025</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Fellowship Renewal
              </h3>
              <p className="text-sm text-slate-600 mb-6 max-w-2xl">
                To continue receiving your fellowship, you must submit a half-yearly progress report signed by your supervisor.
              </p>

              <div className="border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">Progress Report (H1 2024-25)</div>
                    <div className="text-xs text-slate-500">Due in 5 months</div>
                  </div>
                </div>
                <Button variant="outline">Upload Report</Button>
              </div>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};
