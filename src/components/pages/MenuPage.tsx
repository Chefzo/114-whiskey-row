import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MenuPage() {
  const menuSections = [
    {
      title: 'COCKTAILS',
      alt: 'One Fourteen cocktail menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_56367eb8a6bf4221bf692e19e02842d6~mv2.png?originWidth=768&originHeight=576',
    },
    {
      title: 'FROZEN / BAD IDEAS',
      alt: 'One Fourteen frozen and bad ideas menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_6038e57361b54571ab575030aefa8f94~mv2.png?originWidth=768&originHeight=576',
    },
    {
      title: 'BEER & CANS',
      alt: 'One Fourteen beer and cans menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_3edc546cba1840278265f24759ddad7f~mv2.png?originWidth=768&originHeight=576',
    },
    {
      title: 'NO PROOF',
      alt: 'One Fourteen no proof and house rules menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_b1265fd9581c4378b918f9c4e35f610a~mv2.png?originWidth=768&originHeight=576',
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
