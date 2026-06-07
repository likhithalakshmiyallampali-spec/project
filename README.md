# Enterprise Mini Job Portal

A full-stack, responsive career platform built using the MERN architecture (MongoDB, Express, React, Node.js). This platform provides a clean interface for recruiters to manage corporate listings and a streamlined workflow for candidates to discover positions, filter by classification, and submit applications.

---

## Technical Stack Architecture

### Frontend Application Layer
* React (Functional components with hooks for stable state and side effects)
* Architecture Helpers: `useState`, `useEffect`, `useCallback` for optimized performance
* Styling: Native responsive design with modular CSS layouts and fluid typography
* Network Client: Native JavaScript Fetch API for asynchronous telemetry

### Backend Infrastructure Engine
* Runtime Environment: Node.js
* Web Framework: Express.js (RESTful API design pattern)
* Communication Format: Standard JSON request and response payloads

### Database Persistence Tier
* Database Engine: MongoDB Community Server
* Object Data Modeling (ODM): Mongoose ORM
* Database Validations: Strict structural definitions, required-field guardrails, and type mapping

---

## Structural Project Blueprint

```text
mini-job-portal/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection infrastructure
│   ├── controllers/
│   │   ├── applicationController.js # Candidate submission request management
│   │   └── jobController.js      # Job posting lifecycle CRUD operations
│   ├── models/
│   │   ├── Application.js       # Relational database schema for applicants
│   │   └── Job.js               # Structural database schema for job postings
│   ├── routes/
│   │   ├── applicationRoutes.js # Routing mapping for candidate submissions
│   │   └── jobRoutes.js          # Routing mapping for job lifecycle execution
│   ├── package.json              # Backend engine configurations and packages
│   └── server.js                 # Network entry-point and application engine
└── client/
    ├── public/
    │   └── index.html            # Primary single-page DOM document container
    ├── src/
    │   ├── components/
    │   │   ├── ApplicationModal.js # Interactive application collection form
    │   │   ├── JobCard.js        # High-density job detail card layout
    │   │   ├── JobForm.js        # Dynamic recruiter creation and editing form
    │   │   └── Navbar.js         # Navigation controls and layout theme toggle
    │   ├── pages/
    │   │   ├── AdminApplications.js # Relational table view for recruiter review
    │   │   └── Dashboard.js      # Main interactive search and filter dashboard
    │   ├── App.js                # Core layout composer and application state
    │   ├── index.css             # Unified dark/light theme style parameters
    │   └── index.js              # Virtual DOM mount point configuration
    └── package.json              # Client workspace configurations and packages
nstallation and Environment Setup
Prerequisites
MongoDB Community Server must be installed and running on mongodb://localhost:27017/

Node.js (Long Term Support version) must be installed on your operating system

Tier 1: Initialize and Run Backend Server
Open a system terminal panel and navigate directly into the server directory:

Bash
cd server
Install all core backend architectural dependencies:

Bash
npm install
Launch the development server engine via nodemon:

Bash
npm run dev
The execution terminal will output:

Plaintext
Infrastructure serving runtime operations on port 5000
MongoDB Connected: localhost
Tier 2: Initialize and Run Frontend Client
Open a secondary, separate terminal panel and navigate into the client workspace:
Bash
cd client
Install all local user interface dependencies:
Bash
npm install
Start the Webpack local development engine:
Bash
npm start
Documented API Endpoints
Your web browser will automatically open a local session pointing to http://localhost:3000.
The system handles a standard GET request at /api/jobs to fetch all active job listings from the database. This route is fully integrated with your dashboard filters to accept optional URL query parameters for live search text, job type classifications, compensation sorting, and pagination boundaries.  The system executes a POST request at /api/jobs to commit a brand-new job entry to the MongoDB collection. This path requires a complete request body payload containing the title, company name, geographic location, job type classification, gross salary, and a full role description.  The system targets a GET request at /api/jobs/:id to retrieve full structural metadata fields for a single, specific job posting by passing its unique MongoDB document identifier directly through the URL path.  The system utilizes a PUT request at /api/jobs/:id to handle modification operations for a specific vacancy. It targets the existing entry using the unique document ID in the URL path and accepts a request body containing the updated data fields.  The system maps a DELETE request at /api/jobs/:id to permanently remove a specific vacancy file node from the centralized application portal cluster based on the targeted MongoDB document identifier provided in the URL path.  The system routes a POST request at /api/jobs/:id/apply to submit a candidate application payload directly to the data pipeline. The route binds the submission to the targeted position using the URL identifier and stores the applicant's name, email, and phone number in a dedicated collection.  The system deploys a GET request at /api/jobs/:id/applications to fetch all candidate submissions tied to a particular role. It uses the specific job identifier from the path to display the relational table data inside the recruiter console.
Core System Validation Rules
To prevent data corruption, both frontend form controls and backend database layers enforce the following validation parameters:

Required Fields Constraint: Every field within the recruiter deployment form and applicant contact modal must be populated. Blank strings or undefined variables are blocked.

Compensation Format: The salary field is restricted to numerical inputs. Negative values are blocked.

Contact Email Verification: Candidate inputs are tested against a rigid standard regular expression pattern to guarantee valid structure (username@domain.extension).

Phone Entry Validation: Contact telephone properties must contain a valid series of numerical digits to prevent character corruption during recruiter follow-ups.

Production UI/UX Integration Features
Auto-Seeding Engine: When first initialized, if the local MongoDB database has no active documents, the dashboard safely injects three baseline Indian tech sector vacancies denominated in Indian Rupees (₹).

Responsive Layout Design: The visual interface automatically scales between compact phone displays, high-density tablet views, and wide desktop layout grids.

Theme Control Switch: Features a unified dark and light mode toggle that shifts layout variables instantly without interrupting local search metrics or text inputs.

Loading and Null Caches: The client is built to handle asynchronous connection lag using automated loading indicators. If users refine filters beyond available categories, the grid shifts to show a clear empty placeholder state.
#PROJECT SCREEN SHORTS 
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/ac38a7ac-a9d3-4d42-bb50-718fa4892bd7" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/aa482a5f-d8e9-42c2-8d91-77a7fd01ee96" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0563a883-c34b-45a5-b5ba-868f96cb9e09" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/3b733ba9-ac4f-4235-b055-532a47f9c1de" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/52f1157a-9a56-43d7-8a9c-640606a24b9d" />



