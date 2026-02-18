import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MenuPage() {
  const menuSections = [
    {
      title: 'COCKTAILS',
      alt: 'One Fourteen cocktail menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_640990ba91134702b82fec2797323e66~mv2.png',
    },
    {
      title: 'BEER & CANS',
      alt: 'One Fourteen beer and cans menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_0d9e6a4253104d8fa5c724b23eabc95d~mv2.png',
    },
    {
      title: 'HAPPY HOUR',
      alt: 'One Fourteen happy hour menu – weekdays 4-7 PM',
      image: 'https://static.wixstatic.com/media/528274_37c545ac599e4795b4cc69c70b810a3b~mv2.png',
    },
    {
      title: 'SHOTS & BOILERMAKERS',
      alt: 'One Fourteen shots and boilermakers menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_6218139bf6e2426588a1aba9e9b9b049~mv2.png',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
        {/* Page Title Section */}
        <section className="w-full bg-background py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
              Menu
            </h1>
          </div>
        </section>

        {/* Menu Sections */}
        <section className="w-full bg-background py-8 md:py-12">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="space-y-20 md:space-y-28">
              {menuSections.map((section, index) => (
                <div key={index} className="w-full">
                  {/* Section Header */}
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-12">
                    {section.title}
                  </h2>

                  {/* Menu Image - Full width on mobile, centered on desktop */}
                  <div className="w-full md:flex md:justify-center">
                    <div className="w-full md:max-w-2xl">
                      <Image
                        src={section.image}
                        alt={section.alt}
                        width={800}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
