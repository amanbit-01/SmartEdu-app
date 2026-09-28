import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SCHEMES, INITIAL_APPLICATIONS, CURRENT_USER_STUDENT } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('smartedu_role') || 'student'); // 'student', 'officer', 'committee'
  
  const [schemes, setSchemes] = useState(() => {
    const saved = localStorage.getItem('smartedu_schemes');
    return saved ? JSON.parse(saved) : INITIAL_SCHEMES;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('smartedu_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('smartedu_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('smartedu_schemes', JSON.stringify(schemes));
  }, [schemes]);

  useEffect(() => {
    localStorage.setItem('smartedu_applications', JSON.stringify(applications));
  }, [applications]);

  const updateApplication = (id, updates) => {
    setApplications(apps => apps.map(app => app.id === id ? { ...app, ...updates } : app));
  };

  const addApplication = (newApp) => {
    setApplications(apps => [...apps, newApp]);
  };

  const resetData = () => {
    setSchemes(INITIAL_SCHEMES);
    setApplications(INITIAL_APPLICATIONS);
    localStorage.removeItem('smartedu_schemes');
    localStorage.removeItem('smartedu_applications');
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      schemes, setSchemes,
      applications, setApplications,
      updateApplication, addApplication,
      resetData,
      currentUser: CURRENT_USER_STUDENT
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
