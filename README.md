![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)

# 🚀 Gym SaaS Platform

Modern **Gym Website + Management System** built using a scalable SaaS architecture.

This platform helps gyms manage **members, attendance, payments, and membership plans** while also providing a **high-conversion landing website**.

The project demonstrates a **production-ready full-stack SaaS architecture** using modern technologies.

---

# 🌐 Live Demo

Public Website

```
https://your-project.vercel.app
```

Admin Dashboard

```
https://your-project.vercel.app/admin
```

Demo Login

```
email: demo@gym.com
password: 123456
```

---

# ✨ Core Features

## Public Website

• Modern SaaS landing page
• Pricing plans section
• Contact form
• SEO optimized layout
• Mobile responsive design

---

## Admin Dashboard

• Member management
• Membership plan management
• Attendance tracking
• Payment tracking
• Admin analytics dashboard

---

## Communication System

• WhatsApp message integration
• Email notifications
• Membership renewal alerts

---

# 🧠 System Architecture

```
User Browser
      │
      ▼
Next.js Frontend
      │
      ▼
Next.js API Routes
      │
      ▼
Prisma ORM
      │
      ▼
Supabase PostgreSQL Database
```

---

# 🏗 Technology Stack

Frontend

* Next.js (App Router)
* React
* Tailwind CSS

Backend

* Next.js API Routes

Database

* Supabase PostgreSQL

ORM

* Prisma

Deployment

* Vercel

Icons

* Lucide React

---

# 📂 Project Structure

```
gym-saas-platform
│
├── app
│   ├── page.tsx
│   ├── about
│   ├── contact
│   ├── plans
│   │
│   ├── admin
│   │   ├── dashboard
│   │   ├── members
│   │   ├── plans
│   │   ├── attendance
│   │   └── messages
│   │
│   └── api
│       ├── auth
│       ├── members
│       ├── plans
│       ├── attendance
│       └── whatsapp
│
├── components
│   ├── layout
│   ├── ui
│   ├── tables
│   └── forms
│
├── lib
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
│
├── prisma
│   └── schema.prisma
│
├── public
│   └── images
│
└── README.md
```

---

# ⚙️ Local Development

Clone repository

```
git clone https://github.com/yourusername/gym-saas-platform.git
```

Move to project directory

```
cd gym-saas-platform
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Open browser

```
http://localhost:3000
```

---

# 🔐 Environment Variables

Create `.env` file in project root.

```
DATABASE_URL=
JWT_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

# 🗄 Database Setup

Push Prisma schema to database

```
npx prisma db push
```

Generate Prisma client

```
npx prisma generate
```

---

# 🚀 Deployment Guide

This project is optimized for **Vercel deployment**.

Steps:

1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy project

After deployment your website will be available at

```
https://your-project.vercel.app
```

---

# 🔄 Development Workflow

1. Setup project environment
2. Configure database schema
3. Create API routes
4. Develop UI components
5. Connect frontend to backend
6. Test features locally
7. Deploy to production

---

# 🧪 Testing Strategy

Verify the following before deployment:

• Member creation
• Plan assignment
• Attendance tracking
• Payment tracking
• Contact form submission

---

# 🧩 Future Improvements

• Multi-gym SaaS support
• Stripe payment integration
• Automated WhatsApp messaging
• Advanced analytics dashboard

---

# 📄 License

All Rights Reserved.

This project and its source code are the intellectual property of the author.

Unauthorized copying or distribution of this code is prohibited.

---

# 👨‍💻 Author

**Md Asif Khan**

Full-Stack Developer
SaaS Platform Builder

---

# ⭐ Purpose

This repository demonstrates a **modern SaaS architecture** for portfolio and client demo purposes.
