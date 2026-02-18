# Fora Travel — Campaign Tracker & Forum Post Generator

Internal tools for the Travel Partners marketing team.

---

## Campaign Tracker (`index.html`)

Track partner marketing campaigns with table, calendar, and by-partner views.

**Features:**
- Add/edit campaigns with name, partner, type, dates, status, and results (impressions, clicks, bookings, revenue)
- Filter by partner, type, and status
- Three views: Table, Calendar, By Partner
- Stats bar showing totals at a glance
- All data saved locally in your browser

**To use:** Open `index.html` in any browser.

---

## Forum Post Generator (`forum-post-generator.html`)

Generates a formatted Circle forum post from a folder of deal screenshots, with hotel names automatically linked to their Fora advisor portal pages.

**Features:**
- Auto-reads screenshots using AI (Groq) to extract deal details
- Auto-looks up supplier IDs from a built-in map — new IDs you enter are saved for future use
- Post title and byline auto-fill with the current month
- Copies the finished post as rich HTML ready to paste directly into Circle (links preserved)
- Download as a standalone HTML file

**To use:**
1. Open `forum-post-generator.html` in **Chrome or Edge** (required for folder access)
2. Get a free Groq API key at [console.groq.com/keys](https://console.groq.com/keys) and paste it in
3. Click **Choose Folder** and select a folder of deal screenshots
4. Each screenshot is auto-read — review the fields and hit **Save & Next**
5. Click **Generate Post → Copy to Clipboard → paste into Circle**

**Adding new supplier IDs:**
The tool has a built-in map of common hotel supplier IDs. If a hotel isn't found automatically, paste its ID into the yellow field — it will be saved to your browser for next time.

---

## Setup

No build step or server needed. All files are plain HTML/CSS/JS.

Clone the repo and open either file directly in a browser:

```
git clone https://github.com/margaux-noel/fora-campaign-tracker.git
open fora-campaign-tracker/index.html
```
