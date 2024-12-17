'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function WyborUbezpieczenia() {
  const options = [
    {
      title: "Basic",
      price: "199",
      features: [
        "Ochrona do 50 000 PLN",
        "Okres ubezpieczenia 12 miesięcy",
        "Podstawowa obsługa klienta",
        "Standardowy czas reakcji"
      ]
    },
    {
      title: "Standard",
      price: "299",
      features: [
        "Ochrona do 100 000 PLN",
        "Okres ubezpieczenia 24 miesiące",
        "Priorytetowa obsługa klienta",
        "Szybki czas reakcji"
      ]
    },
    {
      title: "Premium",
      price: "499",
      features: [
        "Ochrona do 150 000 PLN",
        "Okres ubezpieczenia 36 miesięcy",
        "VIP obsługa klienta 24/7",
        "Natychmiastowa reakcja"
      ]
    }
  ];

  return (
    <div className="bg-[#4169E1] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-white text-center mb-24">
          Wybierz idealne ubezpieczenie dla Twoich potrzeb
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <Card key={index} className="hover:shadow-2xl hover:-translate-y-2 hover:rotate-2 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {option.title}
                </CardTitle>
                <div className="text-4xl font-bold text-center text-black mt-4">
                  {option.price} PLN
                  <span className="text-lg font-normal text-gray-500">/mies.</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/" className="block">
                  <Button className="w-full bg-[#4169E1] text-white hover:bg-blue-700">
                    Wybierz Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}