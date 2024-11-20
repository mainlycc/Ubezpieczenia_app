'use client'

import { useState } from 'react'
import { Check, Menu, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ResultCards } from '@/components/ui/ResultCards'

export default function Home() {
  const [step, setStep] = useState('form')
  const [formData, setFormData] = useState({
    vehicleType: 'DEFEND Gap MAX',
    vehicleValue: '',
    insurancePeriod: '12',
    insuranceLimit: 50000
  })
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [calculatedRate, setCalculatedRate] = useState(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, insuranceLimit: value[0] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    const requestData = {
      value: Number(formData.vehicleValue),
      period: Number(formData.insurancePeriod),
      limit: Number(formData.insuranceLimit)
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/calculate-rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Błąd podczas komunikacji z serwerem')
      }

      const data = await response.json()
      setCalculatedRate(data.rate)
      setStep('results')
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error)
      setError(error instanceof Error ? error.message : 'Wystąpił błąd podczas obliczania składki')
    }
  }

  const calculatePrice = (basePrice: number) => {
    if (calculatedRate) {
      return calculatedRate
    }
    return 0
  }

  return (
    <div className="bg-[#4169E1] min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          {step === 'form' ? (
            <div className="max-w-md mx-auto bg-white rounded-lg p-8">
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              <h1 className="text-2xl font-bold mb-6">Kalkulator Ubezpieczeniowy</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Typ pojazdu</Label>
                  <Tabs defaultValue="DEFEND Gap MAX" onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleType: value }))}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="DEFEND Gap MAX">MAX</TabsTrigger>
                      <TabsTrigger value="DEFEND Gap LCV MAX">LCV MAX</TabsTrigger>
                      <TabsTrigger value="DEFEND Gap TRUCK MAX">TRUCK MAX</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleValue">Wartość pojazdu (PLN)</Label>
                  <Input
                    id="vehicleValue"
                    name="vehicleValue"
                    type="number"
                    placeholder="Wprowadź wartość pojazdu"
                    value={formData.vehicleValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Okres ubezpieczenia (miesiące)</Label>
                  <RadioGroup
                    defaultValue="12"
                    onValueChange={(value) => setFormData(prev => ({ ...prev, insurancePeriod: value }))}
                    className="flex justify-between"
                  >
                    {[12, 24, 36, 48, 60].map((month) => (
                      <div key={month} className="flex items-center space-x-2">
                        <RadioGroupItem value={month.toString()} id={`month-${month}`} />
                        <Label htmlFor={`month-${month}`}>{month}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Limit szkody (PLN)</Label>
                  <Slider
                    defaultValue={[50000]}
                    max={250000}
                    step={50000}
                    onValueChange={handleSliderChange}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    {[50000, 100000, 150000, 200000, 250000].map((value) => (
                      <span key={value}>{value}</span>
                    ))}
                  </div>
                  <p className="text-center mt-2">Wybrano: {formData.insuranceLimit} PLN</p>
                </div>

                <Button type="submit" className="w-full">Oblicz składkę</Button>
              </form>
            </div>
          ) : (
            <ResultCards 
              calculatedRate={calculatedRate}
              formData={formData}
              onBack={() => setStep('form')}
            />
          )}
        </div>
      </main>
    </div>
  )
}