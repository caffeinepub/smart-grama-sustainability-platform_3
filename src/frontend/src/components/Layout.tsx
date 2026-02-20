import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileSetupModal from './ProfileSetupModal';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ProfileSetupModal />
    </div>
  );
}
