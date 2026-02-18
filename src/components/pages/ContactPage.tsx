import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Facebook, Mail, Phone, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
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

    // Add JSON-LD schema markup for LocalBusiness
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'One Fourteen Bar',
      'description': 'Late-night bar on Whiskey Row in downtown Louisville, Kentucky. Open Tuesday–Sunday, 4pm–2am. Walk-ins only. 21+.',
      'url': 'https://onefourteen.bar',
      'telephone': '+15029071400',
      'email': 'info@114whiskeyrow.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '114 W Main Street',
        'addressLocality': 'Louisville',
        'addressRegion': 'KY',
        'postalCode': '40202',
        'addressCountry': 'US'
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '16:00',
          'closes': '02:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Monday',
          'opens': '00:00',
          'closes': '00:00'
        }
      ],
      'sameAs': [
        'https://www.instagram.com/onefourteenwhiskeyrow/',
        'https://facebook.com'
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields.');
      }

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      toast({
        title: 'Message Sent',
        description: "We'll get back to you soon. See you at the bar.",
      });

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (submitError) setSubmitError(null);
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
              Contact One Fourteen | Louisville Bar
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-foreground/70 max-w-3xl">
              Questions about events, reservations, or just want to say what's up? Reach out to One Fourteen on Whiskey Row.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO Intro Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-background border-b border-neon-red-orange/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 max-w-3xl leading-relaxed">
              Contact <a href="/" className="text-neon-red-orange hover:underline">One Fourteen, a late-night bar on Whiskey Row</a> in downtown Louisville, Kentucky. Located at 114 W Main Street, we're open Tuesday–Sunday from 4pm–2am. Walk-ins only. 21+. Call us at (502) 907-1400 or email info@114whiskeyrow.com for inquiries about private events, group bookings, or general questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hours & Location Info Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-background border-b border-neon-red-orange/10">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-4"
            >
              <Clock className="text-neon-red-orange flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Hours</h3>
                <div className="font-paragraph text-sm text-foreground/70 space-y-1">
                  <p>Tuesday–Sunday: 4pm–2am</p>
                  <p>Monday: Closed</p>
                  <p className="text-warm-amber mt-2">Walk-ins only • 21+</p>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-4"
            >
              <MapPin className="text-neon-red-orange flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Location</h3>
                <div className="font-paragraph text-sm text-foreground/70 space-y-1">
                  <p>114 W Main Street</p>
                  <p>Louisville, KY 40202</p>
                  <a 
                    href="https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neon-red-orange hover:underline mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
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
              <div className="bg-black/40 border border-neon-red-orange/20 rounded-lg p-8 sm:p-12">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Send a Message
                </h2>
                <p className="font-paragraph text-sm text-foreground/60 mb-8">
                  We'll get back to you as soon as possible.
                </p>

                {/* Error State */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded flex items-start gap-3"
                    role="alert"
                  >
                    <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                    <p className="font-paragraph text-sm text-destructive">{submitError}</p>
                  </motion.div>
                )}

                {/* Success State */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded flex items-start gap-3"
                    role="status"
                  >
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <p className="font-paragraph text-sm text-green-500">Message sent successfully!</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Name <span className="text-neon-red-orange">*</span>
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
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Email <span className="text-neon-red-orange">*</span>
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
                      aria-required="true"
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
                    <label htmlFor="subject" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Subject <span className="text-foreground/50">(optional)</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-background border-neon-red-orange/30 text-foreground focus:border-neon-red-orange"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-paragraph text-sm text-foreground/80 mb-2">
                      Message <span className="text-neon-red-orange">*</span>
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
                      aria-required="true"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-8 py-6 rounded transition-all hover:bg-neon-red-orange/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : submitSuccess ? (
                      <>
                        <CheckCircle size={18} className="mr-2" />
                        Message Sent
                      </>
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
              {/* Direct Contact */}
              <div className="bg-black/40 border border-neon-red-orange/20 rounded-lg p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Direct Contact
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="text-neon-red-orange flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Phone</p>
                      <a
                        href="tel:+15029071400"
                        className="font-paragraph text-base text-foreground hover:text-neon-red-orange transition-colors"
                      >
                        (502) 907-1400
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail size={20} className="text-neon-red-orange flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-1">Email</p>
                      <a
                        href="mailto:info@114whiskeyrow.com"
                        className="font-paragraph text-base text-foreground hover:text-neon-red-orange transition-colors break-all"
                      >
                        info@114whiskeyrow.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-black/40 border border-neon-red-orange/20 rounded-lg p-8">
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
                    aria-label="Follow One Fourteen on Instagram"
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
                    aria-label="Follow One Fourteen on Facebook"
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

              {/* Pro Tip */}
              <div className="bg-gradient-to-br from-warm-amber/10 to-neon-red-orange/5 border border-warm-amber/30 rounded-lg p-6">
                <p className="font-paragraph text-sm text-foreground/80">
                  <span className="text-warm-amber font-medium">Pro tip:</span> For the fastest response, hit us up on Instagram. We're always there.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 bg-background border-t border-neon-red-orange/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-foreground/5 border border-foreground/10 rounded-lg p-6 sm:p-8 md:p-12 text-center"
          >
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4">
              Ready to experience One Fourteen?
            </h3>
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join us for late nights on Whiskey Row. Walk-ins only. 21+. Open Tuesday–Sunday, 4pm–2am.
            </p>
            
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto"
                onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
              >
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Get Directions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/30 text-foreground hover:bg-foreground/10 font-paragraph text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto"
                onClick={() => window.location.href = '/menu'}
              >
                <Clock className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                View Menu
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
