---
date: 2025-03-14 13:28:33 +01:00
tags: [Obsidian]
---

Having fun with Google Calendar events and #Obsidian meeting notes:

Automation:
- Sync in Apple Calendar
- Apple Shortcuts to export today's events (1 ICS file per event 🤷‍♂️)
- Node script to merge events in one single ICS file
- Apache server to make ICS file available to HTTP clients

In Obsidian:
- “New note” in relevant folder
- Templater plugin choses the right template
- Templater script uses ICS plugin to get events, select the current one, and fill new note with title and attendees

🤯