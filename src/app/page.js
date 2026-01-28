import HeroSection from "../components/HeroGlorious";
import MemoriesSection from "../components/MemoriesSection";
import LetterSection from "../components/LetterSection";
import MemoryGallerySection from "../components/MemoryGallerySection";
import VideoSection from "../components/VideoSection";
import MusicSection from "../components/MusicSection";
import FinalSection from "../components/FinalSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] overflow-x-hidden">
      <HeroSection />
      <MemoriesSection />
      <LetterSection />
      <MemoryGallerySection />
      <VideoSection />
      <MusicSection />
      <FinalSection />
    </main>
  );
}
