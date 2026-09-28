import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { 
  BookOpen, 
  Home, 
  FileText, 
  Files, 
  Bell, 
  CreditCard, 
  HelpCircle,
  Menu,
  X,
  Settings,
  PieChart,
  CheckSquare,
  RotateCcw
} from 'lucide-react';
import { cn, Button } from './ui';

const RoleSwitcher = () => {
  const { role, setRole, resetData } = useAppContext();
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    navigate(`/${newRole}`);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the demo data? This will clear all applications and restore initial state.")) {
      resetData();
      navigate('/');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-xs text-slate-500 font-medium">Demo Role:</span>
        <select 
          value={role} 
          onChange={handleRoleChange}
          className="text-sm border-slate-300 rounded-md py-1 px-2 bg-slate-50 focus:ring-primary focus:border-primary"
        >
          <option value="student">Student</option>
          <option value="officer">Reviewing Officer</option>
          <option value="committee">Selection Committee</option>
        </select>
      </div>
      <Button variant="outline" size="sm" onClick={handleReset} className="text-xs h-8">
        <RotateCcw className="w-3 h-3 mr-1" /> Reset Data
      </Button>
    </div>
  );
};

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { role } = useAppContext();
  const location = useLocation();

  const navItems = {
    student: [
      { name: 'Overview', path: '/student', icon: Home },
      { name: 'Explore Schemes', path: '/student/schemes', icon: BookOpen },
      { name: 'My Applications', path: '/student/applications', icon: FileText },
      { name: 'Documents', path: '/student/documents', icon: Files },
      { name: 'Payments & Renewal', path: '/student/payments', icon: CreditCard },
    ],
    officer: [
      { name: 'Overview', path: '/officer', icon: PieChart },
      { name: 'Applications', path: '/officer/applications', icon: Files },
      { name: 'Scheme Config', path: '/officer/config', icon: Settings },
    ],
    committee: [
      { name: 'Dashboard', path: '/committee', icon: PieChart },
    ]
  };

  const currentNav = navItems[role] || navItems.student;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="w-6 h-6" /> SmartEdu
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "bg-white w-full md:w-[240px] border-r border-slate-200 flex flex-col md:sticky md:h-screen top-0 z-10 transition-all shadow-sm md:shadow-none",
        mobileMenuOpen ? "fixed h-screen top-14" : "hidden md:flex"
      )}>
        <Link to="/" className="p-6 hidden md:flex items-center gap-2 text-primary font-bold text-2xl border-b border-slate-100 hover:opacity-80">
          <BookOpen className="w-8 h-8 text-accent" /> SmartEdu
        </Link>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {currentNav.map((item) => {
            const Icon = item.icon;
            // Exact match for overview, startsWith for others
            const isActive = (item.path === `/${role}` && location.pathname === item.path) || 
                             (item.path !== `/${role}` && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 text-xs text-slate-500 text-center bg-slate-50">
          SIH Demonstration Prototype
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="text-sm font-medium text-slate-500 hidden md:block">
            {/* Breadcrumbs can go here */}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 ml-auto">
            <RoleSwitcher />
            <div className="hidden md:flex items-center gap-3 border-l pl-6 border-slate-200">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                {role.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm font-medium text-slate-700">
                {role === 'student' ? 'Anjali Santhal' : role === 'officer' ? 'Reviewing Officer' : 'Selection Comm.'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
