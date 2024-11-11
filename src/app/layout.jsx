
import {montserrat} from './fonts/fonts'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <main className={montserrat.className}>
          {children}
        </main>
      </body>
    </html>
  );
}