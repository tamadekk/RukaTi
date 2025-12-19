# RukaTi - Project Overview

## Executive Summary

**RukaTi** (Croatian: "Hand to You") is a local service marketplace platform designed specifically for Rijeka, Croatia. The platform connects service providers with customers seeking local help across various categories including home repairs, cleaning, tutoring, pet care, landscaping, and event support.

### Vision

Create an uncompromisingly simple, functional, and clutter-free service marketplace that makes finding and offering local services effortless.

### Mission

Solve the broken process of finding local help in Rijeka by providing a dedicated, searchable, and user-friendly platform that eliminates the chaos of Facebook groups and the overwhelming nature of generic classified ad sites.

---

## Problem Statement

### Current Pain Points

**For Customers:**

- **Google Maps:** Too broad, difficult to filter for specific services
- **Facebook Groups:** Outdated, chaotic, unsearchable, poor user experience
- **Njuškalo:** Overwhelmed with product ads, not service-focused
- **No Centralized Hub:** No single dedicated place to find local service providers

**For Service Providers:**

- Limited visibility in fragmented channels
- Difficulty reaching potential customers
- No professional platform to showcase services
- Complex profile management on existing platforms

---

## Solution Overview

RukaTi provides a **Technical Minimalist** web platform where:

✅ **Customers** can find services in seconds with intuitive search and filters  
✅ **Providers** gain visibility without complex profile management  
✅ **No app required** - fast, responsive web platform accessible from any device  
✅ **Community-driven** trust through reviews and ratings  
✅ **Location-based** filtering by Rijeka neighborhoods (Zamet, Centar, Trsat, etc.)

---

## Technology Stack

### Frontend

- **Framework:** React 19.1.1 with TypeScript
- **Build Tool:** Vite 7.1.7
- **Routing:** TanStack Router 1.133.13
- **Styling:** Tailwind CSS 4.1.14
- **UI Components:** Radix UI primitives with shadcn/ui
- **State Management:** Zustand 5.0.8
- **Form Handling:** React Hook Form 7.66.1 + Zod 4.1.12 validation

### Backend

- **Database & Auth:** Supabase 2.76.1
- **Runtime:** Bun (development and package management)

### Design Philosophy

- **Technical Minimalist** aesthetic: Sharp edges, high-contrast borders, monospace typography
- Clean, functional, and fast user experience
- Mobile-first responsive design

---

## Core Features

### 🔐 Authentication & User Management

- Email/password authentication via Supabase
- User profiles with avatar, bio, contact information
- Role-based access (customers and service providers)
- Profile editing and management

### 🛠️ Service Management

- **Create Services:** Modal-based service creation with image upload
- **Edit Services:** In-place editing of service details
- **Delete Services:** Service removal with confirmation
- **Availability Toggle:** Simple on/off switch for accepting work
- **Service Details:** Title, description, category, location, pricing, contact info

### 🔍 Service Discovery

- **Category Filtering:** Browse by service categories
- **Neighborhood Filters:** Location-based filtering (Zamet, Centar, Trsat)
- **Search Functionality:** Find specific services quickly
- **Service Cards:** Visual preview with key information

### 📊 Dashboard

- **Provider Dashboard:** Manage all services in one place
- **Service Statistics:** View service performance
- **Profile Management:** Edit profile information
- **Service Overview:** Quick access to all listings

### 🎨 Service Categories

1. **Home Repairs** - Fix, maintain, and improve your home
2. **Cleaning** - Professional cleaning services
3. **Tutoring** - Educational support and learning
4. **Pet Care** - Care for your furry friends
5. **Landscaping** - Garden and outdoor maintenance
6. **Event Help** - Party planning and event support
7. **Other** - Miscellaneous services

---

## Database Schema

### Tables

#### `user_profiles`

- `user_id` (UUID, Primary Key)
- `email` (String)
- `full_name` (String, nullable)
- `phone_number` (String)
- `role` (String)
- `rating` (Number, nullable)
- `avatar` (String URL, nullable)
- `bio` (Text, nullable)
- `created_at` (Timestamp)

