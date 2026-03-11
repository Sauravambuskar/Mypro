# TaskPro - Task Management Application

A complete, production-ready task management application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- ✅ Task CRUD operations (Create, Read, Update, Delete)
- ✅ Subtasks management with progress tracking
- ✅ Project organization with color-coding
- ✅ Real-time dashboard with statistics
- ✅ Priority levels (Low, Medium, High)
- ✅ Task status tracking (Todo, In Progress, Completed)
- ✅ Responsive UI with Tailwind CSS
- ✅ Persistent storage via localStorage (JSON)
- ✅ TypeScript type safety throughout
- ✅ Beautiful icons with Lucide React
- ✅ Vercel deployment ready

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx       - Statistics overview
│   ├── TaskForm.tsx        - Create/edit task modal
│   ├── TaskList.tsx        - Task list with filters
│   ├── TaskCard.tsx        - Individual task card
│   ├── SubtaskViewer.tsx   - Subtask management modal
│   ├── ProjectManager.tsx  - Project CRUD
│   └── Navbar.tsx          - Navigation bar
├── hooks/
│   └── useTaskData.ts      - Data management hook
├── pages/
│   ├── Home.tsx            - Dashboard page
│   ├── Tasks.tsx           - Tasks management page
│   └── Projects.tsx        - Projects management page
├── types/
│   └── index.ts            - TypeScript interfaces
├── styles/
│   └── globals.css         - Global styles
├── App.tsx                 - App root with routing
└── main.tsx                - React entry point
```

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

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Deploy to Vercel

1. Push to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite and deploys

Or run:
```bash
npm run deploy
```

## License

ISC
