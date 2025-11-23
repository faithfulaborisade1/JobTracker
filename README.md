# Job Application Tracker

A simple MVP for tracking job applications built with React, Vite, Supabase, and Tailwind CSS.

## Features

- **Authentication**: Sign up, login, and logout with Supabase Auth
- **Add Jobs**: Track company name, job title, URL, date applied, status, and notes
- **View Jobs**: Dashboard with table view of all applications
- **Edit Jobs**: Update job details and status
- **Delete Jobs**: Remove applications
- **Filter**: Filter jobs by status (saved, applied, interviewing, rejected, offer)

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Supabase (Auth + Database)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

## Setup Instructions

### 1. Clone and Install

```bash
cd job-tracker
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Follow the instructions in [DATABASE_SETUP.md](./DATABASE_SETUP.md) to create the database schema
3. Get your project credentials from Project Settings > API

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Add your environment variables in the project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

## Database Schema

```sql
jobs
├── id (UUID, primary key)
├── user_id (UUID, references auth.users)
├── company (TEXT, required)
├── title (TEXT, required)
├── url (TEXT)
├── status (TEXT, required) - saved | applied | interviewing | rejected | offer
├── date_applied (DATE)
├── notes (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Usage

1. **Sign Up/Login**: Create an account or log in with your email
2. **Add Job**: Click "Add Job" button and fill in the form
3. **View Jobs**: All your applications appear in the table
4. **Filter**: Use the dropdown to filter by status
5. **Edit**: Click "Edit" on any job to update it
6. **Delete**: Click "Delete" to remove a job (with confirmation)

## Project Structure

```
job-tracker/
├── src/
│   ├── components/
│   │   ├── Auth.jsx          # Login/Signup component
│   │   ├── Dashboard.jsx     # Main dashboard with jobs table
│   │   └── JobForm.jsx       # Add/Edit job form
│   ├── lib/
│   │   └── supabase.js       # Supabase client configuration
│   ├── types/
│   │   └── database.js       # Type definitions and constants
│   ├── App.jsx               # Main app component
│   └── index.css             # Tailwind CSS
├── DATABASE_SETUP.md         # Database setup instructions
└── vercel.json               # Vercel configuration
```

## License

MIT
