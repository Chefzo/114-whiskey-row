import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, Clock, Tag, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPosts[]>([]);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const foundPost = result.items.find(p => p.slug === slug);
      setPost(foundPost || null);

      // Load related posts from same category
      if (foundPost?.category) {
        const related = result.items
          .filter(p => p.category === foundPost.category && p._id !== foundPost._id)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[600px]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-6">
            Post Not Found
          </h1>
          <p className="font-paragraph text-foreground/70 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Featured Image */}
      <article className="w-full pt-24">
        {post.featuredImage && (
          <div className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title || 'Blog post'}
              width={1920}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-foreground/10"
          >
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-paragraph mb-6 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-paragraph text-sm px-4 py-2 rounded-full">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-foreground/60 font-paragraph mb-8 pb-8 border-b border-foreground/10">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
              {post.publishDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.publishDate), 'MMMM dd, yyyy')}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="font-paragraph text-xl text-foreground/80 leading-relaxed mb-8 pb-8 border-b border-foreground/10">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            {post.content && (
              <div className="prose prose-lg max-w-none">
                <div className="font-paragraph text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags && (
              <div className="mt-12 pt-8 border-t border-foreground/10">
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="bg-foreground/5 text-foreground/70 font-paragraph text-sm px-4 py-2 rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="w-full py-20 mt-12">
            <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-12 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <motion.article
                    key={relatedPost._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group bg-foreground/5 rounded-lg overflow-hidden hover:bg-foreground/10 transition-all"
                  >
                    <Link to={`/blog/${relatedPost.slug}`} className="block">
                      {relatedPost.featuredImage && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title || 'Related post'}
                            width={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="font-paragraph text-sm text-foreground/70 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
