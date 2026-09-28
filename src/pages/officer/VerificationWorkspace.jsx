import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { Card, Button, Badge } from '../../components/ui';
import { CheckCircle, XCircle, AlertCircle, Eye, CornerUpLeft, ArrowRight } from 'lucide-react';

export const VerificationWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, updateApplication } = useAppContext();
  
  const application = applications.find(a => a.id === id);
  const [correctionNote, setCorrectionNote] = useState('');
  const [showCorrectionInput, setShowCorrectionInput] = useState(false);

  if (!application) return <div className="p-8 text-center">Application not found</div>;

  const handleVerify = () => {
    updateApplication(application.id, {
      status: 'verified',
      stage: 'Verified',
      history: [
        ...application.history,
        { date: new Date().toISOString(), action: 'Verified and Forwarded', by: 'Reviewing Officer' }
      ]
    });
    navigate('/officer/applications');
  };

  const handleRequestCorrection = () => {
    if (!correctionNote) {
      alert("Please provide a reason for correction.");
      return;
    }

    updateApplication(application.id, {
      status: 'correction',
      stage: 'Correction Required',
      history: [
        ...application.history,
        { date: new Date().toISOString(), action: 'Correction Requested', by: 'Reviewing Officer' }
      ],
      comments: [
        ...application.comments,
        { by: 'Officer', text: correctionNote, date: new Date().toISOString() }
      ]
    });
    navigate('/officer/applications');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <CornerUpLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Verification Workspace</h1>
            <p className="text-text-muted">Review application {application.id}</p>
          </div>
        </div>
        <Badge variant={
          application.status === 'verified' || application.status === 'selected' ? 'success' :
          application.status === 'correction' ? 'warning' : 'default'
        }>
          {application.stage}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Applicant Data */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">Applicant Summary</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <span className="text-slate-500 block">Name</span>
                <span className="font-medium text-slate-800">{application.data.personal?.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Email</span>
                <span className="font-medium text-slate-800">{application.data.personal?.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">DOB</span>
                <span className="font-medium text-slate-800">{application.data.personal?.dob}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone</span>
                <span className="font-medium text-slate-800">{application.data.personal?.phone}</span>
              </div>
            </div>
            
            <h3 className="font-bold text-lg border-b pb-2 mt-8 mb-4">Academic & Income</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <span className="text-slate-500 block">Income (Declared)</span>
                <span className="font-medium text-slate-800">₹{application.data.income?.familyIncome}</span>
              </div>
              <div>
                <span className="text-slate-500 block">PG Percentage</span>
                <span className="font-medium text-slate-800">{application.data.academic?.pgPercentage}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">Document Verification (AI Assisted)</h3>
            <div className="space-y-4">
              {application.documents.map(doc => (
                <div key={doc.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{doc.name}</span>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{doc.file}</span>
                    </div>
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4 mr-1"/> View</Button>
                  </div>
                  
                  {doc.id === 'income' && doc.extractedData && (
                    <div className="bg-slate-50 p-3 rounded text-sm grid grid-cols-2 gap-4 border border-slate-100">
                      <div>
                        <div className="text-slate-500 text-xs">Form Value</div>
                        <div className="font-medium">₹{application.data.income?.familyIncome}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs flex items-center gap-1">Extracted Value <Badge variant="info">AI</Badge></div>
                        <div className={`font-medium ${doc.extractedData.familyIncome !== application.data.income?.familyIncome ? 'text-red-600' : 'text-green-600'}`}>
                          ₹{doc.extractedData.familyIncome}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {application.documents.length === 0 && (
                <div className="text-slate-500 italic text-sm">No documents uploaded.</div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Actions & History */}
        <div className="space-y-6">
          {(application.status === 'submitted' || application.status === 'correction') && (
            <Card className="p-6">
              <h3 className="font-bold text-lg border-b pb-2 mb-4">Officer Actions</h3>
              
              {!showCorrectionInput ? (
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700" onClick={handleVerify}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark Verified & Forward
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-amber-600 border-amber-200 hover:bg-amber-50" onClick={() => setShowCorrectionInput(true)}>
                    <AlertCircle className="w-4 h-4 mr-2" /> Request Correction
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Correction Reason</label>
                  <textarea 
                    className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-primary focus:border-primary outline-none" 
                    rows="4" 
                    placeholder="E.g., Income certificate is unreadable..."
                    value={correctionNote}
                    onChange={e => setCorrectionNote(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2">
                    <Button className="w-full" onClick={handleRequestCorrection}>Submit Request</Button>
                    <Button variant="outline" onClick={() => setShowCorrectionInput(false)}>Cancel</Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {application.status === 'verified' && (
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                <CheckCircle className="w-5 h-5" /> Verified
              </div>
              <p className="text-sm text-green-700">This application has been verified and forwarded to the selection committee.</p>
            </Card>
          )}

          <Card className="p-6">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">Activity Log</h3>
            <div className="space-y-4">
              {application.history.slice().reverse().map((hist, idx) => (
                <div key={idx} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400"></div>
                  <div className="text-sm font-medium text-slate-800">{hist.action}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{new Date(hist.date).toLocaleString()} • {hist.by}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
