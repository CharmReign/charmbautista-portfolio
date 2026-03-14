import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Charm Bautista | Java Engineer',
  description:
    'Java Engineer with 9+ years building enterprise applications across banking, fintech, and government sectors. Specializes in Spring Boot, API integration, and production support.',
  keywords: [
    'Java Engineer',
    'Spring Boot',
    'Software Engineer',
    'Backend Developer',
    'Enterprise Applications',
    'API Integration',
    'Microservices',
    'Abu Dhabi',
    'UAE',
  ],
  authors: [{ name: 'Charm Bautista' }],
  openGraph: {
    title: 'Charm Bautista | Senior Java / Software Engineer',
    description:
      'Java Engineer with 9+ years building enterprise applications across banking, fintech, and government sectors.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark text-slate-200 font-sans antialiased">{children}</body>
    </html>
  )
}
