# SmartEdu

AI-Enabled Scholarship and Fellowship Management System Prototype

This is an interactive demonstration prototype for the Ministry of Tribal Affairs (MoTA) Scholarship & Fellowship Management System for Scheduled Tribes (SFMS).

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd SmartEdu.app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Demo Roles & Walkthrough

The prototype includes three working roles that share a synchronized LocalStorage state.

1. **Student**
   - View available schemes (NFST, NOS).
   - Start an application, upload sample documents, and save drafts.
   - See AI document extraction simulation.
   - Correct flagged issues.
   - Track progress and payments.

2. **Reviewing Officer**
   - Monitor applications via a dashboard.
   - Review submitted documents with AI-assisted extraction checks.
   - Request corrections or forward to the committee.
   - Modify scheme configuration.

3. **Selection Committee**
   - View only verified applications.
   - Make final selection decisions.

Use the **Demo Role** switcher in the top navigation bar to seamlessly jump between roles and test the end-to-end workflow.

## Limitations
- This is a frontend-only prototype. Data is persisted to the browser's LocalStorage.
- Authentication is simulated.
- "AI Document Verification" is mocked with sample logic on the income certificate to demonstrate the expected flow.
- No real integrations with external government APIs (Aadhaar, PFMS, DigiLocker) are implemented in this demo.
