import { Card } from "@/components/ui/card"
import { isOpenNow, isClosingSoon } from "@/lib/timeUtils"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Pin } from "lucide-react"
import { Vendor } from "@/payload-types"

export function VendorCard({ vendor }: { vendor: Vendor }) {
    const primaryAddress = vendor.addresses?.[0];
    const isOpen = vendor.hours ? isOpenNow(vendor.hours) : false;
    const closing = vendor.hours ? isClosingSoon(vendor.hours) : false;
  
    return (
      <Link href={`/vendors/${vendor.slug}`} className="w-full">
        <Card className="w-full hover:shadow-lg transition-shadow group overflow-hidden pt-0 gap-0 pb-1">
          {/* Image Section */}
          <div className="relative w-full h-[140px]">
            {vendor.image ? (
              <Image
                src={vendor.image.url}
                alt={vendor.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
             <div className="absolute top-2 right-2 z-10">
         {isOpen && !closing && <Badge >Open Now</Badge>}
         {closing && <Badge >Closing Soon</Badge>}
         {!isOpen && !closing && <Badge variant="destructive">Closed</Badge>}
       </div>
          </div>
  
          {/* Content Section */}
          <div className="p-2 space-y-1">
            <div className="flex items-center justify-start gap-1">
              <span className="text-sm font-semibold text-foreground">{vendor.name}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{vendor.cuisine}</span>
            </div>
            
            <div className="flex items-center gap-1">
              {primaryAddress && (
                <span className="text-xs text-muted-foreground">
                  {primaryAddress.city}
                  {primaryAddress.city && primaryAddress.borough && ', '}
                  {primaryAddress.borough}
                </span>
              )}
            </div>
  
            
          </div>
        </Card>
      </Link>
    );
  }
