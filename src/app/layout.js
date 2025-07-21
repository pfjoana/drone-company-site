import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Drone Company - Serviços Profissionais de Drone",
  description: "Inspeções, imobiliário e eventos. Serviços profissionais de captação aérea com drone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className="antialiased bg-black text-white">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
