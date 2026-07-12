# AssetFlow — Enterprise Asset & Resource Management System

A full-stack ERP platform for tracking, allocating, and managing organizational assets and shared resources.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM, Axios, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcryptjs
- **File Upload**: Cloudinary + Multer

## Team Members

| Member | Module |
|---|---|
| Member 1 | Organization Setup + Audit |
| Member 2 | Assets + Allocation & Transfer |
| Member 3 | Resource Booking + Maintenance |
| Member 4 | Dashboard + Reports + Notifications + Integration |

## Getting Started

### Backend
```bash
cd server
npm install
cp .env.example .env   # Fill in your values
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Environment Variables

See `server/.env.example` for required variables.

## API Base URL

```
http://localhost:5000/api
```
