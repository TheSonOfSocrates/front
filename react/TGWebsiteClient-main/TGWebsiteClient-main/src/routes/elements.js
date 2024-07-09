import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// MAIN
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const FaqsPage = Loadable(lazy(() => import('../pages/FaqsPage')));
export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
export const Contact = Loadable(lazy(() => import('../pages/ContactPage')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
export const ServicePage = Loadable(lazy(() => import('../pages/ServicePage')));
export const PrivacyPage = Loadable(lazy(() => import('../pages/PrivacyPage')));
export const SpecialPage = Loadable(lazy(() => import('../pages/SpecialPage')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const PricePage = Loadable(lazy(() => import('../pages/PricePage')));
export const CareerPage = Loadable(lazy(() => import('../pages/CareerPage')));
export const CareerPage2 = Loadable(lazy(() => import('../pages/CareerPage2')));
export const AdminDashboardPage = Loadable(lazy(() => import('../pages/admin/AdminDashboardPage')));