import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VendorGallery } from '@/components/vendors/VendorGallery'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const { docs } = await payload.find({
    collection: 'vendors',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  }).catch(() => ({ docs: [] }))

  const vendor = docs[0]
  if (!vendor) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Mobile Business Info - Shows above gallery on mobile */}
      <div className="lg:hidden mb-8">
        <h1 className="text-2xl font-bold mb-4 text-foreground">{vendor.name}</h1>
        <p className="text-muted-foreground mb-6">{vendor.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left Column - Gallery */}
        <div className="w-full lg:w-1/3 lg:flex-shrink-0 mb-8 lg:mb-0">
          {vendor.image && (
            <div className="lg:sticky lg:top-24">
              <VendorGallery
                mainImage={{
                  url: vendor.image.url || '',
                  alt: vendor.name
                }}
              />
            </div>
          )}
        </div>

        {/* Right Column - Info */}
        <div className="flex-grow">
          {/* Desktop Business Info - Hidden on mobile */}
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold mb-4 text-foreground">{vendor.name}</h1>
            <p className="text-muted-foreground mb-6">{vendor.description}</p>
          </div>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              {vendor.contact?.phone && <p>Phone: {vendor.contact.phone}</p>}
              {vendor.contact?.email && <p>Email: {vendor.contact.email}</p>}
            </CardContent>  
          </Card>

          {/* Hours */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              {vendor.hours && Object.entries(vendor.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between py-1">
                  <span className="capitalize">{day}</span>
                  <span>{hours?.start} - {hours?.end}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Menu Section */}
      <Tabs defaultValue="menu" className="mt-12">
        <TabsList>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendor.menuItems?.map((item: any) => (
              <Card key={item.id}>
                {item.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="font-bold">${item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardContent className="pt-6">
              {vendor.addresses?.map((address: any, index: number) => (
                <div key={index} className="mb-4">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zip}</p>
                  {address.borough && <p>Borough: {address.borough}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
