import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LoadingProvider } from "./components/LoadingProvider";

export const metadata = {
  metadataBase: new URL('https://www.allperspectives.pt'),
  title: "All Perspectives - Serviços Profissionais de Drone",
  description: "Inspeções técnicas aéreas, monitorização de obras e levantamentos com drone. Soluções profissionais para gestão de infraestruturas.",
  icons: {
    icon: '/favicon.svg',
  },

  openGraph: {
    title: "All Perspectives - Serviços Profissionais de Drone",
    description: "Inspeções técnicas aéreas, monitorização de obras e levantamentos com drone. Soluções profissionais para gestão de infraestruturas.",
    images: [
      {
        url: '/og-image.png',
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className="antialiased bg-white text-black">
        <LoadingProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
