import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import EventsPage from '@/components/pages/EventsPage';
import GalleryPage from '@/components/pages/GalleryPage';
import VisitPage from '@/components/pages/VisitPage';
import ContactPage from '@/components/pages/ContactPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogPostPage from '@/components/pages/BlogPostPage';
import StoryPage from '@/components/pages/StoryPage';
import MenuPage from '@/components/pages/MenuPage';

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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        // Merged into /story — keep this route as a client-side redirect
        // for old bookmarks and anchor links. Server-side 301 is also
        // configured in astro.config.mjs so most traffic never hits here.
        path: "about",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "visit",
        element: <VisitPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogPostPage />,
      },
      {
        path: "story",
        element: <StoryPage />,
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
