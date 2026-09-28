import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { Card, Button, Badge, Input } from '../../components/ui';
import { Search, Filter, Eye } from 'lucide-react';

export const ApplicationsList = () => {
  const { applications } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  // Filter out drafts as officers shouldn't see them
  const submittedApps = applications.filter(a => a.status !== 'draft');

  const filteredApps = submittedApps.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || app.status === filterStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Applications Queue</h1>
        <p className="text-text-muted">Review and verify submitted applications.</p>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 border-slate-200">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            className="pl-9 bg-white" 
            placeholder="Search by ID or Name..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select 
            className="text-sm border-slate-300 rounded-md py-2 px-3 bg-white w-full focus:ring-primary"
            value={filterStage}
            onChange={e => setFilterStage(e.target.value)}
          >
            <option value="all">All Stages</option>
            <option value="submitted">Pending Review</option>
            <option value="correction">Correction Requested</option>
            <option value="verified">Verified</option>
            <option value="selected">Selected</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Application ID</th>
                <th className="px-6 py-4 font-medium">Applicant Name</th>
                <th className="px-6 py-4 font-medium">Scheme</th>
                <th className="px-6 py-4 font-medium">Submitted On</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{app.id}</td>
                  <td className="px-6 py-4">{app.applicantName}</td>
                  <td className="px-6 py-4">{app.schemeId.toUpperCase()}</td>
                  <td className="px-6 py-4">{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      app.status === 'verified' || app.status === 'selected' ? 'success' :
                      app.status === 'correction' ? 'warning' : 'default'
                    }>
                      {app.stage}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/officer/applications/${app.id}`)}>
                      <Eye className="w-4 h-4 mr-2" /> Review
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No applications found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
