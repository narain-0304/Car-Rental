import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAppContext } from '../AppContext/Context';

const MainLayout = () => {

  const {isAdmin}=useAppContext();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
