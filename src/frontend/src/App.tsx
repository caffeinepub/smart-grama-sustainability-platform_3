import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReportIssuePage from './pages/ReportIssuePage';
import TreePlantationPage from './pages/TreePlantationPage';
import WaterHarvestingPage from './pages/WaterHarvestingPage';
import SolarSchemePage from './pages/SolarSchemePage';
import MyRequestsPage from './pages/MyRequestsPage';
import SchemesPage from './pages/SchemesPage';
import SchemeDetailPage from './pages/SchemeDetailPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import DashboardPage from './pages/admin/DashboardPage';
import ComplaintsManagementPage from './pages/admin/ComplaintsManagementPage';
import TreeManagementPage from './pages/admin/TreeManagementPage';
import WaterProjectsManagementPage from './pages/admin/WaterProjectsManagementPage';
import SolarManagementPage from './pages/admin/SolarManagementPage';
import ProtectedRoute from './components/ProtectedRoute';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const reportIssueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/report-issue',
  component: ReportIssuePage,
});

const treeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tree',
  component: TreePlantationPage,
});

const waterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/water',
  component: WaterHarvestingPage,
});

const solarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solar',
  component: SolarSchemePage,
});

const myRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-requests',
  component: MyRequestsPage,
});

const schemesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/schemes',
  component: SchemesPage,
});

const schemeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/schemes/$schemeId',
  component: SchemeDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <ProtectedRoute requireAdmin>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const adminComplaintsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/complaints',
  component: () => (
    <ProtectedRoute requireAdmin>
      <ComplaintsManagementPage />
    </ProtectedRoute>
  ),
});

const adminTreesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/trees',
  component: () => (
    <ProtectedRoute requireAdmin>
      <TreeManagementPage />
    </ProtectedRoute>
  ),
});

const adminWaterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/water',
  component: () => (
    <ProtectedRoute requireAdmin>
      <WaterProjectsManagementPage />
    </ProtectedRoute>
  ),
});

const adminSolarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/solar',
  component: () => (
    <ProtectedRoute requireAdmin>
      <SolarManagementPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  reportIssueRoute,
  treeRoute,
  waterRoute,
  solarRoute,
  myRequestsRoute,
  schemesRoute,
  schemeDetailRoute,
  aboutRoute,
  privacyRoute,
  termsRoute,
  adminDashboardRoute,
  adminComplaintsRoute,
  adminTreesRoute,
  adminWaterRoute,
  adminSolarRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
