import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import {  Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { FaSquareXTwitter } from "react-icons/fa6"; 
import Image from 'next/image'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/next"

 
// Enhanced metadata - Nextra will merge this with page-level metadata
export const metadata = {
  title: {
    default: 'Okito Documentation - Modern Tools for Developers',
    template: '%s | Docs'
  },
  description: 'Complete documentation for Okito  - the one stop solution to developer problems in Solana ecosystem.',
  keywords: ['Okito', 'SDK', 'documentation', 'developer tools', 'API', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Okito Team', url: 'https://okito.dev' }],
  openGraph: {
    type: 'website',
    siteName: 'Okito Documentation',
    images: ['/og-image.png'], // 1200x630px image
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OkitoLabs',
    creator: '@notabbytwt',
  },
  metadataBase: new URL('https://docs.okito.dev'), // Replace with your domain
}



const navbar = (
  <Navbar
    logo={
      <>
        <Image
          src="/Okito-dark.png"
          alt="Okito Logo"
          height={100}
          width={100}
          className="hidden dark:block"
          priority
        />
        <Image
          src="/Okito-light.png"
          alt="Okito Logo"
          height={100}
          width={100}
          className="block dark:hidden"
          priority
        />
      </>
    }
    logoLink={"https://okito.dev"}
    projectLink={"https://github.com/Absterrg0/Okito"}
    chatLink={'https://x.com/OkitoLabs'}
    chatIcon = {<FaSquareXTwitter size={30} className='greyscale' aria-label="Follow us on X"/>}
  >
  </Navbar>
)

const search = <Search placeholder='Search documentation...'></Search>

const footer = <Footer>
<div className="flex w-full flex-col items-center justify-between gap-6 py-8 md:flex-row md:gap-4">
  {/* Left Section - Brand & Copyright */}
  <div className="flex flex-col items-center gap-2 md:items-start">
    <div className="flex items-center gap-2">
      <Image
        src="/Okito-dark.png"
        width={100}
        height={100}
        alt="Okito Logo"
        className="hidden dark:block"
      />
      <Image
        src="/Okito-light.png"
        width={100}
        height={100}
        alt="Okito Logo"
        className="block dark:hidden"
      />
    </div>
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {new Date().getFullYear()} © Okito Labs. All rights reserved.
    </p>
  </div>

  {/* Right Section - Social Links with better SEO */}
  <div className="flex items-center gap-4">
    <a
      href="https://github.com/Absterrg0/Okito"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      aria-label="GitHub Repository"
      title="View source code on GitHub"
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
    
    <a
      href="https://x.com/OkitoLabs"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      aria-label="Follow on X (Twitter)"
      title="Follow us on X for updates"
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>

   

    <a
      href="https://www.npmjs.com/package/@okito/sdk"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      aria-label="NPM Package"
      title="Install via NPM"
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
      </svg>
    </a>

 
  </div>
</div>
</Footer>
 
export default async function RootLayout({ children }:{
  children:React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head color={{hue: 120, saturation: 60, lightness: 70}}>
        {/* Essential SEO additions that Nextra doesn't cover */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#b6f5b6" />
                
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      
      <body>
        <Analytics />
        
        <Layout
          navbar={navbar}
          search={search}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Absterrg0/Okito"
          feedback={{
            content: 'Question? Give us feedback →',
            labels: 'feedback'
          }}
          editLink={null}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}