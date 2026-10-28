# TrustPort Web Portal (Cloudflare Pages) 🌐

Modern cybersecurity platform landing page, interactive static APK analyzer sandbox, and open-source software directory for TrustPort.

- **Production Domain:** `https://trustport.azoff.uz`
- **Hosting Target:** Cloudflare Pages (Static Edge Distribution)
- **Language:** English
- **Brand Identity:** Official TrustPort blue shield logo and cyber aesthetic

---

## Features
1. **Interactive APK Threat Scanner Sandbox:** Client-side static inspection engine calculating SHA-256 binary hash, inspecting Android package headers, flagging high-risk manifest permissions (`BIND_ACCESSIBILITY_SERVICE`, `SYSTEM_ALERT_WINDOW`, `RECEIVE_SMS`), and scoring vulnerabilities (0–100).
2. **Real-Time Group Chat Automation Simulator:** Interactive Telegram chat mockup showing sub-second message quarantine and educational threat alerts.
3. **Open-Source Software Matrix (FOSS):** Curated, searchable directory of vetted alternatives to pirated and cracked software across 5 categories.
4. **Academic Research & Portfolio Case Study:** Comprehensive breakdown of the 4-person student founding team, threat vector analysis, zero-trust serverless architecture, and 2nd place regional startup award.
5. **Live Telemetry & Bot Quick Start:** Synced metrics, command references (`/start`, `/scan`, `/alternatives`, `/stats`, `/help`), and direct links to `@trust_port_bot`.

---

## Cloudflare Pages Deployment Guide

### Option 1: Automatic Deployment via Git (Recommended)
1. Push this repository to GitHub/GitLab.
2. In the **Cloudflare Dashboard**, navigate to **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Configure build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `web`
5. Click **Save and Deploy**.
6. Under **Custom domains**, add `trustport.azoff.uz`. Cloudflare will provision an SSL certificate and configure DNS automatically.

### Option 2: Direct Deployment via Wrangler CLI
```bash
# Inside the web directory:
npm run build
npx wrangler pages deploy dist --project-name=trustport
```

---

## Local Development
```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
