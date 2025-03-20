'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Protocol = {
  title: string
  duration: string
  frequency: string
  temperature: string
  tips: string[]
}

const protocols: Record<string, Protocol> = {
  recovery: {
    title: "Athletic Recovery Protocol",
    duration: "2-5 minutes",
    frequency: "After intense workouts (wait 6-8 hours if building muscle)",
    temperature: "10-15°C (50-59°F)",
    tips: [
      "Use for recovery during competition periods",
      "Avoid immediately after strength training if hypertrophy is the goal",
      "Focus on immersing the trained muscle groups",
      "Combine with active recovery on rest days"
    ]
  },
  mental: {
    title: "Mental Health Protocol",
    duration: "1-3 minutes",
    frequency: "3-4 times per week",
    temperature: "10-15°C (50-59°F)",
    tips: [
      "Morning exposure is ideal for mood enhancement",
      "Practice controlled breathing during exposure",
      "Focus on the sensation as a mindfulness practice",
      "Gradually increase duration as tolerance builds"
    ]
  },
  metabolism: {
    title: "Metabolic Health Protocol",
    duration: "2-5 minutes",
    frequency: "Daily or every other day",
    temperature: "10-15°C (50-59°F)",
    tips: [
      "Allow natural rewarming after exposure (Søeberg Principle)",
      "Morning exposure may be most effective for metabolic benefits",
      "Combine with healthy diet and exercise for best results",
      "Shivering is beneficial for metabolic activation"
    ]
  }
}

export function ProtocolBuilder() {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null)
  
  const handleSelectProtocol = (protocol: string) => {
    setSelectedProtocol(protocol)
  }
  
  return (
    <div className="bg-[#AFA98D]/20 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-[#182825] mb-3">Interactive Protocol Builder</h3>
      <p className="mb-4">Select your primary goal to get a customized cold water exposure protocol:</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Button 
          className={`${selectedProtocol === 'recovery' ? 'bg-[#016FB9]/80' : 'bg-[#016FB9]'} hover:bg-[#016FB9]/90`}
          onClick={() => handleSelectProtocol('recovery')}
        >
          Recovery
        </Button>
        <Button 
          className={`${selectedProtocol === 'mental' ? 'bg-[#016FB9]/80' : 'bg-[#016FB9]'} hover:bg-[#016FB9]/90`}
          onClick={() => handleSelectProtocol('mental')}
        >
          Mental Health
        </Button>
        <Button 
          className={`${selectedProtocol === 'metabolism' ? 'bg-[#016FB9]/80' : 'bg-[#016FB9]'} hover:bg-[#016FB9]/90`}
          onClick={() => handleSelectProtocol('metabolism')}
        >
          Metabolism
        </Button>
      </div>
      
      <div className="p-4 bg-white rounded-lg">
        {selectedProtocol ? (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#182825]">{protocols[selectedProtocol].title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#6D8EA0]/10 p-3 rounded">
                <p className="font-medium text-[#016FB9]">Duration</p>
                <p>{protocols[selectedProtocol].duration}</p>
              </div>
              <div className="bg-[#6D8EA0]/10 p-3 rounded">
                <p className="font-medium text-[#016FB9]">Frequency</p>
                <p>{protocols[selectedProtocol].frequency}</p>
              </div>
              <div className="bg-[#6D8EA0]/10 p-3 rounded">
                <p className="font-medium text-[#016FB9]">Temperature</p>
                <p>{protocols[selectedProtocol].temperature}</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-[#016FB9] mb-2">Tips:</p>
              <ul className="list-disc pl-5 space-y-1">
                {protocols[selectedProtocol].tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4 p-3 bg-[#22AED1]/10 rounded border-l-4 border-[#22AED1]">
              <p className="text-sm">
                <strong>Remember:</strong> Always consult with a healthcare professional before starting any new health practice, especially if you have pre-existing health conditions.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-[#6D8EA0]">Select a goal to see your personalized protocol</p>
        )}
      </div>
    </div>
  )
}
