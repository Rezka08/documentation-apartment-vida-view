import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "beranda", label: "Beranda" },
    { id: "unit", label: "Unit" },
    { id: "fasilitas", label: "Fasilitas" },
    { id: "lokasi", label: "Lokasi" },
    { id: "tentang", label: "Tentang" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="cursor-pointer flex items-center gap-2"
            onClick={() => onNavigate("beranda")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg"></div>
            <span className="text-purple-600">Vida View</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`hover:text-purple-600 transition-colors ${
                  currentPage === item.id ? "text-purple-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => onNavigate("login")}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Masuk
            </Button>
            <Button 
              onClick={() => onNavigate("register")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Daftar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-purple-50 ${
                  currentPage === item.id ? "text-purple-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 py-2 space-y-2">
              <Button 
                onClick={() => {
                  onNavigate("login");
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Masuk
              </Button>
              <Button 
                onClick={() => {
                  onNavigate("register");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Daftar
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
