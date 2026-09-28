import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { Button, Card, Badge } from '../../components/ui';
import { Calendar, Users } from 'lucide-react';

export const SchemeList = () => {
  const { schemes, currentUser, applications, addApplication } = useAppContext();
  const navigate = useNavigate();

  const handleApply = (scheme) => {
    // Check if user already has an application
    const existingApp = applications.find(a => a.applicantId === currentUser.id && a.schemeId === scheme.id);
    
    if (existingApp) {
      navigate(`/student/applications/${existingApp.id}`);
      return;
    }

    // Create a new draft
    const newId = `APP-${scheme.id.toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
    const newApp = {
      id: newId,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      schemeId: scheme.id,
      status: 'draft',
      stage: 'Draft',
      submittedAt: null,
      data: {
        personal: { name: currentUser.name, email: currentUser.email, phone: '', gender: '', dob: '' },
        academic: {},
        institution: {},
        income: {}
      },
      documents: [],
      history: [
        { date: new Date().toISOString(), action: 'Application Draft Created', by: 'Student' }
      ],
      comments: []
    };
    
    addApplication(newApp);
    navigate(`/student/applications/${newId}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Explore Schemes</h1>
        <p className="text-text-muted">Find and apply for fellowships and scholarships.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {schemes.map(scheme => (
          <Card key={scheme.id} className="flex flex-col h-full">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-primary">{scheme.name}</h2>
                <Badge variant="info">Open</Badge>
              </div>
              <p className="text-slate-600 mb-6">{scheme.description}</p>
              
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <strong className="text-slate-900 block mb-1">Benefits:</strong>
                  {scheme.benefits}
                </div>
                <div>
                  <strong className="text-slate-900 block mb-1">Eligibility:</strong>
                  {scheme.eligibility}
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Deadline: <strong className="text-slate-900">{new Date(scheme.deadline).toLocaleDateString()}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Seats: <strong className="text-slate-900">{scheme.seats}</strong></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button onClick={() => handleApply(scheme)}>
                Apply Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
