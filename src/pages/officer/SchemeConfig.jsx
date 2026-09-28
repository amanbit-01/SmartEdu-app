import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { Card, Button, Input } from '../../components/ui';
import { Settings, Save } from 'lucide-react';

export const SchemeConfig = () => {
  const { schemes, setSchemes } = useAppContext();
  const [editingScheme, setEditingScheme] = useState(schemes[0]);

  const handleSave = () => {
    setSchemes(prev => prev.map(s => s.id === editingScheme.id ? editingScheme : s));
    alert('Scheme configuration saved.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Scheme Configuration</h1>
        <p className="text-text-muted">Manage eligibility rules, deadlines, and seat allocation.</p>
      </div>

      <div className="flex gap-4 border-b border-slate-200 pb-2">
        {schemes.map(s => (
          <button 
            key={s.id}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${editingScheme.id === s.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setEditingScheme(s)}
          >
            {s.id.toUpperCase()}
          </button>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <Settings className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-bold">Configure {editingScheme.name}</h2>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Application Deadline</label>
              <Input 
                type="date" 
                value={editingScheme.deadline} 
                onChange={e => setEditingScheme({...editingScheme, deadline: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Available Seats</label>
              <Input 
                type="number" 
                value={editingScheme.seats} 
                onChange={e => setEditingScheme({...editingScheme, seats: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Eligibility Criteria</label>
            <textarea 
              className="w-full border border-slate-300 rounded-md p-3 text-sm focus:ring-primary focus:border-primary outline-none" 
              rows="3"
              value={editingScheme.eligibility}
              onChange={e => setEditingScheme({...editingScheme, eligibility: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Required Documents (IDs comma separated)</label>
            <Input 
              value={editingScheme.requiredDocuments.map(d => d.id).join(', ')} 
              disabled
              className="bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">Requires developer assistance to modify document schemas.</p>
          </div>

          <div className="pt-4 flex justify-end">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save Configuration
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
