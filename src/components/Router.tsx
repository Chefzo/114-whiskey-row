import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load all page components to prevent circular dependencies
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const EventsPage = lazy(() => import('@/components/pages/EventsPage'));
const GalleryPage = lazy(() => import('@/components/pages/GalleryPage'));
const VisitPage = lazy(() => import('@/components/pages/VisitPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const BlogPage = lazy(() => import('@/components/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/components/pages/BlogPostPage'));
const StoryPage = lazy(() => import('@/components/pages/StoryPage'));
const MenuPage = lazy(() => import('@/components/pages/MenuPage'));
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));

// Fallback component for lazy loading
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense>,
      },
      {
        path: "about",
        element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense>,
      },
      {
        path: "events",
        element: <Suspense fallback={<PageLoader />}><EventsPage /></Suspense>,
      },
      {
        path: "gallery",
        element: <Suspense fallback={<PageLoader />}><GalleryPage /></Suspense>,
      },
      {
        path: "visit",
        element: <Suspense fallback={<PageLoader />}><VisitPage /></Suspense>,
      },
      {
        path: "menu",
        element: <Suspense fallback={<PageLoader />}><MenuPage /></Suspense>,
      },
      {
        path: "contact",
        element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense>,
      },
      {
        path: "blog",
        element: <Suspense fallback={<PageLoader />}><BlogPage /></Suspense>,
      },
      {
        path: "blog/:slug",
        element: <Suspense fallback={<PageLoader />}><BlogPostPage /></Suspense>,
      },
      {
        path: "story",
        element: <Suspense fallback={<PageLoader />}><StoryPage /></Suspense>,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
