'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ProtocolBuilder } from '@/components/protocol-builder'
import { BenefitExplorer } from '@/components/benefit-explorer'
import { SafetyChecker } from '@/components/safety-checker'

export default function Home() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on client-side
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      // Initial check
      checkIfMobile()
      
      // Add event listener for window resize
      window.addEventListener('resize', checkIfMobile)
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#182825] text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl md:text-2xl font-bold">Cold Water Exposure Benefits</h1>
          <nav className="hidden md:flex space-x-2">
            <a 
              href="#introduction" 
              onClick={(e) => { e.preventDefault(); scrollToSection('introduction'); }}
              className="nav-link"
            >
              Introduction
            </a>
            <a 
              href="#physiological" 
              onClick={(e) => { e.preventDefault(); scrollToSection('physiological'); }}
              className="nav-link"
            >
              Physiological
            </a>
            <a 
              href="#mental" 
              onClick={(e) => { e.preventDefault(); scrollToSection('mental'); }}
              className="nav-link"
            >
              Mental Health
            </a>
            <a 
              href="#interactive" 
              onClick={(e) => { e.preventDefault(); scrollToSection('interactive'); }}
              className="nav-link"
            >
              Tools
            </a>
          </nav>
          <Button 
            className="md:hidden bg-[#016FB9]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#182825] border-t border-[#22AED1]/20 mt-2 py-2">
            <div className="container mx-auto px-4">
              <nav className="flex flex-col space-y-2">
                {[
                  { id: 'introduction', label: 'Introduction' },
                  { id: 'physiological', label: 'Physiological Benefits' },
                  { id: 'mental', label: 'Mental Health Benefits' },
                  { id: 'metabolic', label: 'Metabolic Benefits' },
                  { id: 'quality', label: 'Quality of Life' },
                  { id: 'safety', label: 'Safety Considerations' },
                  { id: 'protocols', label: 'Protocols' },
                  { id: 'interactive', label: 'Interactive Tools' }
                ].map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                    className={`block py-2 px-3 rounded ${activeSection === item.id ? 'bg-[#22AED1]/20 text-white' : 'text-gray-300 hover:bg-[#22AED1]/10'}`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto text-center px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">The Documented Benefits of Cold Water Exposure</h1>
          <p className="text-lg md:text-xl mb-8">A comprehensive guide to the science-backed benefits of cold water immersion</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-[#22AED1] hover:bg-[#22AED1]/90 w-full sm:w-auto"
              onClick={() => scrollToSection('introduction')}
            >
              Get Started
            </Button>
            <Button 
              className="bg-transparent border border-white hover:bg-white/10 w-full sm:w-auto mt-2 sm:mt-0"
              onClick={() => scrollToSection('interactive')}
            >
              Interactive Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-[#6D8EA0]/10">
        <div className="container mx-auto py-8 md:py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Sidebar Navigation - Hidden on Mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
                <h3 className="text-lg font-semibold text-[#182825] mb-4">Quick Navigation</h3>
                <ul className="space-y-2">
                  {[
                    { id: 'introduction', label: 'Introduction' },
                    { id: 'physiological', label: 'Physiological Benefits' },
                    { id: 'mental', label: 'Mental Health Benefits' },
                    { id: 'metabolic', label: 'Metabolic Benefits' },
                    { id: 'quality', label: 'Quality of Life' },
                    { id: 'evidence', label: 'Strength of Evidence' },
                    { id: 'safety', label: 'Safety Considerations' },
                    { id: 'protocols', label: 'Recommended Protocols' },
                    { id: 'interactive', label: 'Interactive Tools' }
                  ].map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`} 
                        className={`block p-2 rounded ${activeSection === item.id ? 'bg-[#22AED1]/20 text-[#016FB9]' : 'hover:bg-[#22AED1]/10'}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Introduction Section */}
              <section id="introduction" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#182825]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Introduction</CardTitle>
                    <CardDescription>Understanding cold water exposure and its growing popularity</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <p className="mb-4">
                      Cold water exposure, in various forms ranging from ice baths to cold showers, has gained significant popularity in recent years. What was once primarily used by elite athletes for recovery has now become a widespread wellness practice embraced by many seeking to improve their physical and mental health.
                    </p>
                    <p className="mb-4">
                      Cold water exposure, also known as cold water immersion (CWI) or cryotherapy, involves deliberately exposing the body to cold temperatures through various methods. These include ice baths, cold showers, open water swimming in cold conditions, or specialized cryotherapy chambers. The temperature typically ranges from 7°C to 15°C (45°F to 59°F), though protocols vary widely depending on the specific practice and individual tolerance.
                    </p>
                    <div className="bg-[#6D8EA0]/10 p-4 rounded-lg border-l-4 border-[#016FB9] mt-6">
                      <p className="italic">
                        This guide categorizes the documented benefits of cold water exposure, examines the strength of evidence supporting each benefit, addresses safety considerations, and provides recommended protocols for those interested in incorporating this practice into their wellness routine.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Physiological Benefits Section */}
              <section id="physiological" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#016FB9]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Physiological Benefits</CardTitle>
                    <CardDescription>How cold water exposure affects your body's systems</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <Tabs defaultValue="cardiovascular">
                      <TabsList className="grid grid-cols-5 mb-6 w-full">
                        <TabsTrigger value="cardiovascular" className="text-xs md:text-sm">Cardiovascular</TabsTrigger>
                        <TabsTrigger value="metabolic" className="text-xs md:text-sm">Metabolic</TabsTrigger>
                        <TabsTrigger value="immune" className="text-xs md:text-sm">Immune</TabsTrigger>
                        <TabsTrigger value="inflammation" className="text-xs md:text-sm">Inflammation</TabsTrigger>
                        <TabsTrigger value="pain" className="text-xs md:text-sm">Pain Relief</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="cardiovascular" className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Cardiovascular System</h3>
                        <p className="mb-3">
                          Cold water exposure has been shown to have significant effects on the cardiovascular system. When the body is exposed to cold water, it enters a "survival mode" that stimulates increased blood flow circulation. According to UCLA Health, this increased circulation redistributes blood and delivers freshly oxygenated blood to areas that need to recover, particularly after exercise or injury.
                        </p>
                        <p>
                          Research suggests that over time, regular cold water exposure may make the circulatory system more efficient, potentially benefiting individuals with high blood pressure or diabetes. The process of vasoconstriction (blood vessel narrowing) followed by vasodilation (blood vessel widening) serves as a form of "vascular exercise" that may improve overall cardiovascular function.
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="metabolic" className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Metabolic & Adipose Tissue Effects</h3>
                        <p className="mb-3">
                          One of the most promising areas of cold water exposure research relates to its effects on body fat and metabolism. A comprehensive review published in PubMed Central indicates that cold water immersion has a positive effect on the reduction and/or transformation of body adipose tissue. This is particularly significant regarding brown adipose tissue (BAT), which plays a role in thermogenesis and energy expenditure.
                        </p>
                        <p className="mb-3">
                          When exposed to cold, the body expends energy trying to maintain its core temperature. UCLA Health notes that this may result in a small calorie burn and increased metabolism. The Huberman Lab research highlights that shivering, which often occurs during cold exposure, causes the release of succinate from muscles and further activates brown fat thermogenesis.
                        </p>
                        <p>
                          The Søeberg Principle, named after cold researcher Dr. Susanna Søeberg, suggests that to enhance the metabolic effects of cold, one should allow the body to reheat naturally after exposure rather than using external heat sources.
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="immune" className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Immune System</h3>
                        <p className="mb-3">
                          The relationship between cold water exposure and immune function has shown some promising, though mixed, results. UCLA Health reports that the shock of cold water can stimulate leukocytes (infection-fighting blood cells). A frequently cited study from the Netherlands found that people who took cold showers for 30-90 seconds for 90 days called out sick 29% less than those who didn't, suggesting some immune-enhancing effects.
                        </p>
                        <p>
                          However, as noted by Healthline, there is limited evidence conclusively supporting claims that cold-water immersion directly boosts immunity. Mayo Clinic points out that while the Dutch study showed reduced sick days, researchers didn't track specific markers of immunity, so the physiological mechanism remains unclear. More research is needed to confirm and understand the potential immune benefits.
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="inflammation" className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Inflammation & Recovery</h3>
                        <p className="mb-3">
                          Cold water exposure has long been used to reduce inflammation and aid recovery, particularly in athletic contexts. UCLA Health explains that cold temperatures make blood vessels tighten (vasoconstriction), causing blood to move to the body's core and vital organs where it becomes oxygen and nutrient-rich. When the body warms up, vessels expand (vasodilation), bringing this oxygenated blood back to tissues, which helps flush out inflammation and prevent delayed-onset muscle soreness after exercise.
                        </p>
                        <p className="mb-3">
                          A meta-analysis cited by Huberman Lab found that cold-water immersion can be highly effective for recovery after high-intensity exercise or endurance training. Short interval (less than 5 minutes) cold water immersion demonstrated positive outcomes for muscle power, perceived recovery, and decreased muscle soreness.
                        </p>
                        <div className="bg-[#6D8EA0]/10 p-4 rounded-lg border-l-4 border-[#22AED1] mt-4">
                          <p className="font-medium">Important Note:</p>
                          <p>Both Huberman Lab and Mayo Clinic caution that cold exposure immediately after training may limit gains in hypertrophy, strength, or endurance if done within 4 hours after training. For those focused on building muscle or strength, it may be better to wait 6-8+ hours after training or do cold exposure before training.</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="pain" className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Pain Relief</h3>
                        <p className="mb-3">
                          Cold therapy has well-documented analgesic (pain-relieving) effects. UCLA Health explains that cold therapy alleviates pain through multiple mechanisms: it reduces inflammation, interferes with the brain's perception of pain, decreases how quickly pain sensation travels through nerves, and dulls nerve transmission sent to the brain.
                        </p>
                        <p>
                          Mayo Clinic confirms that icing restricts blood flow, slows nerve signaling, and reduces swelling, making it particularly beneficial for short-term relief after injury or for temporary discomfort such as headaches or tendonitis flare-ups. However, for long-term treatment of injuries, continual icing may delay healing, and heat therapy may be more beneficial as it improves circulation.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </section>

              {/* Mental Health Benefits Section */}
              <section id="mental" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#22AED1]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Mental Health Benefits</CardTitle>
                    <CardDescription>Psychological and cognitive effects of cold water exposure</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Mood Enhancement</h3>
                        <p>
                          Cold water exposure appears to have significant positive effects on mood. According to Huberman Lab, cold exposure causes a prolonged release of dopamine, a neurotransmitter that elevates mood, enhances focus, attention, and goal-directed behavior. Even short bouts of cold exposure can cause lasting increases in dopamine, resulting in sustained elevation of mood, energy, and focus.
                        </p>
                      </div>
                      
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Stress Reduction</h3>
                        <p>
                          Cold water exposure appears to have notable effects on stress regulation, particularly through its impact on cortisol, the body's primary stress hormone. Stanford Longevity reports that while cortisol levels remain relatively unchanged during initial cold water shock, they significantly decrease after CWI sessions. One study showed cortisol levels remained considerably lower for up to three hours after just 15 minutes of CWI (10°C/50°F).
                        </p>
                      </div>
                      
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Stress Resilience</h3>
                        <p>
                          Beyond the direct physiological effects on stress hormones, cold water exposure may build psychological resilience. Huberman Lab explains that forcing yourself to embrace cold stress as a meaningful challenge exerts "top-down control" over deeper brain centers. This process involves the prefrontal cortex (the area involved in planning and suppressing impulsivity) and develops resilience and grit that carries over to real-world stressors.
                        </p>
                      </div>
                      
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Cognitive Function</h3>
                        <p>
                          Cold exposure appears to have acute effects on cognitive function, primarily through its stimulation of the sympathetic nervous system. Huberman Lab notes that deliberate cold exposure causes significant release of epinephrine (adrenaline) and norepinephrine (noradrenaline) in the brain and body. These neurochemicals increase alertness and energy, with levels remaining elevated for some time after exposure.
                        </p>
                      </div>
                      
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Depression & Anxiety</h3>
                        <p>
                          There is emerging evidence that cold water exposure may help alleviate symptoms of depression and anxiety. UCLA Health cites limited but positive research showing benefits for depression, including one clinical study where participants taking daily cold showers for several months reported decreased depression symptoms.
                        </p>
                      </div>
                      
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Sleep Quality</h3>
                        <p>
                          The relationship between cold water exposure and sleep is complex. Healthline reports that some links to better sleep outcomes were found in research, though this data was restricted to male participants, limiting broader application. Huberman Lab cautions that cold exposure ultimately raises body temperature, which can disrupt sleep if done too close to bedtime. For this reason, morning or early day cold exposure is generally recommended rather than evening sessions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Metabolic Health Benefits Section */}
              <section id="metabolic" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#6D8EA0]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Metabolic Health Benefits</CardTitle>
                    <CardDescription>Effects on metabolism and disease prevention</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Insulin Sensitivity</h3>
                        <p>
                          Cold water immersion may have beneficial effects on insulin function. The PubMed review indicates that CWI may reduce insulin resistance and improve insulin sensitivity. This improved insulin function may have a protective effect against cardiovascular disease, obesity, and other metabolic conditions, potentially offering prophylactic health effects.
                        </p>
                        <p className="mt-3 text-sm text-[#6D8EA0]">
                          Note: Much of this research is still emerging, and more long-term studies in diverse populations are needed to fully understand the impact of cold water exposure on insulin sensitivity and metabolic health.
                        </p>
                      </div>
                      
                      <div className="benefit-card">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Disease Prevention</h3>
                        <p>
                          The potential protective effects of cold water exposure against various diseases are an area of growing interest. The PubMed review suggests potential protective effects against cardiovascular disease and diabetes, noting that cold water immersion may have prophylactic effects on health more broadly.
                        </p>
                        <p className="mt-3">
                          These protective effects likely stem from the combined benefits of improved circulation, reduced inflammation, enhanced metabolic function, and stress reduction. However, as with many aspects of cold water therapy, more research is needed to establish definitive causal relationships between regular cold exposure and disease prevention.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Quality of Life Benefits Section */}
              <section id="quality" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#AFA98D]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Quality of Life Benefits</CardTitle>
                    <CardDescription>Overall improvements to wellbeing and lifestyle</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <p className="mb-4">
                      Beyond specific physiological and mental health effects, cold water exposure may contribute to overall quality of life. Healthline reports that people who took 30-, 60- or 90-second cold showers for 30 days reported a slightly higher quality of life, though these effects faded after three months, suggesting the need for ongoing practice.
                    </p>
                    <p>
                      The PubMed review highlights that cold water exposure represents a beneficial intervention not requiring medication or financial costs, making it accessible to many people. The social aspects of cold water swimming groups and the sense of accomplishment from regular practice may also contribute to improved quality of life, though these factors are less studied than the physiological effects.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Strength of Evidence Section */}
              <section id="evidence" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#182825]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Strength of Evidence</CardTitle>
                    <CardDescription>Evaluating the scientific support for cold water exposure benefits</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <p className="mb-6">
                      When evaluating the benefits of cold water exposure, it's important to consider the strength of evidence supporting each claim. Based on the current research, the benefits can be categorized as follows:
                    </p>
                    
                    <Accordion type="single" collapsible className="mb-6">
                      <AccordionItem value="strong">
                        <AccordionTrigger className="text-base md:text-lg font-medium text-[#016FB9]">Strong Evidence</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Acute physiological responses (vasoconstriction, release of stress hormones)</li>
                            <li>Short-term pain relief for acute injuries</li>
                            <li>Temporary reduction in inflammation</li>
                            <li>Post-exercise recovery benefits (when used appropriately)</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="moderate">
                        <AccordionTrigger className="text-base md:text-lg font-medium text-[#016FB9]">Moderate Evidence</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Stress reduction (cortisol decrease after exposure)</li>
                            <li>Mood enhancement</li>
                            <li>Increased alertness and energy</li>
                            <li>Reduced sick days</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="limited">
                        <AccordionTrigger className="text-base md:text-lg font-medium text-[#016FB9]">Limited Evidence</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Long-term metabolic benefits</li>
                            <li>Immune system enhancement</li>
                            <li>Adipose tissue transformation in humans</li>
                            <li>Long-term disease prevention</li>
                            <li>Sustained quality of life improvements</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <p className="text-sm text-[#6D8EA0]">
                      This categorization reflects the current state of research, which includes many small studies, often with limited diversity in participants. As more comprehensive research emerges, our understanding of these benefits may evolve.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Safety Considerations Section */}
              <section id="safety" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#016FB9]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Safety Considerations</CardTitle>
                    <CardDescription>Important precautions and contraindications</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <p className="mb-4">
                      While cold water exposure offers numerous potential benefits, it's important to be aware of safety considerations:
                    </p>
                    
                    <div className="bg-[#6D8EA0]/10 p-4 md:p-6 rounded-lg border-l-4 border-[#016FB9]">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-[#016FB9] font-bold mr-2">•</span>
                          <span>Cold-water immersion could potentially impair muscle protein synthesis and, if used repetitively, could hinder muscle growth (Healthline)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#016FB9] font-bold mr-2">•</span>
                          <span>Cold exposure can be harmful for people with underlying vascular disease like high blood pressure (Healthline)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#016FB9] font-bold mr-2">•</span>
                          <span>Sudden submersion in cold water can trigger a cold shock response causing gasping and hyperventilation, which could be dangerous if underwater (Mayo Clinic)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#016FB9] font-bold mr-2">•</span>
                          <span>Cold shock increases breathing, heart rate, and blood pressure, creating potential risks for people susceptible to cardiac events (Mayo Clinic)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#016FB9] font-bold mr-2">•</span>
                          <span>Prolonged exposure to freezing water can lead to hypothermia (Mayo Clinic)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="mt-6">
                      Individuals with pre-existing health conditions should consult healthcare providers before trying cold water exposure. These conditions include cold urticaria (hives), heart disease, and Raynaud's syndrome, which causes numbness in fingers and toes in response to cold temperatures.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Recommended Protocols Section */}
              <section id="protocols" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#22AED1]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Recommended Protocols</CardTitle>
                    <CardDescription>Expert-recommended approaches to cold water exposure</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <p className="mb-6">
                      Different sources recommend various protocols for cold water exposure, depending on the specific goals:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                      <div className="benefit-card bg-[#182825]/5">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">General Protocol (Huberman Lab)</h3>
                        <ul className="space-y-2">
                          <li><strong>Total Weekly Exposure:</strong> 11 minutes per week total</li>
                          <li><strong>Session Structure:</strong> 2-4 sessions lasting 1-5 minutes each, distributed across the week</li>
                          <li><strong>Temperature:</strong> Uncomfortably cold yet safe to stay in for a few minutes (varies by individual)</li>
                          <li><strong>Timing:</strong> Better in early day rather than close to bedtime</li>
                        </ul>
                      </div>
                      
                      <div className="benefit-card bg-[#182825]/5">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">For Athletic Recovery (Mayo Clinic)</h3>
                        <ul className="space-y-2">
                          <li>Use ice immediately after acute injury, but avoid consistent long-term use that might hinder adaptations</li>
                          <li>For short-term recovery during intense training periods or competitions, cold water immersion can be beneficial</li>
                          <li>Wait 6-8 hours after training if building muscle or strength is the primary goal</li>
                        </ul>
                      </div>
                      
                      <div className="benefit-card bg-[#182825]/5">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">For Mental Health Benefits (Stanford Longevity)</h3>
                        <ul className="space-y-2">
                          <li><strong>For quick mood boost:</strong> Daily cold water face immersions and occasional full-body plunges</li>
                          <li><strong>For long-lasting benefits:</strong> Consistent full-body CWI (lowered cortisol, enhanced mood regulation, increased stress resilience)</li>
                        </ul>
                      </div>
                      
                      <div className="benefit-card bg-[#182825]/5">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">For Beginners (UCLA Health)</h3>
                        <ul className="space-y-2">
                          <li>Keep water below 60 degrees (as cold as home shower can go)</li>
                          <li>Start with 30 seconds and gradually work up to 2-3 minutes</li>
                          <li>Consider contrast showers: 3 minutes hot followed by 1 minute cold, repeated 3 times (always end with cold)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <ProtocolBuilder />
                  </CardContent>
                </Card>
              </section>

              {/* Interactive Tools Section */}
              <section id="interactive" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#22AED1]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Interactive Tools</CardTitle>
                    <CardDescription>Explore benefits and check if cold water exposure is right for you</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <Tabs defaultValue="benefits">
                      <TabsList className="grid grid-cols-2 mb-6">
                        <TabsTrigger value="benefits">Benefit Explorer</TabsTrigger>
                        <TabsTrigger value="safety">Safety Checker</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="benefits" className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Explore Cold Water Exposure Benefits</h3>
                        <p className="mb-4">Filter and search through the documented benefits of cold water exposure based on evidence strength and categories.</p>
                        <BenefitExplorer />
                      </TabsContent>
                      
                      <TabsContent value="safety" className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg md:text-xl font-semibold text-[#016FB9] mb-3">Is Cold Water Exposure Right For You?</h3>
                        <p className="mb-4">Answer a few questions to determine if cold water exposure is appropriate for your health situation.</p>
                        <SafetyChecker />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </section>

              {/* Conclusion Section */}
              <section id="conclusion" className="mb-8 md:mb-12 scroll-mt-20">
                <Card className="border-t-4 border-t-[#AFA98D]">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">Conclusion</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <p className="mb-4">
                      Cold water exposure offers a range of documented benefits spanning physiological, mental, and metabolic health domains. The strongest evidence supports its acute effects on circulation, inflammation reduction, pain relief, and mood enhancement. Moderate evidence suggests benefits for stress reduction, energy levels, and recovery, while emerging research points to potential long-term benefits for metabolic health and disease prevention.
                    </p>
                    <p className="mb-4">
                      As with any wellness practice, individual responses to cold water exposure vary, and what works well for one person may not be ideal for another. The various protocols outlined by experts provide flexible approaches that can be adapted to individual goals, preferences, and health status.
                    </p>
                    <p>
                      While more research is needed to fully understand the long-term effects and optimal protocols for cold water exposure, the current evidence suggests it can be a valuable addition to a comprehensive wellness routine for many healthy individuals. As always, those with pre-existing health conditions should consult healthcare providers before beginning any new health practice, including cold water exposure.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* References Section */}
              <section id="references" className="scroll-mt-20">
                <Card>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl md:text-2xl text-[#182825]">References</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>PubMed Central: "Health effects of voluntary exposure to cold water – a continuing subject of debate" (PMC9518606)</li>
                      <li>UCLA Health: "6 cold shower benefits to consider"</li>
                      <li>Huberman Lab: "The Science & Use of Cold Exposure for Health & Performance"</li>
                      <li>Stanford Longevity: "Jumping into the Ice Bath Trend! Mental Health Benefits of Cold Water Immersion"</li>
                      <li>Healthline: "Health Benefits of Cold Water Therapy May Be Short-Lived, Study Finds"</li>
                      <li>Mayo Clinic Press: "The science behind ice baths for recovery"</li>
                    </ol>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#182825] text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Cold Water Exposure Benefits</h3>
              <p className="text-sm md:text-base">A comprehensive guide to the documented benefits of cold water exposure based on scientific research.</p>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Quick Links</h3>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                <li><a href="#introduction" onClick={(e) => { e.preventDefault(); scrollToSection('introduction'); }} className="hover:text-[#22AED1]">Introduction</a></li>
                <li><a href="#physiological" onClick={(e) => { e.preventDefault(); scrollToSection('physiological'); }} className="hover:text-[#22AED1]">Physiological Benefits</a></li>
                <li><a href="#mental" onClick={(e) => { e.preventDefault(); scrollToSection('mental'); }} className="hover:text-[#22AED1]">Mental Health Benefits</a></li>
                <li><a href="#protocols" onClick={(e) => { e.preventDefault(); scrollToSection('protocols'); }} className="hover:text-[#22AED1]">Recommended Protocols</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Sources</h3>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                <li><a href="#references" onClick={(e) => { e.preventDefault(); scrollToSection('references'); }} className="hover:text-[#22AED1]">PubMed Central</a></li>
                <li><a href="#references" onClick={(e) => { e.preventDefault(); scrollToSection('references'); }} className="hover:text-[#22AED1]">UCLA Health</a></li>
                <li><a href="#references" onClick={(e) => { e.preventDefault(); scrollToSection('references'); }} className="hover:text-[#22AED1]">Huberman Lab</a></li>
                <li><a href="#references" onClick={(e) => { e.preventDefault(); scrollToSection('references'); }} className="hover:text-[#22AED1]">Stanford Longevity</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 md:mt-8 pt-4 md:pt-6 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Cold Water Exposure Benefits. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
