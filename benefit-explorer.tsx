'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

type BenefitCategory = {
  title: string
  description: string
  evidence: 'strong' | 'moderate' | 'limited'
  sources: string[]
}

const benefits: BenefitCategory[] = [
  {
    title: "Cardiovascular Health",
    description: "Improves circulation, may benefit blood pressure, and provides a form of 'vascular exercise' through vasoconstriction and vasodilation.",
    evidence: "moderate",
    sources: ["UCLA Health", "PubMed Central"]
  },
  {
    title: "Metabolic Effects",
    description: "Activates brown adipose tissue, increases calorie burn, and may improve metabolism through thermogenesis and shivering.",
    evidence: "moderate",
    sources: ["Huberman Lab", "PubMed Central", "Mayo Clinic"]
  },
  {
    title: "Immune Function",
    description: "May stimulate leukocytes and potentially reduce sick days, though the exact mechanism remains unclear.",
    evidence: "limited",
    sources: ["UCLA Health", "Healthline", "Mayo Clinic"]
  },
  {
    title: "Inflammation Reduction",
    description: "Helps reduce inflammation and prevent delayed-onset muscle soreness after exercise through vasoconstriction and vasodilation.",
    evidence: "strong",
    sources: ["UCLA Health", "Huberman Lab", "Healthline"]
  },
  {
    title: "Pain Relief",
    description: "Provides analgesic effects by reducing inflammation, interfering with pain perception, and slowing nerve signaling.",
    evidence: "strong",
    sources: ["UCLA Health", "Mayo Clinic"]
  },
  {
    title: "Mood Enhancement",
    description: "Causes prolonged dopamine release, elevating mood, enhancing focus, and increasing energy levels.",
    evidence: "moderate",
    sources: ["Huberman Lab", "Stanford Longevity"]
  },
  {
    title: "Stress Reduction",
    description: "Decreases cortisol levels after exposure, potentially creating a more resilient physiological state over time.",
    evidence: "moderate",
    sources: ["Stanford Longevity", "Healthline"]
  },
  {
    title: "Mental Resilience",
    description: "Builds psychological resilience by training the prefrontal cortex to exert control during challenging situations.",
    evidence: "moderate",
    sources: ["Huberman Lab"]
  },
  {
    title: "Cognitive Function",
    description: "Increases alertness and energy through the release of epinephrine and norepinephrine in the brain.",
    evidence: "moderate",
    sources: ["Huberman Lab"]
  },
  {
    title: "Depression & Anxiety Relief",
    description: "May help alleviate symptoms of depression and anxiety, though more research is needed.",
    evidence: "limited",
    sources: ["UCLA Health", "Stanford Longevity"]
  },
  {
    title: "Insulin Sensitivity",
    description: "May reduce insulin resistance and improve insulin sensitivity, potentially protecting against metabolic conditions.",
    evidence: "limited",
    sources: ["PubMed Central"]
  },
  {
    title: "Disease Prevention",
    description: "Potential protective effects against cardiovascular disease and diabetes through combined benefits.",
    evidence: "limited",
    sources: ["PubMed Central"]
  }
]

export function BenefitExplorer() {
  const [filter, setFilter] = useState<'all' | 'strong' | 'moderate' | 'limited'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredBenefits = benefits.filter(benefit => {
    const matchesFilter = filter === 'all' || benefit.evidence === filter
    const matchesSearch = benefit.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         benefit.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })
  
  const getEvidenceBadgeColor = (evidence: string) => {
    switch(evidence) {
      case 'strong': return 'bg-green-100 text-green-800 border-green-300'
      case 'moderate': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'limited': return 'bg-amber-100 text-amber-800 border-amber-300'
      default: return ''
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search benefits..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 rounded-md text-center ${filter === 'all' ? 'bg-[#182825] text-white' : 'bg-gray-100'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-center ${filter === 'strong' ? 'bg-green-600 text-white' : 'bg-green-100'}`}
            onClick={() => setFilter('strong')}
          >
            Strong
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-center ${filter === 'moderate' ? 'bg-blue-600 text-white' : 'bg-blue-100'}`}
            onClick={() => setFilter('moderate')}
          >
            Moderate
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-center ${filter === 'limited' ? 'bg-amber-600 text-white' : 'bg-amber-100'}`}
            onClick={() => setFilter('limited')}
          >
            Limited
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBenefits.length > 0 ? (
          filteredBenefits.map((benefit, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#016FB9]">{benefit.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getEvidenceBadgeColor(benefit.evidence)}`}>
                    {benefit.evidence.charAt(0).toUpperCase() + benefit.evidence.slice(1)} evidence
                  </span>
                </div>
                <p className="mb-3 text-sm">{benefit.description}</p>
                <div className="mt-auto">
                  <p className="text-xs text-[#6D8EA0]">Sources: {benefit.sources.join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-[#6D8EA0]">No benefits match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
