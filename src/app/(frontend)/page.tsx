import React from 'react'
import { Button } from "@/components/ui/button"
import { VendorSections } from '@/components/vendors/VendorSection'

export default function HomePage() {
  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="relative">
        <section className="relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0" />
          <div className="relative z-20 text-center text-foreground">
            <h1 className="text-5xl font-bold mb-4">Street Eats NYC</h1>
            <p className="text-xl mb-8">Discover the best street food vendors in New York City</p>
            <Button size="lg">Find Food Near Me</Button>
          </div>
        </section>
      </div>

      {/* Vendors Sections */}
      <section className="py-16">
        <VendorSections />
      </section>
    </div>
  )
}
