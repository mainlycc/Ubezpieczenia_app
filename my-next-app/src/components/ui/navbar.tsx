'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#4169E1]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center text-white text-xl font-bold">
              <span className="text-2xl font-bold">Ubezpieczenia</span>
            </Link>
          </div>

          {/* Menu na większe ekrany */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-white text-xl font-bold hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                GAP
              </button>
              <div className="absolute z-10 hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-2">
                <Link href="/gap/samochody" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Samochody osobowe
                </Link>
                <Link href="/gap/dostawcze" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Samochody dostawcze
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white text-xl font-bold hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Ubezpieczenia komunikacyjne
              </button>
              <div className="absolute z-10 hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-2">
                <Link href="/komunikacyjne/oc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  OC
                </Link>
                <Link href="/komunikacyjne/ac" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  AC
                </Link>
                <Link href="/komunikacyjne/assistance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Assistance
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white text-xl font-bold hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Ubezpieczenia nieruchomości
              </button>
              <div className="absolute z-10 hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-2">
                <Link href="/nieruchomosci/dom" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dom
                </Link>
                <Link href="/nieruchomosci/mieszkanie" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mieszkanie
                </Link>
              </div>
            </div>
          </div>

          {/* Przycisk menu mobilnego */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobilne */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/gap" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              GAP
            </Link>
            <Link href="/komunikacyjne" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              Ubezpieczenia komunikacyjne
            </Link>
            <Link href="/nieruchomosci" className="block px-3 py-2 text-base font-medium text-xl hover:text-gray-900 hover:bg-gray-100 rounded-md">
              Ubezpieczenia nieruchomości
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};