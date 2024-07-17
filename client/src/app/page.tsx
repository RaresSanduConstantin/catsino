import Container from "@/components/Container";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import Image from "next/image";

export default function Home() {
  const Hero = dynamic(() => import('@/components/Hero'), {
    loading: () => <Loading />,
    ssr: true,
  });

  const HomePageGames = dynamic(() => import('@/components/HomePageGames'), {
    loading: () => <Loading />,
    ssr: true,
  });

  return (
    <Container>
      <Hero />
      <HomePageGames />
    </Container>
  );
}
