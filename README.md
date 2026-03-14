# charmbautista-portfolio

My personal portfolio website built with Next.js 14 and Tailwind CSS. It covers my background as a Senior Java / Software Engineer with 9+ years of experience across banking, fintech, and government sectors.

Live at: [linkedin.com/in/charmbautista](https://linkedin.com/in/charmbautista)

---

## Stack

- **Next.js 14** — App Router, Server Components, API Routes
- **TypeScript** — strict mode throughout
- **Tailwind CSS 3** — utility-first styling, no UI library
- **Nodemailer** — contact form via Gmail SMTP
- **Vercel** — deployment target

---

## Project Structure

```
charmbautista-portfolio/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts   # Contact form handler (Nodemailer)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx             # Fixed sidebar, mobile-responsive
│   │   ├── Hero.tsx               # Typed animation, profile ring
│   │   ├── About.tsx              # Profile card + animated counters
│   │   ├── Skills.tsx             # Progress bars, animated on scroll
│   │   ├── Resume.tsx             # Timeline layout with sidebar
│   │   ├── Projects.tsx           # Grid with category filters
│   │   ├── Services.tsx
│   │   ├── Testimonials.tsx       # Masonry layout
│   │   ├── ContactForm.tsx        # Controlled form with validation
│   │   ├── Footer.tsx
│   │   └── ScrollTop.tsx
│   └── lib/
│       └── data.ts                # All content in one place
├── public/
│   └── img/
│       ├── portfolio/
│       ├── profile/
│       └── person/
├── .env.local.example
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Getting Started

**Requirements:** Node.js 18.20.4 or higher.

```bash
npm install
```

Set up environment variables:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Gmail credentials:

```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
OWNER_EMAIL=charm.rmb@gmail.com
```

> Gmail App Passwords are separate from your account password. Generate one at
> [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) —
> 2-Step Verification must be enabled first.

Start the dev server:

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

---

## Contact Form

The `/api/contact` route handles form submissions. When someone sends a message it does two things:

1. Emails me the sender's name, email, and message.
2. Sends the sender an auto-reply confirming receipt.

Both are styled HTML emails. Required fields are `name`, `email`, and `message`.

---

## Content Updates

Everything — work history, skills, projects, services, testimonials — lives in `src/lib/data.ts`. Editing that one file updates the entire site. No need to touch any component.

---

## Deploying to Vercel

Push to GitHub, import the repo on [vercel.com](https://vercel.com), and add these environment variables in the project settings:

| Variable | Value |
|---|---|
| `GMAIL_USER` | Gmail address used for sending |
| `GMAIL_APP_PASSWORD` | 16-character app password |
| `OWNER_EMAIL` | Where contact form emails land |

Framework preset should auto-detect as Next.js. Hit deploy.

Or via CLI:

```bash
npx vercel --prod
```

---

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build locally
npm run lint     # ESLint
```

---

## Dependencies

```
next 14.2.5 · react 18.3.1 · typescript 5.5.3
tailwindcss 3.4.6 · nodemailer 6.9.14
```
