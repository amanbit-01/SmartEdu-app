import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { BookOpen, CheckCircle, Search, FileEdit, Clock } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const Landing = () => {
  const { setRole } = useAppContext();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <BookOpen className="w-8 h-8 text-accent" /> SmartEdu
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#schemes" className="text-slate-600 hover:text-primary font-medium text-sm">Schemes</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-primary font-medium text-sm">How It Works</a>
            <a href="#help" className="text-slate-600 hover:text-primary font-medium text-sm">Help</a>
          </nav>
          <div className="flex gap-3">
            <Link to="/student" onClick={() => setRole('student')}>
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/student" onClick={() => setRole('student')}>
              <Button>Try Demo</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            A clearer path to your scholarship.
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10">
            Apply for schemes, track your progress, and manage your documents in one unified platform designed for Scheduled Tribe students.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#schemes">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-600 text-white border-0">Explore Scholarships</Button>
            </a>
            <Link to="/student" onClick={() => setRole('student')}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20">Try Interactive Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Schemes */}
      <section id="schemes" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main mb-4">Supported Schemes</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Currently supporting key fellowship and scholarship programmes for higher education.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background rounded-xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-primary mb-3">National Fellowship for Scheduled Tribes (NFST)</h3>
              <p className="text-slate-600 mb-6">Financial assistance for ST students pursuing M.Phil and Ph.D. degrees in Sciences, Humanities, Social Sciences and Engineering.</p>
              <Link to="/student" onClick={() => setRole('student')}>
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </div>
            <div className="bg-background rounded-xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-primary mb-3">National Overseas Scholarship (NOS)</h3>
              <p className="text-slate-600 mb-6">Financial assistance to ST students selected for pursuing higher studies abroad for Master's, Ph.D., and Post-Doctoral research.</p>
              <Link to="/student" onClick={() => setRole('student')}>
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main mb-4">How It Works</h2>
            <p className="text-text-muted max-w-2xl mx-auto">A streamlined process powered by AI-assisted document checks and human verification.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: 'Discover', desc: 'Find eligible schemes easily.' },
              { icon: FileEdit, title: 'Apply', desc: 'Submit form and upload documents.' },
              { icon: CheckCircle, title: 'Review', desc: 'AI pre-checks, human verifies.' },
              { icon: Clock, title: 'Track', desc: 'Monitor status in real-time.' }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl text-center border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-2 text-white font-bold text-xl mb-6">
            <BookOpen className="w-6 h-6 text-accent" /> SmartEdu
          </div>
          <p className="mb-4">SIH Demonstration Prototype</p>
          <p className="text-sm max-w-md mx-auto">This is a fictional prototype created for demonstration purposes. It does not process real applications or connect to live government databases.</p>
        </div>
      </footer>
    </div>
  );
};
