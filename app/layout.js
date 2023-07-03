import '@styles/global.css'

export const metadata = {
  title: 'Promtpedia',
  description: 'Discover and share AI promts',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
      <div className='main'>
        <div className="" />
      </div>
      <main className="app">

        {children}
      </main>
      
      </body>
    </html>
  )
}
