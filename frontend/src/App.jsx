import { Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { usePortfolioData } from "./context/PortfolioDataContext.jsx";
import Nav from "./components/ui/Nav";
import Footer from "./components/sections/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollCompanion from "./components/ui/ScrollCompanion";
import { LoadingScreen, ErrorScreen } from "./components/ui/SiteStatus";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import EducationPage from "./pages/EducationPage";
import ResearchPage from "./pages/ResearchPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import RequireAuth from "./components/admin/RequireAuth";
import AdminLayout from "./components/admin/AdminLayout";
import ResourceListPage from "./components/admin/ResourceListPage";
import ResourceFormPage from "./components/admin/ResourceFormPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminSectionPlaceholder from "./pages/admin/AdminSectionPlaceholder";
import PersonalFormPage from "./pages/admin/PersonalFormPage";
import SocialFormPage from "./pages/admin/SocialFormPage";
import { resourceConfigs } from "./lib/resourceConfigs";
import "./components/ui/nav.css";
import "./components/ui/section.css";
import "./components/ui/reveal.css";
import "./components/ui/cursor.css";
import "./components/ui/scroll-companion.css";

// The public, visitor-facing site — everything that depends on
// PortfolioDataContext lives behind this gate. Admin routes deliberately
// sit outside it (see App below) so a slow/broken public data fetch
// never blocks signing in or managing content.
function PublicSite() {
  useLenis();
  const { loading, error, retry } = usePortfolioData();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={retry} />;

  return (
    <div id="top">
      <ScrollCompanion />
      <Nav />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/admin" element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />

          {/* Personal & Social are singletons (Part 6.5) — no list, no
              delete, just a dedicated GET-then-PUT form each. */}
          <Route path="personal" element={<PersonalFormPage />} />
          <Route path="social" element={<SocialFormPage />} />

          {/* One list + create + edit route per resource, generated
              from resourceConfigs — adding a resource there is all
              that's needed to get a working admin UI for it. */}
          {Object.values(resourceConfigs).map((config) => (
            <Route key={config.resourceKey} path={config.resourceKey}>
              <Route index element={<ResourceListPage config={config} />} />
              <Route path="new" element={<ResourceFormPage config={config} mode="create" />} />
              <Route path=":id/edit" element={<ResourceFormPage config={config} mode="edit" />} />
            </Route>
          ))}

          {/* Anything else unmatched falls back to the placeholder. */}
          <Route path="*" element={<AdminSectionPlaceholder />} />
        </Route>
      </Route>

      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
