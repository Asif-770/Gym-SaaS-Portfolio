![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)

<div align="center">

# 🏋️‍♂️ GYM-SAAS-PORTFOLIO
**Automated Gym Management & Member Engagement Platform**

[![Vercel Deployment](https://img.shields.io/badge/Live_Demo-Hosted_on_Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://asif-gym-portfolio.vercel.app/)
[![Next.js](https://img.shields.io/badge/Built_With-Next.js_14-neon?style=for-the-badge&logo=nextdotjs&logoColor=white)](#)

---

## 📺 Project Walkthrough
**Click the thumbnail below to watch the system in action**

[![Gym SaaS Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

*Note: Replace **YOUR_VIDEO_ID** in both links above with the 11-character ID from your YouTube URL.*

</div>

### 🛠️ Tech Stack
* **Framework:** Next.js (App Router)
* **Database:** Supabase + Prisma ORM
* **Styling:** Tailwind CSS (Dark Mode Optimized)
* **Automation:** Vercel Cron Jobs

## 💎 Core Dashboard Features

* **👥 Member Management:** Complete CRUD system to add, edit, and track gym members, including their joining dates, active plans, and payment statuses.
* **💳 Dynamic Pricing Engine:** Admin-controlled membership tiers. Creating or updating a plan in the dashboard instantly updates the public-facing `/pricing` page. Includes a dynamic "Most Popular" toggle.
* **📅 Attendance Tracking & Analytics:** Log daily check-ins. The system automatically calculates a member's consistency percentage and assigns dynamic performance ratings (e.g., *Excellent*, *Good*, *Poor*).
* **💬 Smart Messaging Hub:** A dual-tab communication center:
  * **Member Alerts:** Auto-filters members with pending payments or expiring plans. Features 1-click WhatsApp messaging (via `wa.me` links) and instant Email sending.
  * **Public Inquiries:** Receives and tracks messages submitted from the public `/contact` form, featuring unread badges and easy reply management.
* **⚡ Automated Background Tasks:** Configured cron jobs to automatically sweep the database daily and send bulk email reminders to members whose plans expire in exactly 5 days.

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

```text
gym_template/
├── app/
│   ├── (public)/                 # Public-facing Website
│   │   ├── page.tsx              # Landing Page
│   │   ├── pricing/page.tsx      # Dynamic Pricing Page
│   │   └── contact/page.tsx      # Public Contact Form
│   ├── admin/                    # Secure SaaS Dashboard
│   │   ├── layout.tsx            # Admin layout with Sidebar
│   │   ├── dashboard/page.tsx    # Main metrics & Top Members
│   │   ├── members/page.tsx      # Member directory & CRUD
│   │   ├── attendance/page.tsx   # Check-ins & Stats Modal
│   │   ├── plans/page.tsx        # Pricing tier management
│   │   ├── messages/page.tsx     # Smart Messaging Hub & Inquiries
│   │   └── settings/page.tsx     # Gym profile configuration
│   ├── api/                      # Backend Route Handlers
│   │   ├── members/route.ts      # Member API
│   │   ├── plans/route.ts        # Plans API (with [id] delete check)
│   │   ├── contact/route.ts      # Public inquiries API
│   │   ├── email/route.ts        # Automated Email sending engine
│   │   ├── whatsapp/route.ts     # WhatsApp API bridge
│   │   └── cron/notifications/   # Automated daily sweep logic
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── admin/
│   │   └── Sidebar.tsx           # Dashboard navigation
│   ├── contact/
│   │   ├── ContactHero.tsx       
│   │   ├── ContactDetails.tsx    # Client-side form with submit logic
│   │   └── ContactMap.tsx        
│   └── pricing/
│       └── PricingCards.tsx      # Server Component fetching live DB plans
│
├── lib/
│   └── prisma.ts                 # Prisma Client Singleton
│
├── prisma/
│   └── schema.prisma             # PostgreSQL Database Models
│
├── public/                       # Static assets (images, icons)
├── .env                          # Environment variables (DB URL, API Keys)
├── tailwind.config.ts            # Tailwind theme configuration
└── package.json                  # Dependencies and scripts
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

This repository demonstrates a "modern SaaS architecture" for portfolio and client demo purposes.
