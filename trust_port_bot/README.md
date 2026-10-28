# TrustPort Telegram Serverless Security Bot 🛡️

Autonomous cybersecurity bot powered by the **Telegram Serverless Platform** (running on native V8 isolates) and embedded SQLite database.

## Mission
TrustPort protects Telegram communities and individual users from mobile malware, trojanized Android packages (APKs), and malicious software cracks by:
1. **Automated Group Chat Shield:** Automatically detecting, intercepting, and wiping any uploaded `.apk` file from protected group chats in sub-second latency, preventing members from falling victim to banking trojans, SMS stealers, and spyware.
2. **Static APK Analysis:** Allowing private users to upload APKs for deep heuristic inspection (dangerous Android permissions like Accessibility abuse, Overlay injection, SMS interception).
3. **Open-Source Software Directory (FOSS):** Supplying safe, vetted open-source alternatives to frequently pirated proprietary software to remove the incentive for downloading high-risk modded APKs.

---

## Technical Stack & Architecture
- **Runtime:** Telegram Serverless isolated V8 sandboxes
- **SDK:** `@tgcloud/cli` & `sdk` (native Telegram Bot API, SQLite `sdk/db`, outbound `fetch`)
- **Database:** Serverless SQLite with automatic migrations
- **Interception Latency:** `< 180ms`
- **Application ID:** `app7829659109`

---

## Bot Commands & Features
- `/start` — Welcome screen, capability overview, and interactive menu.
- `/scan` — Instructions for uploading/forwarding an APK for static vulnerability analysis.
- `/alternatives` (or `/foss`) — Searchable directory of verified open-source software replacements.
- `/stats` — Real-time telemetry (threats blocked, communities protected, scans performed).
- `/about` — Origin story, 4-person student founding team, regional startup competition 2nd place achievement.
- `/help` — Group administrator guide and permissions setup.

---

## How to Protect a Telegram Group
1. Add `@trust_port_bot` to your group.
2. Promote the bot to **Administrator** with **Delete Messages** permission.
3. TrustPort will monitor the chat and instantly delete any `.apk` file posted, alerting the group with a security breakdown.

---

## Deployment & Development
```bash
# Check status
npx tgcloud status

# Deploy module changes to Telegram Cloud
npx tgcloud push

# Run database migrations
npx tgcloud migrate --yes

# Test server-side endpoint locally
npx tgcloud run endpoints/getStats "{}"
```
