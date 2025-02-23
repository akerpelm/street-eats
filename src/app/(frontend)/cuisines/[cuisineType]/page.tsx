import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { VendorsSimpleGrid } from '@/components/vendors/VendorsSimpleGrid'
import { VendorCarousel } from '@/components/vendors/VendorCarousel'
import { cuisineTypes } from '@/components/vendors/VendorSection'
import { Separator } from '@/components/ui/separator'

interface Props {
  params: {
    cuisineType: string
  }
}

export async function generateStaticParams() {
  return cuisineTypes.map((cuisine) => ({
    cuisineType: cuisine.toLowerCase(),
  }))
}

export default async function CuisinePage({ params }: Props) {
  const { cuisineType } = params
  const formattedCuisine = cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1)

  // Validate cuisine type
  if (!cuisineTypes.map(c => c.toLowerCase()).includes(cuisineType)) {
    return notFound()
  }

  const payload = await getPayload({ config })
  
  const { docs: vendors } = await payload.find({
    collection: 'vendors',
    where: {
      cuisine: {
        equals: formattedCuisine,
      },
    },
    depth: 2,
  })

  // TODO: Replace these with actual filtered/sorted data once we have metrics
  const popularVendors = vendors.slice(0, Math.min(6, vendors.length))
  const bestValueVendors = vendors.slice(0, Math.min(6, vendors.length))
  const topRatedVendors = vendors.slice(0, Math.min(6, vendors.length))

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {formattedCuisine} Food Vendors
        </h1>
        <p className="text-muted-foreground">
          Discover the best {formattedCuisine.toLowerCase()} street food vendors in NYC
        </p>
      </div>

      {/* Featured Sections */}
      <div className="space-y-12 mb-16">
        {popularVendors.length > 0 && (
          <VendorCarousel 
            title={`Popular ${formattedCuisine} Vendors`}
            vendors={popularVendors}
          />
        )}
        
        {bestValueVendors.length > 0 && (
          <VendorCarousel 
            title={`Best Value ${formattedCuisine}`}
            vendors={bestValueVendors}
          />
        )}
        
        {topRatedVendors.length > 0 && (
          <VendorCarousel 
            title={`Top Rated ${formattedCuisine}`}
            vendors={topRatedVendors}
          />
        )}
      </div>

      <Separator className="my-8" />

      {/* All Vendors Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">All {formattedCuisine} Vendors</h2>
        {vendors.length > 0 ? (
          <VendorsSimpleGrid vendors={vendors} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No {formattedCuisine.toLowerCase()} vendors found at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
