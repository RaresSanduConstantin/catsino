import Container from "@/components/Container";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <div>
   {children}
    </div>
  );
}
