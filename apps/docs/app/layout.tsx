import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
 
export const metadata = {
  title: "Docs"
}
 
const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>
const navbar = (
  <Navbar
    logo={<b>Okito</b>}
    logoLink={"https://okito.cc"}
    projectLink={"https://github.com/Absterrg0/Okito"}
    
  />
)

const search = <Search placeholder='Search docs...'></Search>





const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>
 
export default async function RootLayout({ children }:{
  children:React.ReactNode
}) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          search={search}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://x.com/notabbytwt"
          feedback={{content:null}}
          editLink = {null}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}