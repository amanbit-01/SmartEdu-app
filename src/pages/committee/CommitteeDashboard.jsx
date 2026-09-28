import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { Card, Button, Badge } from '../../components/ui';
import { Trophy, CheckCircle, XCircle, Users } from 'lucide-react';

export const CommitteeDashboard = () => {
  const { applications, updateApplication } = useAppContext();
  
  // Committee only sees verified applications
  const verifiedApps = applications.filter(a => a.status === 'verified');
  const selectedApps = applications.filter(a => a.status === 'selected');

  const [selectedScheme, setSelectedScheme] = useState('nfst');

  const appsToReview = verifiedApps.filter(a => a.schemeId === selectedScheme);
  const alreadySelected = selectedApps.filter(a => a.schemeId === selectedScheme);

  const handleSelect = (appId) => {
    updateApplication(appId, {
      status: 'selected',
      stage: 'Selected',
      history: [
        ...applications.find(a => a.id === appId).history,
        { date: new Date().toISOString(), action: 'Selected by Committee', by: 'Selection Committee' }
      ]
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Selection Committee Dashboard</h1>
        <p className="text-text-muted">Review verified candidates and make final selections.</p>
      </div>

      <div className="flex gap-4 border-b border-slate-200 pb-2">
        <button 
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${selectedScheme === 'nfst' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          onClick={() => setSelectedScheme('nfst')}
        >
          NFST ({verifiedApps.filter(a => a.schemeId === 'nfst').length} Pending)
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${selectedScheme === 'nos' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          onClick={() => setSelectedScheme('nos')}
        >
          NOS ({verifiedApps.filter(a => a.schemeId === 'nos').length} Pending)
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Candidates Ready for Selection
          </h2>
          
          {appsToReview.map(app => (
            <Card key={app.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-l-primary">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg">{app.applicantName}</h3>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{app.id}</span>
                </div>
                <div className="text-sm text-slate-600 grid sm:grid-cols-2 gap-x-8 gap-y-1 mt-2">
                  <div><strong>Income:</strong> ₹{app.data.income?.familyIncome}</div>
                  <div><strong>Marks:</strong> {app.data.academic?.pgPercentage || app.data.academic?.ugPercentage}%</div>
                  <div className="sm:col-span-2"><strong>Institution:</strong> {app.data.institution?.name}</div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={() => handleSelect(app.id)}>
                  Select
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto">
                  Reject
                </Button>
              </div>
            </Card>
          ))}
          
          {appsToReview.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500">
              No verified applications pending review for this scheme.
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amber-500" /> Selected Candidates
          </h2>
          <Card className="p-0 overflow-hidden border-amber-200">
            <div className="bg-amber-50 p-3 text-sm font-semibold text-amber-800 border-b border-amber-100 flex justify-between">
              <span>{selectedScheme.toUpperCase()} List</span>
              <span>{alreadySelected.length} Selected</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {alreadySelected.map(app => (
                <div key={app.id} className="p-3 text-sm flex justify-between items-center bg-white hover:bg-slate-50">
                  <div>
                    <div className="font-medium text-slate-800">{app.applicantName}</div>
                    <div className="text-xs text-slate-500">{app.id}</div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              ))}
              {alreadySelected.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500 italic">
                  No candidates selected yet.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
