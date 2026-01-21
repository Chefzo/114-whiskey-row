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
      <section className="relative w-full bg-gradient-to-br from-background via-background to-primary/10 pt-32 pb-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-foreground mb-6">
              The Speakeasy Chronicles
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 leading-relaxed">
              Dive into the world of craft cocktails, mixology secrets, and the rich history of speakeasy culture
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full bg-background/50 border-y border-foreground/10 py-8">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`font-paragraph px-6 py-2 rounded-full transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-paragraph px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph text-sm px-4 py-2 rounded-full">
                                <Tag className="w-4 h-4" />
                                {post.category}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-foreground/60 font-paragraph mb-4">
                          {post.publishDate && (
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </span>
                          )}
                        </div>

                        <h2 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="font-paragraph text-foreground/70 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}

                        {post.author && (
                          <p className="font-paragraph text-sm text-foreground/60 mb-4">
                            By {post.author}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-primary font-paragraph font-medium group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-xl text-foreground/60">
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
