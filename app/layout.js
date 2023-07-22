import '@styles/global.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Promtpedia',
  description: 'Discover and share AI prompts',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />
      <body>
        <Provider>
          <div className='main'>
            <div className="gradient" />
          </div>
          <main className="app">
          <Nav />
          {children}
          </main>
        </Provider>

      </body>
    </html>
  )
}
