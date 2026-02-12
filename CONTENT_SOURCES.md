# Content Sources

This file documents where each content group in `src/content/content.ts` comes from.

## CV PDF (Salama-Malek-Full-Stack-Developer.pdf)
- Experience roles and date ranges used as primary truth:
  - Frontend Team Leader — Informa Core Technologies — February 2025 – January 2026
  - Assistant Project Manager — ITSPORTS — November 2024 – January 2025
  - Freelance Coach — EYouth — October 2024 – December 2024
- Education structure requirement:
  - MISIS (Master)
  - ITI (Diploma)

## Pasted site text (provided in chat / reflected in locale content)
- Person summary/about lines.
- Navigation labels (Home/About Me/Portfolio/Experience/Testimonials/Contact).
- Stats:
  - Programming Languages: 5
  - Years Experience: 2
  - Frameworks: 7
- Section labels for Hero/About/Portfolio/Experience/Testimonials/Contact/Footer.
- Portfolio project list and descriptions:
  - IntervueAI
  - E-Commerce Platform
  - TaskFlow Manager
  - Weather Analytics Dashboard
  - Social Media Analytics
  - Mobile Fitness Tracker
- Self-employed experience entry:
  - Self-employed — Freelance Full-Stack Developer — 2023–Present

## Existing repository content
- Contact details and links:
  - Emails: `hello@sm4tech.com`, `salamahassanein@gmail.com`
  - Phone: `+7 993 287 3992`
  - LinkedIn, Khamsat, GitHub URLs
- Skills taxonomy and technologies used to fill skill groups (frontend/backend/mobile/db/tools/cloud & security).
- Fallback text for testimonials state (`Coming soon`) to avoid fabricating testimonials.

## Notes on missing fields
- MISIS and ITI year values from the CV PDF were not available in repository files, so missing year detail is marked with TODO where necessary.
- Project live demo URLs were intentionally set to `null` in `src/content/content.ts` when not confirmed by direct source requirements.
