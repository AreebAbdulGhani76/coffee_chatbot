# Coffee Wagera — Website & AI Chatbot ☕✨

Official web platform and AI conversational assistant for **Coffee Wagera** ("Pakistan's Largest Coffee Brand!"). Powered by Google Gemini with full grounding on Coffee Wagera's official branches, 100% Arabica menu, free co-working policies, and barista training.

[![Live Demo](https://img.shields.io/badge/Demo-coffeechatbot.vercel.app-success?style=for-the-badge&logo=vercel)](https://coffeechatbot.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/AreebAbdulGhani76/coffee_chatbot)

---

## 🌐 Live Website

- **Production URL**: [https://coffeechatbot.vercel.app/](https://coffeechatbot.vercel.app/)
- **Repository**: [https://github.com/AreebAbdulGhani76/coffee_chatbot](https://github.com/AreebAbdulGhani76/coffee_chatbot)

---

## 🌟 Key Features

- **Brand-Authentic Website**: Interactive menu with add-to-cart, city branch locator, testimonials carousel, founder story, and audio greeting.
- **Embedded AI Chatbot**:
  - Grounded directly on the official Coffee Wagera knowledge base.
  - Multi-lingual support: English, Urdu, and Roman Urdu.
  - Polite, warm tone embodying founder Mush Panjwani's "Dhinchak" spirit.
  - Top quick prompt pills (`💻 Free Workspace`, `☕ Top Coffees`, `📍 Store Locations`, etc.).
  - Clean formatted responses without raw markdown symbols.
- **Secure Backend Proxy Architecture**:
  - Gemini API key is safely held on the server / serverless environment in `.env`.
  - Frontend makes secure `/api/chat` calls with zero secret exposure in browser network inspect.
  - Resilient model fallback (`gemini-3.5-flash` ➡️ `gemini-3.5-flash-lite`).
- **Dual Deployment Ready**:
  - Runs locally with native zero-dependency Node.js (`server.js`).
  - Deployable directly to **Vercel** with Serverless Functions (`api/chat.js`).

---

## 📁 Project Structure

```text
├── api/
│   └── chat.js                     # Vercel Serverless Function proxy (/api/chat)
├── vercel.json                     # Vercel deployment configuration
├── .env.example                    # Environment variable template
├── .gitignore                      # Git exclusion rules (protects .env)
├── server.js                       # Native Node.js HTTP server & local Gemini proxy
├── index.html                      # Coffee Wagera responsive website
├── styles.css                      # Bespoke styling (amber & espresso theme)
├── app.js                          # Client-side cart & UI interactions
├── chatbot.js                      # Chatbot logic & secure backend communicator
├── chatbot.css                     # Floating chatbot window & top pill styles
├── cw-avatar.svg                   # Authentic Coffee Wagera logo avatar
├── cw-logo.png                     # Coffee Wagera brand mark
├── coffee_wagera_knowledge_base.md # Comprehensive 269-line training markdown
└── README.md                       # Project documentation
```

---

## 🚀 Quick Start (Local)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### 2. Setup Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and insert your Google Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash
PORT=3000
```

### 3. Run the Local Server
Launch the server (zero external npm dependencies required):
```bash
node server.js
```

### 4. Open in Browser
Visit [http://localhost:3000/](http://localhost:3000/) in your web browser.

---

## ☁️ Deployment on Vercel

1. Push your code to GitHub (already configured with `api/chat.js` and `vercel.json`).
2. Go to your [Vercel Dashboard](https://vercel.com/) and open the **coffeechatbot** project.
3. Navigate to **Settings** ➡️ **Environment Variables**.
4. Add the following environment variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key`
5. Trigger a redeploy (or push a new commit). Vercel will automatically configure the `/api/chat` Serverless Function!

---

## 🔒 Security Best Practices

1. **Never commit `.env`**: `.env` is listed in `.gitignore` to prevent secret leakage.
2. **Production Deployment**: On platforms like Vercel or Render, set `GEMINI_API_KEY` under project Environment Variables in the platform dashboard.
