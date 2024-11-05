import "./globals.css";
import { Montserrat } from "next/font/google";
import { Providers } from "@/providers/Providers";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Testimonial Platform",
  description: "Collect and showcase testimonials for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en ">
      <body className={inter.className}>
        <Providers>
          {/* <Navbar /> */}
          <main>{children}</main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
