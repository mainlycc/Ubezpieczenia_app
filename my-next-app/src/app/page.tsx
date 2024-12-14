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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ResultCards } from '@/components/ui/ResultCards'
import Link from 'next/link'

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

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'vehicleValue') {
      const cleanValue = value.replace(/\s/g, '')
      if (/^\d*$/.test(cleanValue)) {
        setFormData(prev => ({ 
          ...prev, 
          [name]: cleanValue ? formatNumber(parseInt(cleanValue)) : ''
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
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
      const response = await fetch('https://ubezpieczenia-app..onrender.com/api/calculate-rate', {
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
          <div className="flex gap-8">
            {step === 'form' ? (
              <>
                <div className="w-2/5">
                  <div className="bg-white drop-shadow-2xl rounded-3xl p-8">
                    {error && (
                      <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                        {error}
                      </div>
                    )}
                    <Link href="/" className="text-2xl text-center font-bold mb-6 block hover:text-blue-600">
                      Kalkulator Ubezpieczeniowy
                    </Link>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label>Typ pojazdu</Label>
                        <div className="radio-inputs">
                          {[
                            { value: 'DEFEND Gap MAX', label: 'DEFEND Gap MAX' },
                            { value: 'DEFEND Gap LCV MAX', label: 'DEFEND Gap LCV MAX' },
                            { value: 'DEFEND Gap TRUCK MAX', label: 'DEFEND Gap TRUCK MAX' }
                          ].map((option) => (
                            <label key={option.value} className="flex-1">
                              <input
                                type="radio"
                                name="vehicleType"
                                value={option.value}
                                className="radio-input"
                                checked={formData.vehicleType === option.value}
                                onChange={(e) => setFormData(prev => ({ ...prev, vehicleType: e.target.value }))}
                              />
                              <div className="radio-tile">
                                <div className="radio-label">{option.label}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicleValue">Wartość pojazdu (PLN)</Label>
                        <Input
                          id="vehicleValue"
                          name="vehicleValue"
                          type="text"
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
                            <span key={value}>{formatNumber(value)}</span>
                          ))}
                        </div>
                        <p className="text-center mt-2">
                          Wybrano: {formatNumber(formData.insuranceLimit)} PLN
                        </p>
                      </div>

                      <Button type="submit" className="w-full">Oblicz składkę</Button>
                    </form>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="bg-[#4169E1] p-8 rounded-lg h-full">
                    <h2 className="text-4xl font-bold mb-4 text-white">Znajdź idealne ubezpieczenie dla Twojego samochodu w kilka minut. Oszczędzaj czas i pieniądze dzięki naszym spersonalizowanym ofertom.</h2>
                    <p className="text-gray-200">
                      Tutaj możesz umieścić dodatkowe informacje o ubezpieczeniu, warunki, 
                      szczegóły oferty oraz inne istotne informacje dla klienta.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <ResultCards 
                formData={formData}
                calculatedRate={calculatedRate}
                onBackAction={() => setStep('form')}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}