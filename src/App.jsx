import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { AppLayout } from './components/AppLayout';
import { Landing } from './pages/Landing';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { SchemeList } from './pages/student/SchemeList';
import { ApplicationForm } from './pages/student/ApplicationForm';
import { Documents } from './pages/student/Documents';
import { Payments } from './pages/student/Payments';
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { ApplicationsList } from './pages/officer/ApplicationsList';
import { VerificationWorkspace } from './pages/officer/VerificationWorkspace';
import { SchemeConfig } from './pages/officer/SchemeConfig';
import { CommitteeDashboard } from './pages/committee/CommitteeDashboard';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* App Layout Routes */}
        <Route element={<AppLayout />}>
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/schemes" element={<SchemeList />} />
          <Route path="/student/applications" element={<StudentDashboard />} />
          <Route path="/student/applications/:id" element={<ApplicationForm />} />
          <Route path="/student/documents" element={<Documents />} />
          <Route path="/student/payments" element={<Payments />} />
          
          {/* Officer Routes */}
          <Route path="/officer" element={<OfficerDashboard />} />
          <Route path="/officer/applications" element={<ApplicationsList />} />
          <Route path="/officer/applications/:id" element={<VerificationWorkspace />} />
          <Route path="/officer/config" element={<SchemeConfig />} />
          
          {/* Committee Routes */}
          <Route path="/committee" element={<CommitteeDashboard />} />
          <Route path="/committee/review" element={<CommitteeDashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
