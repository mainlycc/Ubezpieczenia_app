'use client'

import { useState } from 'react'
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResultCardsProps {
  calculatedRate: number | null;
  formData: {
    vehicleType: string;
    vehicleValue: string;
    insurancePeriod: string;
    insuranceLimit: number;
  };
  onBackAction: () => void;
}

export function ResultCards({ calculatedRate, formData, onBackAction }: ResultCardsProps) {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const calculatePrice = (basePrice: number) => {
    const value = parseInt(formData.vehicleValue)
    const multiplier = formData.vehicleType === 'MAX' ? 1 : formData.vehicleType === 'LCV MAX' ? 1.2 : 1.5
    const periodMultiplier = parseInt(formData.insurancePeriod) / 12
    return Math.round(basePrice * multiplier * periodMultiplier * (value / 10000))
  }

  return (
    <>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Przejrzyste opcje ubezpieczenia
        </h1>
        <p className="text-xl text-white/90">
          Wybierz najlepszy dla siebie plan
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <Tabs defaultValue="monthly" className="bg-white rounded-lg p-1">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="monthly" onClick={() => setBillingCycle("monthly")}>
              Miesięcznie
            </TabsTrigger>
            <TabsTrigger value="annually" onClick={() => setBillingCycle("annually")}>
              Rocznie <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5">15% ZNIŻKI</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="relative bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>
              <div className="text-2xl font-bold">Podstawowy GAP</div>
              <div className="text-4xl font-bold mt-2">
                {billingCycle === "monthly" ? `${calculatePrice(50)} zł` : `${calculatePrice(510)} zł`}
                <span className="text-base font-normal text-gray-600">{billingCycle === "monthly" ? "/mies" : "/rok"}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Podstawowa ochrona GAP</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Assistance w Polsce</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Holowanie do 100 km</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>NNW kierowcy</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-black hover:bg-gray-800">
              Wybieram plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative bg-white border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
            NAJPOPULARNIEJSZY
          </div>
          <CardHeader>
            <CardTitle>
              <div className="text-2xl font-bold">{formData.vehicleType}</div>
              <div className="text-4xl font-bold mt-2">
                {billingCycle === "monthly" ? `${calculatePrice(50)} zł` : `${calculatePrice(510)} zł`}
                <span className="text-base font-normal text-gray-600">{billingCycle === "monthly" ? "/mies" : "/rok"}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Wszystko z planu Podstawowego</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Rozszerzony pakiet Assistance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Auto zastępcze do 14 dni</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>NNW dla kierowcy i pasażerów</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-black hover:bg-gray-800">
              Wybieram plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>
              <div className="text-2xl font-bold">Szczegóły polisy</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Wszystko z planu Standard</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Premium Assistance 24/7</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Ochrona prawna</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Ubezpieczenie bagażu</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Gwarancja niezmienności składki</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-black hover:bg-gray-800">
              Wybieram plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}