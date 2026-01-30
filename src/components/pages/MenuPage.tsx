import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Image
              src="https://static.wixstatic.com/media/528274_baaf48c63a384a3185ae067e1f14a43d~mv2.jpg"
              width={800}
              originWidth={1024}
              originHeight={1536} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
