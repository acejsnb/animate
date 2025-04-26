import Header from '@/component/header';
import Main from '@/component/main';
import Footer from '@/component/footer';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-dvh">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
