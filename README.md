# Bill Qin Real Estate - Silicon Valley Expert

A modern, high-tech minimalistic real estate website for Bill Qin, a Silicon Valley real estate expert with 20+ years of experience. The website can be prereviewed at https://billqin.com/

## 🎨 Design Philosophy

This website embodies a professional, trustworthy, and tech-forward aesthetic inspired by modern real estate platforms like Flyhomes.com. The design features:

- **Color Palette**: 
  - Primary Gold: `#cc9e31` (brand color)
  - Navy: `#11182a` (header/footer background)
  - Cream: `#faf9f7` (main background)
  - Accents: Light grey, silver, and gradient overlays

- **Typography**: Large, bold headings with clean sans-serif fonts
- **Animations**: Subtle fade-in, slide-up, and scale effects on scroll
- **Layout**: Clean grid system with generous white space
- **Shadows**: Soft, professional drop shadows for depth

## ✨ Features

### Homepage Sections

1. **Fixed Header**
   - Dark navy background with gold navigation links
   - Logo, full navigation menu
   - Language switcher (EN/中文)
   - Phone button and primary CTA
   - Responsive mobile menu

2. **Hero Section**
   - Full-width background image (California home with family)
   - Large, impactful headline with Bill Qin's name
   - Trust badges (300+ transactions, 4 licenses, 100% 5-star)
   - Multiple CTA buttons (Buy, Sell, Rent)
   - Optional video thumbnail

3. **Stats Section**
   - Four animated metric cards
   - Icons with color-coded backgrounds
   - Hover effects and staggered animations

4. **Why Choose Bill Qin**
   - Four feature cards with gradient icons
   - Detailed descriptions of expertise
   - Hover animations and decorative elements

5. **Transaction Map & Case Stories**
   - Interactive map visualization with pins
   - Real case studies with Problem → Strategy → Result format
   - Transaction statistics

6. **Zillow Reviews**
   - Large 5-star badge with Zillow branding
   - Carousel of client testimonials
   - Navigation controls and dots
   - Profile images and ratings

7. **Video Library**
   - Tabbed interface (Buying, Selling, Management, Tips)
   - Video thumbnails with play buttons
   - Duration and view count badges
   - Three large CTA cards for different user types

8. **Footer**
   - Contact information with icons
   - Quick links grid
   - Social media links
   - Professional credentials

### Contact Page

- **Functional Contact Form** with backend integration
- Form validation using React Hook Form + Zod
- Success/error states with animations
- Contact information sidebar
- Office hours display
- Beautiful gradient hero section

## 🛠 Technology Stack

### Frontend
- **React 19** - UI framework
- **TanStack Router** - Type-safe routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **tRPC** - End-to-end typesafe APIs
- **Prisma ORM** - Database management
- **PostgreSQL** - Database
- **TypeScript** - Type safety

### Development
- **Vite** - Build tool
- **Docker** - Containerization
- **ESLint & Prettier** - Code quality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bill-qin-real-estate
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development environment
```bash
./scripts/run
```

This will:
- Start PostgreSQL in Docker
- Run database migrations
- Start the development server
- Open the app at `http://localhost:3000`

### Database Management

```bash
# Push schema changes to database
pnpm db:push

# Open Prisma Studio (database GUI)
pnpm db:studio

# Generate Prisma client
pnpm db:generate
```

## 📁 Project Structure

```
src/
├── components/
│   └── homepage/          # Homepage section components
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Stats.tsx
│       ├── WhyChoose.tsx
│       ├── TransactionMap.tsx
│       ├── ZillowReviews.tsx
│       ├── VideoHighlights.tsx
│       └── Footer.tsx
├── routes/
│   ├── index.tsx          # Homepage route
│   └── contact/
│       └── index.tsx      # Contact page with form
├── server/
│   └── trpc/
│       ├── procedures/
│       │   └── contact.ts # Contact form backend
│       └── root.ts        # tRPC router
└── styles.css             # Global styles

prisma/
└── schema.prisma          # Database schema

public/
└── bill-qin-real-estate-homepage.jpg  # Logo
```

## 🎯 Implemented Features

### Frontend (Fully Implemented)
- ✅ Responsive homepage with all sections
- ✅ Fixed navigation header with mobile menu
- ✅ Animated hero section with CTAs
- ✅ Stats cards with hover effects
- ✅ Why Choose section with gradient cards
- ✅ Transaction map with case studies
- ✅ Zillow reviews carousel
- ✅ Video library with tabs
- ✅ Professional footer
- ✅ Contact page with form

### Backend (Implemented)
- ✅ Contact form submission (tRPC mutation)
- ✅ Form data storage in PostgreSQL
- ✅ Input validation with Zod
- ✅ Contact submissions query (for admin)

### Backend (Mock/Frontend Only)
- 📋 Transaction map data (static)
- 📋 Reviews (static)
- 📋 Video library (static)
- 📋 Stats (static)

*Note: These features use frontend mock data and can be connected to a backend in future iterations.*

## 🎨 Design Specifications

### Colors
```css
Primary Gold: #cc9e31
Gold Light: #d4ab4a
Gold Dark: #b38a1f
Navy: #11182a
Navy Light: #1a2538
Navy Dark: #0a0f1a
Cream: #faf9f7
Cream Light: #fdfcfb
Cream Dark: #f5f3f0
```

### Typography
- Headings: Bold, tracking-tight
- Body: Antialiased, gray-900
- Font Family: Inter, system-ui, sans-serif

### Shadows
- Soft: `0 2px 15px -3px rgba(0, 0, 0, 0.07)`
- Soft Large: `0 10px 40px -10px rgba(0, 0, 0, 0.1)`

### Animations
- Fade In: 0.5s ease-in-out
- Slide Up: 0.5s ease-out
- Scale In: 0.3s ease-out

## 🔮 Future Enhancements

### High Priority
- [ ] Property listing database and search
- [ ] User authentication for clients
- [ ] Admin dashboard for managing content
- [ ] Email notifications for contact form
- [ ] Real Zillow API integration
- [ ] Video hosting and streaming
- [ ] Blog/CMS integration

### Medium Priority
- [ ] Chinese language support (完整中文版本)
- [ ] Property comparison tool
- [ ] Mortgage calculator
- [ ] Market analytics dashboard
- [ ] Client portal
- [ ] Document upload/sharing

### Nice to Have
- [ ] Live chat integration
- [ ] Virtual tour integration
- [ ] Mobile app (React Native)
- [ ] AI-powered property recommendations
- [ ] Social media auto-posting

## 📝 Environment Variables

Currently, no environment variables need to be changed. The application uses:

- **Database URL**: Hardcoded for Docker internal connection
- **No API keys required** for current features

Future features may require:
- Email service API keys (SendGrid, Mailgun)
- Zillow API credentials
- Video hosting credentials (Vimeo, YouTube)
- Cloud storage credentials (AWS S3, MinIO)

## 🤝 Contributing

This is a custom project for Bill Qin Real Estate. For modifications or enhancements, please contact the development team.

## 📄 License

Proprietary - All rights reserved by Bill Qin Real Estate

## 📞 Contact

**Bill Qin Real Estate**
- Phone: +1-408-888-4888
- Email: bill@billqin.com
- Office: 123 Main Street, San Jose, CA 95110

---

Built with ❤️ for Silicon Valley's premier real estate expert
