__Job Scheduler__
Job Scheduler is a task-management system that helps users organize jobs, track status, prioritize work.
It provides an intuitive UI built with React and a robust backend powered by Node.js and MySQL.

__1. Tech Stack__
# Frontend
React (Vite)
Tailwind CSS / ShadCN UI
React Router
Axios
Socket.io
Context API / Custom Hooks

# Backend
Node.js
Express.js
MySQL
JWT Authentication
Socket.io
Bcrypt / Crypto
Cron Jobs (for auto-clear OTP)

__2. Schema Design__
Database includes 3 Tables

users – stores user accounts
manage_otp – stores OTP for verification
jobs – stores job information

users Table
(user_id, full_name, email, password, role, last_login, status, is_active, created_at, updated_at)

manage_otp Table
(id, otp, created_by, created_at, updated_at)

jobs Table
(job_id, job_name, priority, description, payload, status, completed_at, created_by, created_at, updated_at)


__3. Architecture Explanation__
The Job Scheduler project is built using a standard Three-Tier Architecture, which separates the system into three independent layers: Presentation Layer, Application Layer, and Data Layer.

(i) Presentation Layer (Frontend – React + Vite + Socket.io)
This layer handles everything the user interacts with.

Responsibilities:
Displays job lists, statuses, and details
Handles user login with OTP
Sends/receives REST API requests for CRUD operations
Receives real-time updates from the backend via Socket.io (e.g., job status changes)
Manages state with Context API / custom hooks
Provides UI/UX with Tailwind / ShadCN

(ii) Application Layer (Backend – Node.js + Express + Socket.io)
This layer contains all business logic and acts as a bridge between the frontend and the database.

Responsibilities:
Authentication (OTP + JWT)
Job management (create, update, schedule)
User roles and permissions
Real-time job updates via Socket.io
Running cron jobs (e.g., clearing expired OTPs)
Data validation and REST API endpoints (/auth, /jobs, /users)

Socket.io Usage:
Sends real-time notifications to users when a job status changes (e.g., Running → Completed)

(iii) Data Layer (MySQL Database)
This layer securely stores all persistent data.

Responsibilities:
Store all project data
Maintain relationships (users → jobs)
Ensure fast query performance using indexes (idx_priority, idx_status)

__4. API documentation__
The Job Scheduler backend provides APIs for authentication, job management, and dashboard data. All endpoints accept and return JSON.

Authentication Routes
POST /login
- Login with email and password. No authentication required.

POST /verify-otp
- Verify OTP for login. No authentication required.

POST /send-otp
- Send OTP to user email or phone. No authentication required.

POST /signup
- Create a new user account. No authentication required.

POST /reset-password
- Reset user password. No authentication required.

PATCH /logout
- Logout the authenticated user. Requires a valid JWT token.

GET /me
- Get the current authenticated user’s information. Requires a valid JWT token.

Customer Routes
POST /jobs
- Create a new job. Requires authentication as a customer.
Request Body Example:
{
  "job_name": "My Task",
  "priority": "High",
  "description": "Description of the task"
}


GET /jobs
- Get all jobs created by the authenticated customer. Requires authentication as a customer.

GET /job/:id
- Get details of a specific job by its ID. Requires authentication as a customer.

POST /run-job/:id
- Update the status of a job or run a job. Requires authentication as a customer.
This endpoint also uses Socket.io to send real-time job status updates to the frontend.
Request Body Example:
{
  "status": "Running"
}

GET /dashboard/customer
- Retrieve dashboard data for the authenticated customer. Requires authentication as a customer.

__5. How webhook works__
A webhook is a way for one system to send real-time data to another system automatically whenever a specific event happens.
When I click on 'Run Job', the job status changes from Pending → Running, and after 3 seconds, it automatically updates to Completed, triggering the webhook.

__6. AI__
ChatGPT- GPT-5 mini.
claude- sonnet 4.5.


