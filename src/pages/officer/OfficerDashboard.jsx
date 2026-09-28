import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { Card, Button } from '../../components/ui';
import { Users, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const OfficerDashboard = () => {
  const { applications } = useAppContext();

  // Metrics
  const total = applications.length;
  const pending = applications.filter(a => a.status === 'submitted').length;
  const correction = applications.filter(a => a.status === 'correction').length;
  const verified = applications.filter(a => a.status === 'verified').length;
  const selected = applications.filter(a => a.status === 'selected').length;

  const stageData = [
    { name: 'Pending', value: pending },
    { name: 'Correction', value: correction },
    { name: 'Verified', value: verified },
    { name: 'Selected', value: selected }
  ];

  const schemeData = [
    { name: 'NFST', count: applications.filter(a => a.schemeId === 'nfst').length },
    { name: 'NOS', count: applications.filter(a => a.schemeId === 'nos').length }
  ];

  const COLORS = ['#e2e8f0', '#fef3c7', '#dcfce7', '#dbeafe'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Reviewing Officer Dashboard</h1>
          <p className="text-text-muted">Overview of application processing and verification.</p>
        </div>
        <Link to="/officer/applications">
          <Button>View Processing Queue</Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-slate-800">{total}</div>
          <div className="text-sm text-slate-500 font-medium">Total Applications</div>
        </Card>
        <Card className="p-4 text-center bg-slate-50">
          <div className="text-3xl font-bold text-slate-600">{pending}</div>
          <div className="text-sm text-slate-500 font-medium flex items-center justify-center gap-1"><Clock className="w-4 h-4" /> Pending Review</div>
        </Card>
        <Card className="p-4 text-center bg-amber-50 border-amber-100">
          <div className="text-3xl font-bold text-amber-600">{correction}</div>
          <div className="text-sm text-amber-700 font-medium flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4" /> Corrections Req.</div>
        </Card>
        <Card className="p-4 text-center bg-green-50 border-green-100">
          <div className="text-3xl font-bold text-green-600">{verified}</div>
          <div className="text-sm text-green-700 font-medium flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4" /> Verified</div>
        </Card>
        <Card className="p-4 text-center bg-blue-50 border-blue-100">
          <div className="text-3xl font-bold text-blue-600">{selected}</div>
          <div className="text-sm text-blue-700 font-medium flex items-center justify-center gap-1"><Users className="w-4 h-4" /> Selected</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-6">Applications by Stage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-6">Applications by Scheme</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schemeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#087F8C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
