export const INITIAL_SCHEMES = [
  {
    id: 'nfst',
    name: 'National Fellowship for Scheduled Tribes (NFST)',
    description: 'Financial assistance for ST students pursuing M.Phil and Ph.D. degrees in Sciences, Humanities, Social Sciences and Engineering.',
    benefits: 'Fellowship of ₹31,000 to ₹35,000 per month plus HRA and contingency.',
    eligibility: 'ST candidates who have passed the Post-Graduate examination.',
    deadline: '2024-11-30',
    requiredDocuments: [
      { id: 'caste', name: 'Caste Certificate' },
      { id: 'pg_marksheet', name: 'PG Marksheet' },
      { id: 'admission', name: 'Ph.D./M.Phil Admission Letter' }
    ],
    seats: 750,
  },
  {
    id: 'nos',
    name: 'National Overseas Scholarship (NOS)',
    description: 'Financial assistance to ST students selected for pursuing higher studies abroad (Master\'s, Ph.D., and Post-Doctoral research).',
    benefits: 'Tuition fees, maintenance allowance, travel expenses, and contingency.',
    eligibility: 'ST candidates with at least 60% marks in qualifying exam. Family income below ₹6,000,000.',
    deadline: '2024-12-15',
    requiredDocuments: [
      { id: 'caste', name: 'Caste Certificate' },
      { id: 'income', name: 'Income Certificate' },
      { id: 'admission', name: 'Foreign University Admission Letter' },
      { id: 'passport', name: 'Passport Copy' }
    ],
    seats: 20,
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-NFST-001',
    applicantId: 'stu-1',
    applicantName: 'Ravi Kumar',
    schemeId: 'nfst',
    status: 'draft',
    stage: 'Draft',
    submittedAt: null,
    data: {
      personal: { name: 'Ravi Kumar', email: 'ravi@example.com', phone: '9876543210', gender: 'Male', dob: '1998-05-12' },
      academic: { pgDegree: 'M.Sc. Physics', pgUniversity: 'Delhi University', pgPercentage: '78' },
      institution: { name: 'JNU', admissionDate: '2023-08-01', researchTopic: 'Quantum Materials' },
      income: { familyIncome: '250000' }
    },
    documents: [],
    history: [
      { date: '2024-10-01T10:00:00Z', action: 'Application Draft Created', by: 'Student' }
    ],
    comments: []
  },
  {
    id: 'APP-NOS-002',
    applicantId: 'stu-2',
    applicantName: 'Priya Meena',
    schemeId: 'nos',
    status: 'submitted',
    stage: 'Under Verification',
    submittedAt: '2024-10-15T14:30:00Z',
    data: {
      personal: { name: 'Priya Meena', email: 'priya.m@example.com', phone: '9123456789', gender: 'Female', dob: '1999-02-25' },
      academic: { ugDegree: 'B.Tech CS', ugUniversity: 'NIT Warangal', ugPercentage: '85' },
      institution: { name: 'Stanford University', admissionDate: '2024-09-01', course: 'M.S. Computer Science' },
      income: { familyIncome: '500000' }
    },
    documents: [
      { id: 'caste', name: 'Caste Certificate', file: 'caste_cert.pdf', status: 'uploaded' },
      { id: 'income', name: 'Income Certificate', file: 'income_cert.pdf', status: 'uploaded' },
      { id: 'admission', name: 'Foreign University Admission Letter', file: 'admission.pdf', status: 'uploaded' },
      { id: 'passport', name: 'Passport Copy', file: 'passport.pdf', status: 'uploaded' }
    ],
    history: [
      { date: '2024-10-10T09:00:00Z', action: 'Application Draft Created', by: 'Student' },
      { date: '2024-10-15T14:30:00Z', action: 'Application Submitted', by: 'Student' }
    ],
    comments: []
  },
  {
    id: 'APP-NFST-003',
    applicantId: 'stu-3',
    applicantName: 'Amit Munda',
    schemeId: 'nfst',
    status: 'correction',
    stage: 'Correction Required',
    submittedAt: '2024-10-12T11:00:00Z',
    data: {
      personal: { name: 'Amit Munda', email: 'amit@example.com', phone: '9988776655', gender: 'Male', dob: '1997-11-15' },
      academic: { pgDegree: 'M.A. History', pgUniversity: 'Ranchi University', pgPercentage: '65' },
      institution: { name: 'Ranchi University', admissionDate: '2023-07-15', researchTopic: 'Tribal Movements' },
      income: { familyIncome: '300000' }
    },
    documents: [
      { id: 'caste', name: 'Caste Certificate', file: 'caste.pdf', status: 'uploaded' },
      { id: 'pg_marksheet', name: 'PG Marksheet', file: 'marksheet.pdf', status: 'rejected' },
      { id: 'admission', name: 'Ph.D./M.Phil Admission Letter', file: 'admission.pdf', status: 'uploaded' }
    ],
    history: [
      { date: '2024-10-12T11:00:00Z', action: 'Application Submitted', by: 'Student' },
      { date: '2024-10-14T10:15:00Z', action: 'Correction Requested', by: 'Officer (AI Assisted)' }
    ],
    comments: [
      { by: 'Officer', text: 'The uploaded PG Marksheet is blurred and unreadable. Please upload a clear scanned copy.', date: '2024-10-14T10:15:00Z' }
    ]
  },
  {
    id: 'APP-NOS-004',
    applicantId: 'stu-4',
    applicantName: 'Sunita Oraon',
    schemeId: 'nos',
    status: 'verified',
    stage: 'Verified',
    submittedAt: '2024-10-05T09:30:00Z',
    data: {
      personal: { name: 'Sunita Oraon', email: 'sunita@example.com', phone: '8877665544', gender: 'Female', dob: '2000-01-20' },
      academic: { ugDegree: 'B.Sc. Biology', ugUniversity: 'Delhi University', ugPercentage: '88' },
      institution: { name: 'Oxford University', admissionDate: '2024-10-01', course: 'M.Sc. Biology' },
      income: { familyIncome: '450000' }
    },
    documents: [
      { id: 'caste', name: 'Caste Certificate', file: 'caste.pdf', status: 'verified' },
      { id: 'income', name: 'Income Certificate', file: 'income.pdf', status: 'verified' },
      { id: 'admission', name: 'Foreign University Admission Letter', file: 'admission.pdf', status: 'verified' },
      { id: 'passport', name: 'Passport Copy', file: 'passport.pdf', status: 'verified' }
    ],
    history: [
      { date: '2024-10-05T09:30:00Z', action: 'Application Submitted', by: 'Student' },
      { date: '2024-10-08T14:20:00Z', action: 'Verified and Forwarded', by: 'Officer' }
    ],
    comments: []
  },
  {
    id: 'APP-NFST-005',
    applicantId: 'stu-5',
    applicantName: 'Kiran Gond',
    schemeId: 'nfst',
    status: 'selected',
    stage: 'Selected',
    submittedAt: '2024-09-01T10:00:00Z',
    data: {
      personal: { name: 'Kiran Gond', email: 'kiran@example.com', phone: '7766554433', gender: 'Female', dob: '1996-08-10' },
      academic: { pgDegree: 'M.Tech', pgUniversity: 'IIT Bombay', pgPercentage: '82' },
      institution: { name: 'IIT Bombay', admissionDate: '2023-01-15', researchTopic: 'AI for Healthcare' },
      income: { familyIncome: '550000' }
    },
    documents: [
      { id: 'caste', name: 'Caste Certificate', file: 'caste.pdf', status: 'verified' },
      { id: 'pg_marksheet', name: 'PG Marksheet', file: 'marksheet.pdf', status: 'verified' },
      { id: 'admission', name: 'Ph.D./M.Phil Admission Letter', file: 'admission.pdf', status: 'verified' }
    ],
    history: [
      { date: '2024-09-01T10:00:00Z', action: 'Application Submitted', by: 'Student' },
      { date: '2024-09-10T11:00:00Z', action: 'Verified and Forwarded', by: 'Officer' },
      { date: '2024-09-20T16:00:00Z', action: 'Selected', by: 'Committee' }
    ],
    comments: []
  }
];

export const CURRENT_USER_STUDENT = {
  id: 'stu-new',
  name: 'Anjali Santhal',
  role: 'student',
  email: 'anjali@example.com'
};
