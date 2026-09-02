# Nuxt.js Blog

A full-featured blog web application with server-side rendering (SSR), optimized for SEO and high performance, complemented by a secured administrative panel for comprehensive content management.

Key Features
* **Server-Side Rendering (SSR) & Hydration:** Native Nuxt.js architecture ensures minimal Time to First Byte (TTFB), deep SEO optimization for search crawlers, and seamless client-side hydration.
* **File-System Routing:** Automatic route generation based on the pages/ directory structure, including nested and dynamic routes.
* **Administrative Panel (CRUD):** An isolated interface for managing articles and media files with route protection via Nuxt middleware.
* **Secure Authentication & Authorization:** Implementation of a JWT mechanism with role-based access control, protection of private endpoints, and lifecycle handling of tokens (Access/Refresh Token rotation).
* **State Management:** Centralized data storage and reactive application state management using Vuex.
* **Dynamic Content Builder:** A modular post-assembly system supporting arbitrary blocks—from formatted text and syntax-highlighted code blocks to media files and interactive components (sliders, accordions, tooltips).
* **Rich Text Editor:** Integration of CKEditor into the administrative panel for convenient visual editing of multimedia article content.

### Tech Stack
* **Framework:** Nuxt.js
* **Rendering:** Server-Side Rendering (SSR) with Client Hydration
* **Backend API:** Node.js, Express, MySQL
* **Language:** JavaScript
* **Build Tool:** Webpack
* **State Management:** Vuex
* **Routing:** Nuxt File-system Router
* **Styling:** SCSS
* **HTTP Client:** Axios
* **Authentication:** JSON Web Tokens (JWT)
* **Editor:** CKEditor
