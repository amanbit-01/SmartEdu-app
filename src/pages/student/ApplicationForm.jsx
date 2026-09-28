import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { Button, Card, Input } from '../../components/ui';
import { FileText, Save, CheckCircle, AlertCircle, UploadCloud, X } from 'lucide-react';

export const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, updateApplication, schemes } = useAppContext();
  
  const application = applications.find(a => a.id === id);
  const scheme = schemes.find(s => s?.id === application?.schemeId);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(application?.data || {});
  const [documents, setDocuments] = useState(application?.documents || []);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!application) {
      navigate('/student/applications');
    }
  }, [application, navigate]);

  if (!application || !scheme) return null;

  const isReadOnly = application.status !== 'draft' && application.status !== 'correction';

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const handleFileUpload = (docReq) => {
    // Simulate file upload with a mock file name and analyzing state
    const newDoc = {
      id: docReq.id,
      name: docReq.name,
      file: `mock_${docReq.id}.pdf`,
      status: 'uploaded',
      extractedData: docReq.id === 'income' ? { familyIncome: '500000' } : null // Example AI extraction
    };
    
    setDocuments(prev => {
      const existing = prev.filter(d => d.id !== docReq.id);
      return [...existing, newDoc];
    });
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    updateApplication(application.id, {
      data: formData,
      documents: documents
    });
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleSubmit = () => {
    // Basic AI Document Verification Simulation
    let needsCorrection = false;
    let mockComments = [...application.comments];
    
    const incomeDoc = documents.find(d => d.id === 'income');
    if (incomeDoc && formData.income?.familyIncome) {
      if (incomeDoc.extractedData?.familyIncome !== formData.income.familyIncome) {
        needsCorrection = true;
        mockComments.push({
          by: 'System (AI Verification)',
          text: `Income mismatch: Form states ₹${formData.income.familyIncome}, but Income Certificate shows ₹${incomeDoc.extractedData.familyIncome}.`,
          date: new Date().toISOString()
        });
      }
    }

    const nextStatus = needsCorrection ? 'correction' : 'submitted';
    const nextStage = needsCorrection ? 'Correction Required' : 'Under Verification';

    updateApplication(application.id, {
      data: formData,
      documents: documents,
      status: nextStatus,
      stage: nextStage,
      submittedAt: new Date().toISOString(),
      history: [
        ...application.history,
        { date: new Date().toISOString(), action: 'Application Submitted', by: 'Student' }
      ],
      comments: mockComments
    });

    navigate('/student');
  };

  const steps = [
    { title: 'Personal Info' },
    { title: 'Academic Details' },
    { title: 'Documents' },
    { title: 'Review' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Application Form</h1>
          <p className="text-text-muted">{scheme.name}</p>
        </div>
        <div className="text-sm font-medium text-slate-500">ID: {application.id}</div>
      </div>

      {/* Progress */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -z-10"></div>
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center bg-background px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              currentStep > idx + 1 ? 'bg-primary text-white' : 
              currentStep === idx + 1 ? 'border-2 border-primary bg-white text-primary' : 'bg-slate-200 text-slate-500'
            }`}>
              {currentStep > idx + 1 ? <CheckCircle className="w-5 h-5" /> : idx + 1}
            </div>
            <span className="text-xs font-medium mt-2 text-slate-600">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Comments / Feedback */}
      {application.comments && application.comments.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5" /> Reviewer Feedback
          </h4>
          <div className="space-y-3">
            {application.comments.map((c, i) => (
              <div key={i} className="bg-white p-3 rounded shadow-sm text-sm border border-amber-100">
                <strong className="text-amber-900">{c.by}:</strong> {c.text}
                <div className="text-xs text-amber-600 mt-1">{new Date(c.date).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Content */}
      <Card className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input value={formData.personal?.name || ''} onChange={(e) => handleInputChange('personal', 'name', e.target.value)} disabled={isReadOnly} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input value={formData.personal?.email || ''} onChange={(e) => handleInputChange('personal', 'email', e.target.value)} disabled={isReadOnly} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input value={formData.personal?.phone || ''} onChange={(e) => handleInputChange('personal', 'phone', e.target.value)} disabled={isReadOnly} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <Input type="date" value={formData.personal?.dob || ''} onChange={(e) => handleInputChange('personal', 'dob', e.target.value)} disabled={isReadOnly} />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 border-b pb-2">Family Income</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Annual Family Income (₹)</label>
                <Input type="number" value={formData.income?.familyIncome || ''} onChange={(e) => handleInputChange('income', 'familyIncome', e.target.value)} disabled={isReadOnly} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Academic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Degree Name</label>
                <Input value={formData.academic?.pgDegree || ''} onChange={(e) => handleInputChange('academic', 'pgDegree', e.target.value)} disabled={isReadOnly} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">University</label>
                <Input value={formData.academic?.pgUniversity || ''} onChange={(e) => handleInputChange('academic', 'pgUniversity', e.target.value)} disabled={isReadOnly} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Percentage/CGPA</label>
                <Input value={formData.academic?.pgPercentage || ''} onChange={(e) => handleInputChange('academic', 'pgPercentage', e.target.value)} disabled={isReadOnly} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Required Documents</h3>
            <div className="space-y-4">
              {scheme.requiredDocuments.map(docReq => {
                const uploadedDoc = documents.find(d => d.id === docReq.id);
                return (
                  <div key={docReq.id} className="border border-slate-200 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">{docReq.name}</h4>
                      {uploadedDoc && <p className="text-sm text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> {uploadedDoc.file}</p>}
                    </div>
                    {!isReadOnly && (
                      <Button variant="outline" size="sm" onClick={() => handleFileUpload(docReq)}>
                        <UploadCloud className="w-4 h-4 mr-2" /> {uploadedDoc ? 'Replace' : 'Upload'}
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Review Summary</h3>
            <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
              <div>
                <h4 className="font-semibold text-slate-500 text-sm uppercase">Personal</h4>
                <p><strong>Name:</strong> {formData.personal?.name}</p>
                <p><strong>Income:</strong> ₹{formData.income?.familyIncome}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-500 text-sm uppercase">Documents</h4>
                <ul className="list-disc list-inside text-sm mt-1">
                  {documents.map(d => (
                    <li key={d.id} className="text-green-700">{d.name} (Uploaded)</li>
                  ))}
                </ul>
              </div>
            </div>
            {!isReadOnly && (
              <div className="flex items-center gap-2 mt-6">
                <input type="checkbox" id="declaration" className="rounded text-primary focus:ring-primary" />
                <label htmlFor="declaration" className="text-sm text-slate-700">I declare that all information provided is true and correct.</label>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="ghost" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1}>
          Back
        </Button>
        <div className="flex gap-3">
          {!isReadOnly && (
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}>
              Next Step
            </Button>
          ) : (
            !isReadOnly && (
              <Button onClick={handleSubmit}>
                Submit Application
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
