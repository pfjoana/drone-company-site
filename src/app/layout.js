import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LoadingProvider } from "./components/LoadingProvider";

export const metadata = {
  title: "All Perspectives - Serviços Profissionais de Drone",
  description: "Inspeções, imobiliário e eventos. Serviços profissionais de captação aérea com drone.",
  icons: {
    icon: '/favicon.svg',
  }
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
