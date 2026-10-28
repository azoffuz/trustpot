# TrustPort Cybersecurity Project Remake 🛡️

A comprehensive cybersecurity platform and student startup project built for ethical digital defense and university portfolio submission.

## Project Overview
TrustPort was co-founded by a 4-person student team to shield everyday internet users and Telegram communities from mobile malware, trojanized Android applications (.apk), and credential-harvesting software cracks. The project was presented at a regional startup competition, advancing through multiple rigorous stages and securing **2nd Place at the district level**.

The project consists of two dedicated components:
1. **`trust_port_bot/`**: Telegram Serverless bot running on isolated V8 execution environments (`app7829659109`). Features instant group chat threat automation (intercepting & deleting rogue APK files in `<180ms`), deep private static APK vulnerability scanning, and an embedded SQLite database.
2. **`web/`**: Modern, high-performance web portal designed for Cloudflare Pages deployment at [`https://trustport.azoff.uz`](https://trustport.azoff.uz). Features an interactive APK threat inspection sandbox, real-time group chat interception simulator, curated Free and Open-Source Software (FOSS) directory, and university case study narrative.

---

## Directory Structure
```
trustport-remake/
├── trust_port_bot/               # Telegram Serverless Bot Project
│   ├── .tgcloud/credentials      # Bot token credentials (app7829659109:...)
│   ├── tgcloud/
│   │   ├── schema.js             # SQLite tables (chats, threatLogs, scans)
│   │   ├── handlers/
│   │   │   ├── message.js        # APK detection, group auto-delete, DM scans
│   │   │   └── callback_query.js # Interactive button handler
│   │   ├── lib/
│   │   │   ├── analyzer.js       # Static APK heuristics & permission scoring
│   │   │   └── alternatives.js   # Curated open-source software catalog
│   │   └── endpoints/
│   │       └── getStats.js       # Live API endpoint for metrics
│   ├── package.json
│   └── README.md
│
├── web/                          # Cloudflare Pages Web Portal (trustport.azoff.uz)
│   ├── public/
│   │   ├── _headers              # Cloudflare Pages security & caching headers
│   │   ├── _redirects            # Cloudflare Pages routing configuration
│   │   ├── favicon.ico           # Official TrustPort icon
│   │   └── assets/               # Brand logos and iconography
│   ├── src/
│   │   ├── data/
│   │   │   ├── sampleApks.js     # Real-world threat profiles for sandbox
│   │   │   └── fossData.js       # Curated FOSS alternatives database
│   │   ├── style.css             # Cyber defense theme & responsive grid
│   │   └── main.js               # Interactive sandbox, simulator, & telemetry
│   ├── dist/                     # Pre-built production bundle ready for Cloudflare
│   ├── index.html                # Main landing page
│   ├── vite.config.js            # Vite build configuration
│   ├── package.json
│   └── README.md
│
├── My fascination with digital technology...docx  # Personal statement draft
└── UK University Personal Statement Guide.pdf     # Personal statement reference
```

---

## Quick Start & Verification

### 1. Telegram Serverless Bot
The bot is already linked and deployed to Telegram Serverless cloud:
```bash
cd trust_port_bot
# Check status relative to cloud snapshot
npx tgcloud status

# Test server-side endpoint in the cloud
npx tgcloud run endpoints/getStats "{}"
```

### 2. Web Portal (Cloudflare Pages)
```bash
cd web
# Preview local dev server
npm run dev

# Build for Cloudflare Pages (outputs to dist/)
npm run build
```
Cloudflare Pages deployment:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Domain:** `trustport.azoff.uz`
