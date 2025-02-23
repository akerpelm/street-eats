import { Vendor } from "@/payload-types"
import { VendorCard } from "./VendorCard"

interface VendorsSimpleGridProps {
  vendors: Vendor[]
}

export function VendorsSimpleGrid({ vendors }: VendorsSimpleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  )
}
