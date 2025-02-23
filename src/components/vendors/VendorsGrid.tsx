import { Card } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { isOpenNow, isClosingSoon } from "@/lib/timeUtils";
import { VendorCarousel } from "./VendorCarousel";

export interface Vendor {
  id: number;
  name: string;
  slug: string;
  cuisine: string;
  addresses?: Array<{
    street?: string;
    city?: string;
    borough?: string;
  }>;
  image?: {
    url: string;
  };
  hours?: {
    monday?: { start: string; end: string };
    tuesday?: { start: string; end: string };
    wednesday?: { start: string; end: string };
    thursday?: { start: string; end: string };
    friday?: { start: string; end: string };
    saturday?: { start: string; end: string };
    sunday?: { start: string; end: string };
  };
}

export function VendorsGrid({ vendors }: { vendors: Vendor[] }) {
  // Group vendors by cuisine
  const vendorsByCuisine = vendors.reduce((acc, vendor) => {
    const cuisine = vendor.cuisine
    if (!acc[cuisine]) {
      acc[cuisine] = []
    }
    acc[cuisine].push(vendor)
    return acc
  }, {} as Record<string, Vendor[]>)

  return (
    <div className="space-y-12 w-full px-4 sm:px-6 lg:px-8">
      {/* Popular Section (showing all vendors for now) */}
      <VendorCarousel 
        title="Popular Vendors" 
        vendors={vendors}
      />

      {/* Cuisine Sections */}
      {Object.entries(vendorsByCuisine).map(([cuisine, cuisineVendors]) => (
        <VendorCarousel
          key={cuisine}
          title={`${cuisine} Vendors`}
          vendors={cuisineVendors}
        />
      ))}
    </div>
  )
}