#### `user_services`

- `service_id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → user_profiles)
- `title` (String)
- `description` (Text)
- `category` (String)
- `location` (String)
- `contact` (String)
- `price_range` (String)
- `availability` (String)
- `rating` (Number)
- `service_image` (String URL, nullable)
- `created_at` (Timestamp)

---

## User Roles

### 🙋 Customer

- Browse and search services
- View service details
- Contact service providers
- Leave reviews (planned)
- Save favorite services (planned)

### 👷 Service Provider

- Create and manage service listings
- Update availability status
- Respond to customer inquiries (planned)
- Build reputation through reviews (planned)
- Promote listings (planned)

---

## Current Development Status

### ✅ Completed Features

- User authentication (login/register)
- User profile management
- Service creation (modal-based)
- Service editing
- Service deletion
- Service browsing with category filters
- Service detail pages
- Provider profile pages
- Responsive dashboard layout
- Technical Minimalist UI design

### 🚧 In Progress

- Service management refinements
- Enhanced image upload experience
- Form validation improvements

### 📋 Planned Features (MVP Scope)

- [ ] Reviews and ratings system
- [ ] Direct messaging between users
- [ ] Saved/favorite services list
- [ ] Promoted listings for visibility boost
- [ ] Advanced search and filtering
- [ ] Notification system
- [ ] Service analytics for providers

---

## Design Principles

### Technical Minimalist Aesthetic

1. **Sharp Edges:** No rounded corners, clean geometric shapes
2. **High Contrast:** Bold borders and clear visual hierarchy
3. **Monospace Typography:** Technical, precise font choices
4. **Functional First:** Every element serves a purpose
5. **No Clutter:** Clean layouts with ample whitespace
6. **Fast Performance:** Optimized for speed and efficiency

### User Experience

- **Simple Navigation:** Intuitive menu structure
- **Quick Actions:** Modal-based workflows for speed
- **Visual Feedback:** Clear loading states and confirmations
- **Mobile Responsive:** Seamless experience across devices
- **Accessibility:** Semantic HTML and ARIA labels

---

## Target Market

### Geographic Focus

- **Primary:** Rijeka, Croatia
- **Neighborhoods:** Zamet, Centar, Trsat, and surrounding areas

### Target Users

**Service Seekers:**

- Homeowners needing repairs or maintenance
- Busy professionals seeking cleaning or pet care
- Parents looking for tutors
- Event organizers needing help

**Service Providers:**

- Independent contractors and freelancers
- Small service businesses
- Part-time service providers
- Skilled individuals offering local help

---

## Competitive Advantages

1. **Local Focus:** Dedicated to Rijeka, not a generic national platform
2. **Service-Specific:** Built for services, not product sales
3. **Simple UX:** No complex features or overwhelming options
4. **Fast & Lightweight:** Quick load times, responsive interface
5. **Community-Driven:** Trust through local reviews and ratings
6. **No App Required:** Web-based, accessible from any device
7. **Free to Start:** Low barrier to entry for providers

---

## Success Metrics (Proposed)

### User Acquisition

- Number of registered users (customers + providers)
- Monthly active users
- Service listings created
- User retention rate

### Engagement

- Services viewed per session
- Search queries performed
- Contact requests initiated
- Time spent on platform

### Business Health

- Provider-to-customer ratio
- Services per provider
- Category distribution
- Geographic coverage within Rijeka

### Quality

- Average service rating
- Review completion rate
- Response time to inquiries
- User satisfaction score

---

## Project Repository

- **GitHub:** `https://github.com/your-username/rukati` (placeholder)
- **Tech Stack:** React + Vite + Tailwind + Supabase
- **Package Manager:** Bun
- **License:** Private (not specified)

---

## Contact & Team

_Project maintained by Vladyslav Raduta_

---

**Last Updated:** December 18, 2025
