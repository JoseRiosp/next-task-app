import '../styles/globals.css'
import {montserrat} from './fonts/fonts'
import Copyright from './../ui/components/Copyright'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen' >
        <main className={`${montserrat.className} flex-grow`}>
          {children}
        </main>
        <footer className='p-4'>
          <Copyright/>
        </footer>
      </body>
    </html>
  );
}