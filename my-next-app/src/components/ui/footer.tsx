// Footer.tsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Produkty</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">GAP</a></li>
              <li><a href="#" className="hover:text-gray-300">Ubezpieczenia komunikacyjne</a></li>
              <li><a href="#" className="hover:text-gray-300">Ubezpieczenia nieruchomości</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Firma</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">O nas</a></li>
              <li><a href="#" className="hover:text-gray-300">Kariera</a></li>
              <li><a href="#" className="hover:text-gray-300">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Pomoc</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-300">Zgłoś szkodę</a></li>
              <li><a href="#" className="hover:text-gray-300">Polityka prywatności</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Śledź nas</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-gray-300">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2024 Ubezpieczenia. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};