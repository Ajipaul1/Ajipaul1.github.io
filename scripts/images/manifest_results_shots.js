'use strict';
// Screens of the live Viraat Marine ERP for /results/ and /results/viraat-marine-erp/, captured 2026-09-06
// with the owner's director account and REDACTED before import (scripts/images/redact.ps1 pixelates every
// personal name, counterparty and rupee amount). The sign-in page is public and needs no redaction.
// Sources live in the session scratch folder; re-capture + re-redact if the desks change materially.
const S = 'C:/Users/User/AppData/Local/Temp/claude/C--Users-User/86d8ee1e-004d-4329-975e-aec306964e5f/scratchpad/redacted/';
const credit = 'Screenshot of the Viraat Marine ERP (built by TechAuditPros), redacted; TechAuditPros';
module.exports = [
  { src: S + 'signin.png', slug: 'vm-shot-signin', alt: 'The public sign-in page of the Viraat Marine ERP: Marine ERP Command Centre', credit },
  { src: S + 'director.png', slug: 'vm-shot-director', alt: 'The director desk: project health, approvals awaiting signature, announcements', credit },
  { src: S + 'design.png', slug: 'vm-shot-design', alt: 'The design desk: drawings in the vault, pending review, projects ready for invoice', credit },
  { src: S + 'register.png', slug: 'vm-shot-register', alt: 'The drawing and document register: 47 items under revision control with review status', credit },
  { src: S + 'purchase.png', slug: 'vm-shot-purchase', alt: 'The purchase desk: incoming material requests and their approval status', credit },
  { src: S + 'live.png', slug: 'vm-shot-live-stream', alt: 'The live activity stream: every system event from every desk', credit },
  { src: S + 'attendance.png', slug: 'vm-shot-attendance', alt: 'Attendance control: the daily clock-in and the regularisation queue', credit },
  { src: S + 'sitelog.png', slug: 'vm-shot-sitelog', alt: 'A yard supervisor desk: the daily site log form for crew attendance and work done', credit },
  { src: S + 'yard.png', slug: 'vm-shot-yard', alt: 'The production desk: active fabrications, manpower on site, delayed milestones', credit },
  { src: S + 'm-yard.png', slug: 'vm-shot-m-yard', alt: 'The production desk on a phone: active fabrications, manpower on site, delayed milestones', credit },
  { src: S + 'm-purchase.png', slug: 'vm-shot-m-purchase', alt: 'The purchase desk on a phone: requisitions, finance clearance, delayed deliveries', credit },
  { src: S + 'm-design.png', slug: 'vm-shot-m-design', alt: 'The drawing register on a phone: filters and the first register entry', credit },
];
