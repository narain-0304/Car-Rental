import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import avatar2 from "../assets/avatar2.webp"
import { useAppContext } from "../AppContext/Context";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];
  
  const nav = useNavigate();
  const { showUserLogin, user, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 px-4 md:px-16 lg:px-24 xl:px-30 flex items-center justify-between ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-3 shadow text-gray-700"
          : "bg-indigo-500 text-white py-5"
      }`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img
          src={logo2}
          alt="logo"
          className={`h-15 w-35 max-h-24 object-contain transition-all duration-300 ${
            isScrolled ? "invert" : ""
          }`}
        />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 font-medium transition`}
          >
            {link.name}
            <div
              className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                isScrolled ? "bg-gray-700" : "bg-white"
              }`}
            />
          </a>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        
        {showUserLogin ? (
          <button
            className="bg-black text-white px-6 py-2 rounded-full ml-2 transition cursor-pointer"
            onClick={() => nav("/login")}
          >
            Login
          </button>
        )
        : (
          <div className="relative group">
            <img src={avatar2} alt="Profile" className="w-10 rounded-full" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-black shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              {/* <li className="p-1.5 pl-3 font-semibold">{user.name}</li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li> */}
              <li onClick={()=>nav('/profile')} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                  My Profile
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <svg
          onClick={() => setIsMenuOpen(true)}
          className={`h-6 w-6 cursor-pointer ${
            isScrolled ? "text-black" : "text-white"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-gray-800 font-medium transform transition-transform duration-500 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <button className="border px-4 py-1 text-sm rounded-full">
          New Launch
        </button>
        <button
          className="bg-black text-white px-6 py-2 rounded-full"
          onClick={() => nav("/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;