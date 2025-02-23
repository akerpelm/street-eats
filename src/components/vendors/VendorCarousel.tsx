"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import { VendorCard } from "./VendorCard"
import { Vendor } from "@/payload-types"

interface VendorCarouselProps {
  title: string
  vendors: Vendor[]
  itemsPerPage?: number
}

export function VendorCarousel({ 
  title, 
  vendors, 
  itemsPerPage = 3 
}: VendorCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(vendors.length / itemsPerPage)
  const hasNextPage = currentPage < totalPages - 1
  const hasPrevPage = currentPage > 0

  const handleNext = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const currentVendors = vendors.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {totalPages > 1 && (
          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={handlePrev}
              disabled={!hasPrevPage}
              className="hidden sm:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              onClick={handleNext}
              disabled={!hasNextPage}
              className="hidden sm:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div 
        ref={scrollContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {currentVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {/* Mobile Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 sm:hidden text-foreground">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={!hasPrevPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={!hasNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}