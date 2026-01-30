import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function MenuPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-16">
            <h1 className="font-heading text-6xl md:text-7xl font-bold mb-6">
              Our Menu
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 max-w-2xl">
              Discover our carefully curated selection of drinks and bites.
            </p>
          </section>

          {/* Menu Content */}
          <section className="min-h-96">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12">
                {/* Cocktails Section */}
                <div>
                  <h2 className="font-heading text-3xl font-bold mb-8 text-neon-red-orange">
                    Cocktails
                  </h2>
                  <div className="space-y-6">
                    <div className="border-b border-foreground/10 pb-4">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        Classic Margarita
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Tequila, lime juice, triple sec
                      </p>
                      <p className="font-paragraph font-semibold text-warm-amber">$12</p>
                    </div>
                    <div className="border-b border-foreground/10 pb-4">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        Old Fashioned
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Whiskey, bitters, sugar, orange
                      </p>
                      <p className="font-paragraph font-semibold text-warm-amber">$14</p>
                    </div>
                    <div className="border-b border-foreground/10 pb-4">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        Mojito
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Rum, mint, lime, soda water
                      </p>
                      <p className="font-paragraph font-semibold text-warm-amber">$11</p>
                    </div>
                  </div>
                </div>

                {/* Bites Section */}
                <div>
                  <h2 className="font-heading text-3xl font-bold mb-8 text-neon-red-orange">
                    Bites
                  </h2>
                  <div className="space-y-6">
                    <div className="border-b border-foreground/10 pb-4">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        Charcuterie Board
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Selection of cured meats, cheeses, and crackers
                      </p>
                      <p className="font-paragraph font-semibold text-warm-amber">$18</p>
                    </div>
                    <div className="border-b border-foreground/10 pb-4">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        Spiced Nuts
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Roasted almonds and cashews with house spice blend
                      </p>
                      <p className="font-paragraph font-semibold text-warm-amber">$8</p>
                    </div>
                    <div className="border-b border-foreground/10 pb-4">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        Sliders
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Three mini burgers with house sauce
                      </p>
                      <p className="font-paragraph font-semibold text-warm-amber">$15</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
