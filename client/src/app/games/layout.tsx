import Container from "@/components/Container";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <div className="relative h-screen flex  overflow-x-hidden">
   
        <section className="md:mt-28">{children}</section>
   
      
    </div>
  );
}
