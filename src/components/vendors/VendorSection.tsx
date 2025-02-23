import { getPayload } from 'payload'
import config from '@/payload.config'
import { VendorCarousel } from './VendorCarousel'
import { Suspense } from 'react'
import { Skeleton } from '../ui/skeleton'

const SectionLoading = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-[200px]" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[200px]" />
      ))}
    </div>
  </div>
)

async function VendorsByCuisine({ cuisine }: { cuisine: string }) {
  const payload = await getPayload({config})
  
  const { docs } = await payload.find({
    collection: 'vendors',
    where: {
      cuisine: {
        equals: cuisine,
      },
    },
    depth: 2,
    limit: 6,
  })

  if (!docs.length) return null

  return (
    <VendorCarousel 
      title={`${cuisine} Food`}
      vendors={docs}
    />
  )
}

async function PopularVendors() {
  const payload = await getPayload({config})
  
  const { docs } = await payload.find({
    collection: 'vendors',
    depth: 2,
    limit: 6,
    sort: '-createdAt',
  })

  return (
    <VendorCarousel 
      title="Popular Vendors"
      vendors={docs}
    />
  )
}

export const cuisineTypes = [
  'Mexican',
  'Asian',
  'Middle Eastern',
  'American',
  'Mediterranean',
  'Italian',
  'Indian',
  'Caribbean',
  'Greek',
] as const

export function VendorSections() {
  return (
    <div className="space-y-12">
      <Suspense fallback={<SectionLoading />}>
        <PopularVendors />
      </Suspense>

      {cuisineTypes.map((cuisine) => (
        <Suspense key={cuisine} fallback={<SectionLoading />}>
          <VendorsByCuisine cuisine={cuisine} />
        </Suspense>
      ))}
    </div>
  )
}
