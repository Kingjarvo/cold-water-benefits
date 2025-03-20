'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function SafetyChecker() {
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState({
    heartCondition: false,
    highBloodPressure: false,
    raynauds: false,
    coldUrticaria: false,
    pregnant: false,
    recentInjury: false
  })
  
  const [result, setResult] = useState({
    safe: true,
    warnings: [] as string[]
  })
  
  useEffect(() => {
    const warnings = []
    let safe = true
    
    if (answers.heartCondition) {
      warnings.push("Heart conditions may increase risks during cold exposure. Consult your doctor before proceeding.")
      safe = false
    }
    
    if (answers.highBloodPressure) {
      warnings.push("High blood pressure may be affected by cold exposure. Medical clearance is recommended.")
      safe = false
    }
    
    if (answers.raynauds) {
      warnings.push("Raynaud's syndrome can be aggravated by cold exposure. Consider milder forms or consult your doctor.")
      safe = false
    }
    
    if (answers.coldUrticaria) {
      warnings.push("Cold urticaria (hives) is a direct contraindication for cold water exposure.")
      safe = false
    }
    
    if (answers.pregnant) {
      warnings.push("Pregnancy: Consult with your healthcare provider before cold water exposure.")
      safe = false
    }
    
    if (answers.recentInjury) {
      warnings.push("Recent injury: While cold may help with inflammation, consult a healthcare provider for guidance.")
    }
    
    setResult({ safe, warnings })
  }, [answers])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setAnswers(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }
  
  const resetForm = () => {
    setAnswers({
      heartCondition: false,
      highBloodPressure: false,
      raynauds: false,
      coldUrticaria: false,
      pregnant: false,
      recentInjury: false
    })
    setShowResults(false)
  }
  
  return (
    <div className="bg-[#6D8EA0]/10 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-[#182825] mb-3">Safety Checker</h3>
      <p className="mb-4">Check if cold water exposure is appropriate for your health situation:</p>
      
      {!showResults ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {[
              { id: 'heartCondition', label: 'Do you have any heart conditions?' },
              { id: 'highBloodPressure', label: 'Do you have high blood pressure?' },
              { id: 'raynauds', label: 'Do you have Raynaud\'s syndrome?' },
              { id: 'coldUrticaria', label: 'Do you have cold urticaria (hives from cold)?' },
              { id: 'pregnant', label: 'Are you pregnant?' },
              { id: 'recentInjury', label: 'Do you have a recent injury?' }
            ].map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.id}
                  checked={answers[item.id as keyof typeof answers]}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#016FB9] focus:ring-[#016FB9]"
                />
                <label htmlFor={item.id} className="ml-2 block text-sm text-gray-700">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          
          <Button type="submit" className="bg-[#016FB9] hover:bg-[#016FB9]/90">
            Check Safety
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <Card className={result.safe ? "border-green-500" : "border-amber-500"}>
            <CardContent className="p-4">
              <h4 className={`text-lg font-medium ${result.safe ? "text-green-700" : "text-amber-700"} mb-2`}>
                {result.safe 
                  ? "Cold water exposure appears suitable for you" 
                  : "Caution advised with cold water exposure"}
              </h4>
              
              {result.warnings.length > 0 ? (
                <div className="space-y-2">
                  <p className="font-medium">Please consider these warnings:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="text-sm">{warning}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Based on your responses, you don't have any common contraindications for cold water exposure.</p>
              )}
              
              <div className="mt-4 p-3 bg-[#22AED1]/10 rounded border-l-4 border-[#22AED1]">
                <p className="text-sm">
                  <strong>Important:</strong> This is not medical advice. Always consult with a healthcare professional before starting cold water exposure, especially if you have any health concerns.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Button onClick={resetForm} className="bg-[#182825] hover:bg-[#182825]/90">
            Start Over
          </Button>
        </div>
      )}
    </div>
  )
}
