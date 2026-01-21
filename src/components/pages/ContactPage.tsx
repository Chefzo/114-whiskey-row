import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  useEffect(() => {
    // Google Tag Manager noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-WMRZT82N';
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent',
      description: "We'll get back to you soon. See you at the bar.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-foreground mb-6">
              Get In <span className="text-neon-red-orange">Touch</span>
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-foreground/80 max-w-3xl">
              Questions? Events? Just want to say what's up? Drop us a line.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-black/40 border border-neon-red-orange/20 rounded p-8 sm:p-12">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background border-neon-red-orange/30 text-foreground focus:border-neon-red-orange"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background border-neon-red-orange/30 text-foreground focus:border-neon-red-orange"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Phone <span className="text-foreground/50">(optional)</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background border-neon-red-orange/30 text-foreground focus:border-neon-red-orange"
                      placeholder="(502) 555-0114"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-background border-neon-red-orange/30 text-foreground focus:border-neon-red-orange resize-none"
                      placeholder="What's on your mind?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-8 py-6 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Social Media */}
              <div className="bg-black/40 border border-neon-red-orange/20 rounded p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Follow the Energy
                </h3>
                <p className="font-paragraph text-sm text-foreground/70 mb-6">
                  See what's happening tonight. DJs, crowds, and neon lights.
                </p>
                
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/onefourteenwhiskeyrow/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-neon-red-orange/10 to-transparent border border-neon-red-orange/30 rounded hover:border-neon-red-orange/60 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-neon-red-orange/20 flex items-center justify-center group-hover:bg-neon-red-orange transition-colors">
                      <Instagram size={24} className="text-neon-red-orange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-paragraph text-sm font-medium text-foreground">Instagram</p>
                      <p className="font-paragraph text-xs text-foreground/60">@onefourteenwhiskeyrow</p>
                    </div>
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-neon-red-orange/10 to-transparent border border-neon-red-orange/30 rounded hover:border-neon-red-orange/60 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-neon-red-orange/20 flex items-center justify-center group-hover:bg-neon-red-orange transition-colors">
                      <Facebook size={24} className="text-neon-red-orange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-paragraph text-sm font-medium text-foreground">Facebook</p>
                      <p className="font-paragraph text-xs text-foreground/60">114 Whiskey Row</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="bg-black/40 border border-neon-red-orange/20 rounded p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Direct Contact
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-neon-red-orange flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Email</p>
                      <a
                        href="mailto:info@114whiskeyrow.com"
                        className="font-paragraph text-sm text-foreground hover:text-neon-red-orange transition-colors"
                      >
                        info@114whiskeyrow.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-neon-red-orange flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Phone</p>
                      <a
                        href="tel:+15029071400"
                        className="font-paragraph text-sm text-foreground hover:text-neon-red-orange transition-colors"
                      >
                        (502) 907-1400
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Note */}
              <div className="bg-gradient-to-br from-warm-amber/10 to-neon-red-orange/5 border border-warm-amber/30 rounded p-6">
                <p className="font-paragraph text-sm text-foreground/80">
                  <span className="text-warm-amber font-medium">Pro tip:</span> For the fastest response, hit us up on Instagram. We're always there.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
