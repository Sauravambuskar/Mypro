# TaskPro - Task Management Application

A comprehensive, production-ready task management application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 📊 **Dashboard** - Real-time statistics and project overview
- ✅ **Task Management** - Full CRUD with priorities, statuses, and due dates
- 🔀 **Subtasks** - Hierarchical task structure with progress tracking
- 📁 **Project Organization** - Color-coded projects to categorize tasks
- 💾 **Persistent Storage** - All data stored in localStorage as JSON
- 📱 **Responsive Design** - Mobile-friendly with Tailwind CSS
- 🔒 **TypeScript** - Full type safety throughout

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx       # Statistics overview
│   ├── TaskForm.tsx        # Create/edit task form
│   ├── TaskList.tsx        # Task list with filters
│   ├── TaskCard.tsx        # Individual task card
│   ├── ProjectManager.tsx  # Project CRUD
│   └── SubtaskViewer.tsx   # Subtask management
├── hooks/
│   └── useTaskData.ts      # Data management + localStorage
├── pages/
│   ├── Home.tsx            # Dashboard page
│   ├── Tasks.tsx           # Tasks management page
│   └── Projects.tsx        # Projects page
├── types/
│   └── index.ts            # TypeScript interfaces
├── styles/
│   └── globals.css         # Tailwind CSS imports
├── App.tsx                 # Main app with routing
└── main.tsx                # React entry point
```

## Deployment

Connect your GitHub repository to [Vercel](https://vercel.com) — it auto-detects the Vite configuration and deploys automatically on every push.

```bash
# Deploy manually
npm run deploy
```
