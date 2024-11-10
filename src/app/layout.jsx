import "./globals.css";
import {montserrat} from './fonts/fonts'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}