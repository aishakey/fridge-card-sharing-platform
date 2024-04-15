import "../styles/globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/SessionProvider";
import { FridgeCardsProvider } from "@/utils/FridgeCardsContext";

export const metadata = {
  title: {
    default: "Fridge",
    template: "%s | Fridge",
  },
  description: "Fridge - Card Sharing Platform",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <AuthProvider session={session}>
        <FridgeCardsProvider>
          <body className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </body>
        </FridgeCardsProvider>
      </AuthProvider>
    </html>
  );
}
