import { Navigate, useRoutes } from 'react-router-dom';
// auth
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import CompactLayout from '../layouts/compact';
// config
//
import {
  AboutPage,
  AdminDashboardPage,
  ComingSoonPage,
  Contact,
  Dashboard,
  FaqsPage,
  HomePage,
  LoginPage,
  MaintenancePage,
  NewPasswordPage,
  Page404,
  PricePage,
  CareerPage,
  CareerPage2,
  PrivacyPage,
  RegisterPage,
  ResetPasswordPage,
  ServicePage,
  SpecialPage,
  VerifyCodePage,
} from './elements';
import AdminLayout from '../layouts/admin';
import UserMngPage from '../pages/admin/UserMngPage';
import ProductsPage from '../pages/admin/ProductsPage';
import BlogPage from '../pages/admin/BlogPage';
import RoleBasedGuard from '../auth/RoleBasedGuard';
import AuthGuard from '../auth/AuthGuard';
import ProfileLayout from '../layouts/profile';
import AccountPage from '../pages/profile/AccountPage';
import LicensePage from '../pages/profile/LicensePage';
import NotificationPage from '../pages/profile/NotificationPage';
import SettingsPage from '../pages/profile/SettingsPage';

// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <FaqsPage /> },
        { path: 'service', element: <ServicePage /> },
        { path: 'privacy', element: <PrivacyPage /> },
        { path: 'special', element: <SpecialPage /> },
        { path: 'users', element: <Dashboard /> },
        { path: 'price', element: <PricePage /> },
        { path: 'career-frontend-developer-2032', element: <CareerPage /> },
        { path: 'career-frontend-developer-2033', element: <CareerPage2 /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '404', element: <Page404 /> },
      ],
    },
    {
      path: '/admin',
      element: <RoleBasedGuard hasContent={true} roles={['admin', 'super_admin']}><AdminLayout /></RoleBasedGuard>,
      children: [
        { element: <Navigate to='/admin/dashboard' />, index: true },
        { path: 'dashboard', element: <AdminDashboardPage /> },
        { path: 'user', element: <UserMngPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/profile',
      element: <AuthGuard><ProfileLayout /></AuthGuard>,
      children: [
        { element: <Navigate to='/profile/account' />, index: true },
        { path: 'account', element: <AccountPage /> },
        { path: 'license', element: <LicensePage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'notifications', element: <NotificationPage /> },
      ],
    },
    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}