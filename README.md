Mini E-Commerce Application (Skill Test)

This project is a mini e-commerce frontend application built as part of a skill test.
It demonstrates real-world frontend development practices including SSR, animations, authentication flow, and state management.

 Tech Stack

Framework: Next.js (App Router)

Styling: Tailwind CSS

State Management: Zustand

Animations: GSAP

Authentication: Token-based (JWT simulation)

Rendering: Server-Side Rendering (SSR) + Client Components

 Features Implemented
 Global Layout (SSR)

Server-side rendered Navbar

Conditional rendering for Login / Profile / Logout

Logo navigation to Home

Footer (static, SSR)

 Product Listing

Pixel-perfect UI based on provided Figma

Product cards with:

Product image

Color variants

Size selection

Buy Now button

GSAP hover animation

Product image moves upward

Smooth easing

No CSS-only animations

 Authentication Flow (Static OTP)

Phone number login

Static OTP verification (as allowed in test)

New user name collection

Token stored in cookies

Protected Profile and Order pages

Logout clears authentication cookies

 Order Flow

Buy Now creates an order

Order Success page displays:

Order ID

Selected size & color

Price

Payment status

Profile page lists all user orders

Same order card reused across pages

 Setup Instructions
 Clone the Repository
git clone <your-repo-url>
cd <project-folder>

 Install Dependencies
npm install

 Run Development Server
npm run dev


The app will be available at:

http://localhost:3000

 Authentication Notes

OTP is static for testing purposes (as mentioned in the skill test).

JWT is simulated and stored in cookies.

Protected routes validate authentication before rendering.

 Tech Decisions & Rationale
Why Next.js (App Router)?

Enables Server-Side Rendering for Navbar, Footer, and protected routes.

Supports modern React patterns with Server & Client Components.

Improves performance and SEO.

Why GSAP?

Required by the skill test.

Provides precise, smooth animations.

Used for hover interactions on product cards.

Why Zustand for State Management?

Lightweight and minimal boilerplate.

Ideal for managing client-side global state (orders, UI flow).

Works well with Next.js App Router.

Why Static Data / Mock Flow?

Backend persistence was not part of the assignment.

Focus was on frontend flow, UI accuracy, and logic handling.

A centralized client-side store simulates real-world behavior.

Why Cookie-based Auth?

Matches real production authentication patterns.

Allows SSR route protection.

Clean separation between public and protected pages.

 Responsiveness

Designed primarily for desktop as per Figma

Layout adapts cleanly to smaller screens

Mobile responsiveness can be extended easily
