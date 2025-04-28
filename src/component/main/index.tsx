import Banner from '@/component/banner';
import TypingEffect from '@/component/typingEffect';
import RollingNumbers from '@/component/rollingNumbers';
import GridIon from "@/component/gridIon";

export default function Main() {

  return (
    <main className="w-full">
      <Banner />
      <TypingEffect />
      <RollingNumbers />
      <GridIon />
    </main>
  )
}
