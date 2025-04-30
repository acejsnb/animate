import BackgroundCmp from '@/component/bg';
import Header from '@/component/header';
import Main from '@/component/main';
import Footer from '@/component/footer';

export default function Home() {
  return (
    <div className="relative flex flex-col w-full min-h-dvh">
      <BackgroundCmp />
      <div className="relative z-1">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
