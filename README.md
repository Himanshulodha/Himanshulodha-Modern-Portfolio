# Himanshu Lodha - Personal Portfolio 🚀

> A modern, AI-powered portfolio website showcasing full-stack development expertise with an intelligent chatbot assistant

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Google AI](https://img.shields.io/badge/Google_AI-Gemini_2.5-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![AstraDB](https://img.shields.io/badge/AstraDB-Vector_DB-FF6B6B?style=flat-square)](https://www.datastax.com/products/datastax-astra)

## 🌟 Features

### 🎯 Core Portfolio Features
- **Responsive Design**: Fully responsive across all devices with modern UI/UX
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Dynamic Sections**: Experience, Education, Projects, Publications, and Contact
- **Interactive Components**: Smooth animations and hover effects
- **Direct Scheduling**: Integrated Cal.com booking system for instant meeting scheduling
- **SEO Optimized**: Meta tags, structured data, and performance optimized

### 🤖 AI-Powered Chatbot
- **RAG (Retrieval-Augmented Generation)**: Intelligent chatbot with portfolio knowledge
- **Vector Search**: Semantic search through portfolio content using embeddings
- **Redis Caching**: 97% speed improvement with Upstash Redis for repeated queries
- **Real-time Responses**: Powered by Google Gemini 2.5 Flash model
- **Context-Aware**: Understands portfolio context for accurate responses

### 🔧 Technical Features
- **Edge Runtime**: Optimized API routes for fast response times
- **TypeScript**: Full type safety throughout the application
- **Component-Based**: Modular and reusable React components
- **Performance Optimized**: Image optimization, lazy loading, and efficient bundling

## 🏗️ Architecture

### Frontend Stack
```
Next.js 15 (App Router) + React 19
├── TypeScript for type safety
├── TailwindCSS for styling
├── Custom UI components
├── Cal.com scheduling integration
└── Responsive design system
```

### Backend & AI Stack
```
AI-Powered Chatbot
├── Google Gemini 2.5 Flash (LLM)
├── AstraDB Vector Database
├── Google text-embedding-004
├── Upstash Redis (Caching)
└── RAG Implementation
```

### Communication Stack
```
Contact & Scheduling
├── Cal.com booking system
├── Direct meeting scheduling
├── Contact form integration
└── Email communication
```

### Data Management
```
Portfolio Data
# Himanshu Lodha — Personal Portfolio 🚀

> A modern, AI-augmented personal portfolio showcasing projects, research, and technical achievements.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

This repository contains the source for Himanshu Lodha's portfolio website. It includes:

- A responsive Next.js + TypeScript frontend with Tailwind CSS styling
- A RAG-powered chatbot that answers questions about projects and publications
- JSON-driven content (projects, experiences, publications, socials, certificates)
- A contact form with Resend integration and mailto fallback

---

## Quick Start (development)

Requirements:
- Node.js 18+
- npm or yarn

1. Clone the repository

```bash
git clone https://github.com/Himanshulodha/Created-Website-to-add-TODOs-list.git
cd "himanshulodha.com-main"
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create `.env.local` in project root and add required keys

```env
# Optional: used by contact form
RESEND_API_KEY=your_resend_api_key

# Optional: used for AI embeddings and vector DB if you enable them
GOOGLE_AI_API_KEY=your_google_ai_api_key
ASTRA_DB_APPLICATION_TOKEN=your_astra_db_token
ASTRA_DB_API_ENDPOINT=your_astra_db_endpoint

# Optional Upstash Redis (caching)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

4. (Optional) Build embeddings for RAG

```bash
npm run build-embeddings
```

5. Start development server

```bash
npm run dev
```

Open http://localhost:3000

---

## Project layout (high level)

```
app/                # Next.js App Router
    components/       # Reusable UI components (ChatBot, Navbar, Footer, etc.)
    api/              # Server endpoints (chat, send-email, etc.)
    contact/          # Contact page & schedule integration
src/                # Content JSON (projects, publications, socials, certificates)
lib/                # Utilities (vector DB, cache)
public/             # Static assets
```

---

## Content & Certificates

- Certificates and publications are stored in `src/publications.json` and are used by the About page and ChatBot. You can edit that file to add or update certificates. The ChatBot has a quick way to surface certificate titles and links.

If you'd like certificates displayed as cards or a modal, I can implement a dedicated UI component for that.

---

## Contact form

- The contact endpoint (`/api/send-email`) uses Resend to send emails. If `RESEND_API_KEY` is not configured the client shows a mailto fallback so visitors can email directly.
- Ensure `RESEND_API_KEY` is set in production (Vercel environment variables) if you want automatic email delivery.

---

## Customization & Deployment

- Deploy to Vercel for the easiest setup. Add environment variables via the Vercel dashboard.
- To change content, update the JSON files under `src/` and (if using embeddings) run `npm run build-embeddings`.

---

## Contact & Links

- Email: himanshulodha@gmail.com
- LinkedIn: https://linkedin.com/in/himanshulodha
- GitHub: https://github.com/himanshulodha

---

If you want, I can:

- Create certificate cards or a modal view
- Improve the ChatBot responses to include certificate links and descriptions
- Add deployment notes or a Makefile for common tasks

Tell me what you'd like next and I will implement it.

## 📞 Contact

**Himanshu Lodha**
- 🌐 Portfolio: [himanshulodha.com](https://himanshulodha.com)
- 📅 Schedule a Call: Book directly through the contact page
- 💼 LinkedIn: [himanshu-lodha](https://linkedin.com/in/himanshu-lodha)
- 🐙 GitHub: [Himanshulodha](https://github.com/Himanshulodha)
- 📧 Email: himanshulodha2004@gmail.com

### Preferred Communication
1. **Quick Discussions**: Use the integrated scheduling system for immediate calls
2. **Detailed Inquiries**: Contact form for comprehensive project discussions
3. **Professional Networking**: LinkedIn for industry connections
4. **Technical Collaboration**: GitHub for code-related discussions

---

**Built with ❤️ by Himanshu lodha** | **Powered by AI & Modern Web Technologies**
