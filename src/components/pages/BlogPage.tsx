import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const sortedPosts = result.items.sort((a, b) => {
        const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
        const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
        return dateB - dateA;
      });
      setPosts(sortedPosts);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(sortedPosts.map(p => p.category).filter(Boolean))) as string[];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-background via-background to-primary/10 pt-24 sm:pt-20 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-6 lg:px-12">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4">
              The Speakeasy Chronicles
            </h1>
            <p className="font-paragraph text-xs sm:text-sm md:text-lg text-foreground/80 leading-relaxed">
              Dive into the world of craft cocktails, mixology secrets, and the rich history of speakeasy culture
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full bg-background/50 border-y border-foreground/10 py-4 sm:py-6 md:py-8 px-3 sm:px-6 lg:px-12">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`font-paragraph text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all ${\n                selectedCategory === 'all'\n                  ? 'bg-primary text-primary-foreground'\n                  : 'bg-foreground/5 text-foreground hover:bg-foreground/10'\n              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-paragraph text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all ${\n                  selectedCategory === category\n                    ? 'bg-primary text-primary-foreground'\n                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10'\n                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-12">
        <div className="max-w-[100rem] mx-auto">
          <div className="min-h-[400px] sm:min-h-[500px]">
            {isLoading ? null : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-foreground/5 rounded-lg overflow-hidden hover:bg-foreground/10 transition-all"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      {post.featuredImage && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={post.featuredImage}
                            alt={post.title || 'Blog post'}
                            width={600}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {post.category && (
                            <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                              <span className="inline-flex items-center gap-1 sm:gap-2 bg-primary text-primary-foreground font-paragraph text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                                <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                                {post.category}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-3 sm:p-4 md:p-6">
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-foreground/60 font-paragraph mb-2 sm:mb-4 flex-wrap">
                          {post.publishDate && (
                            <span className="flex items-center gap-1 sm:gap-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="flex items-center gap-1 sm:gap-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              {post.readTime}
                            </span>
                          )}
                        </div>

                        <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/70 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}

                        {post.author && (
                          <p className="font-paragraph text-xs sm:text-sm text-foreground/60 mb-2 sm:mb-4">
                            By {post.author}
                          </p>
                        )}

                        <div className="flex items-center gap-1 sm:gap-2 text-primary font-paragraph font-medium group-hover:gap-3 transition-all text-xs sm:text-sm">
                          Read More
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 md:py-20">
                <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/60">
                  No blog posts found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
