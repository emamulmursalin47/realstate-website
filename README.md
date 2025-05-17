Next.js Real Estate Platform
A modern, responsive real estate platform built with the latest Next.js version, featuring public-facing property listings and an admin panel for management.

Features
Public Facing Pages
Home Page: Showcases featured properties and brand highlights
Properties Listing: View, filter, and sort available properties
Property Details: Comprehensive view of individual properties
Recently Sold Properties: Displays successfully sold properties
Contact Page: Allows users to get in touch with the agency
Admin Panel
Dashboard: Overview of metrics and quick links
Property Management: Create, edit, delete, and view all properties
Inquiries Management: View and respond to user inquiries
Recently Sold Management: Add and manage sold properties
User Management: Manage admin and editor users
Tech Stack
Framework: Next.js with App Router
State Management: Redux Toolkit
Authentication: JSON Web Tokens (JWT)
Styling: Tailwind CSS
Form Handling: React Hook Form with Zod validation
UI Components: Headless UI
Icons: Heroicons & Lucide React
Carousel: Embla Carousel
Notifications: React Toastify
Project Structure
src/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin pages
│   ├── properties/       # Properties pages
│   ├── sold/             # Sold properties page
│   ├── contact/          # Contact page
│   ├── globals.css       
│   ├── layout.tsx
│   └── page.tsx          # Home page
├── components/
│   ├── admin/            # Admin components
│   ├── AppBar.tsx
│   ├── CallToAction.tsx
│   ├── ContactForm.tsx
│   ├── FeaturedProperties.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── MobileMenu.tsx
│   ├── PageLayout.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyDescription.tsx
│   ├── PropertyFeatures.tsx
│   ├── PropertyFilters.tsx
│   ├── PropertyGallery.tsx
│   ├── PropertyList.tsx
│   ├── SoldPropertyCard.tsx
│   ├── SoldPropertyList.tsx
│   └── WhyChooseUs.tsx
└── lib/
    ├── redux/            # Redux store and slices
    └── utils.ts          # Utility functions
Getting Started
Prerequisites
Node.js 18+ and npm/yarn
Installation
Clone the repository
bash
git clone https://github.com/yourusername/real-estate-app.git
cd real-estate-app
Install dependencies
bash
npm install
# or
yarn install
Start the development server
bash
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser
Demo Admin Login
Email: admin@example.com
Password: admin123
Features in Detail
Public Features
Property Search & Filtering: Filter by type, location, price range, bedrooms, etc.
Responsive Design: Fully optimized for all devices
Property Galleries: Image carousels for property listings
Contact Forms: Submit inquiries about specific properties or general questions
Admin Features
Property Management: Full CRUD operations for properties
Image Management: Upload and manage property images
Inquiry Management: View, mark as read/unread, and delete inquiries
Dashboard Analytics: View statistics about listings and inquiries
Development Notes
Mock Data
This project includes mock data for demonstration purposes. In a production environment, you would connect to a real database.

Authentication
A simple JWT authentication is implemented. For a production app, consider using NextAuth.js or similar solutions with proper security practices.

API Routes
The API routes use in-memory data structures for demonstration. In a real application, these would connect to a database.

License
This project is licensed under the MIT License - see the LICENSE file for details.

