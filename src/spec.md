# Specification

## Summary
**Goal:** Build a government digital services platform for rural panchayats enabling citizens to report complaints, request tree saplings, apply for rainwater harvesting and solar schemes, while allowing administrators to manage all requests and track sustainability metrics.

**Planned changes:**
- Implement JWT-based authentication with Citizen and Admin roles
- Create complaint reporting module with photo/audio upload, auto geo-location, and status tracking (Pending/In Progress/Completed)
- Build admin complaint management with category filters, worker assignment, and completion proof upload
- Add citizen rating system for completed complaints
- Implement tree plantation module with sapling requests, tree type selection, planting photo upload, and geo-tagging
- Create admin tree management with approval workflow, survival tracking, and survival rate analytics
- Build rainwater harvesting (Inkudu Gunta) module with house details and land photo upload
- Add admin rainwater management with worker assignment, completion tracking, water capacity recording, and groundwater impact analytics
- Implement solar scheme application integrated with Pradhan Mantri Surya Ghar Muft Bijli Yojana with Aadhaar, electricity bill, and house photo uploads
- Create admin solar management with document verification, installation status tracking, renewable energy metrics, and CO₂ reduction estimates
- Build comprehensive admin analytics dashboard with charts (bar, pie, line), map with color-coded markers, and recent activity feed
- Integrate map displaying complaints (red markers), trees (green markers), and solar homes (yellow markers) with category filters and popup details
- Design government-style UI with India emblem logo, village name header, navigation menu, English/Telugu language toggle, color-coded status badges, and saffron/green/white theme
- Create "My Requests" page showing all user submissions with status tracking
- Add Government Schemes information page with clickable scheme cards navigating to detailed scheme pages
- Implement footer with Panchayat office details, government disclaimer, and links to Privacy Policy, Terms of Service, and About pages
- Build backend data models for Users, Complaints, Trees, SolarApplications, and WaterProjects using Motoko and Internet Computer stable memory

**User-visible outcome:** Citizens can register, submit complaints/requests with photos and location, track their submissions, and rate completed work. Admins can manage all requests, assign workers, update statuses, upload completion proofs, and view analytics. The platform displays sustainability metrics including complaint completion rates, tree survival rates, solar installations, and environmental impact with visual dashboards and an interactive map.
