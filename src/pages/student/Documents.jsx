import React from 'react';
import { useAppContext } from '../../store/AppContext';
import { Card, Button, Badge } from '../../components/ui';
import { FileText, Download, UploadCloud } from 'lucide-react';

export const Documents = () => {
  const { applications, currentUser } = useAppContext();
  
  const myApps = applications.filter(a => a.applicantId === currentUser.id);
  const activeApp = myApps.length > 0 ? myApps[0] : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-main">My Documents</h1>
        <p className="text-text-muted">Manage your uploaded certificates and files.</p>
      </div>

      {!activeApp ? (
        <Card className="p-8 text-center text-slate-500">
          <p>No documents uploaded yet. Start an application to upload required documents.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Documents for {activeApp.schemeId.toUpperCase()}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {activeApp.documents.map(doc => (
              <div key={doc.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{doc.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.file} • 2.4 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Badge variant={doc.status === 'verified' ? 'success' : doc.status === 'rejected' ? 'danger' : 'default'}>
                    {doc.status === 'uploaded' ? 'Under Review' : doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4 text-slate-500" />
                  </Button>
                </div>
              </div>
            ))}
            {activeApp.documents.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <UploadCloud className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p>No documents found.</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
