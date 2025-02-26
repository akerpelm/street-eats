import { getPayload } from 'payload';
import config from '@/payload.config';
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { VendorGallery } from '@/components/vendors/VendorGallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VendorRatings } from '@/components/vendors/VendorRatings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { ReviewCard } from '@/components/vendors/ReviewCard';
import { aggregateVendorRatings } from '@/lib/ratingUtils';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  // Fetch vendor with ratings
  const {
    docs: [vendor],
  } = await payload.find({
    collection: 'vendors',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  });

  // Fetch all ratings for this vendor
  const { docs: ratings } = await payload.find({
    collection: 'ratings',
    where: {
      vendor: {
        equals: vendor.id,
      },
    },
    depth: 1,
  });

  if (!vendor) return notFound();

  const aggregatedRatings = aggregateVendorRatings(ratings);

  const additionalImages = [
    {
      url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
      alt: 'Placeholder Image 1',
    },
    {
      url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Placeholder Image 2',
    },
    {
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Placeholder Image 3',
    },
    {
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Placeholder Image 4',
    },
    {
      url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Placeholder Image 5',
    },
    {
      url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Placeholder Image 6',
    },
  ];

  const contactMethods = [
    ...(vendor.contact?.phone
      ? [
          {
            icon: <Phone className="h-4 w-4" />,
            label: 'Phone',
            value: vendor.contact.phone,
            href: `tel:${vendor.contact.phone}`,
          },
        ]
      : []),
    ...(vendor.contact?.email
      ? [
          {
            icon: <Mail className="h-4 w-4" />,
            label: 'Email',
            value: vendor.contact.email,
            href: `mailto:${vendor.contact.email}`,
          },
        ]
      : []),
    ...(vendor.socialMedia?.instagram
      ? [
          {
            icon: <Instagram className="h-4 w-4" />,
            label: 'Instagram',
            value: '@' + vendor.socialMedia.instagram.split('/').pop(),
            href: vendor.socialMedia.instagram,
          },
        ]
      : []),
    ...(vendor.socialMedia?.facebook
      ? [
          {
            icon: <Facebook className="h-4 w-4" />,
            label: 'Facebook',
            value: vendor.socialMedia.facebook.split('/').pop(),
            href: vendor.socialMedia.facebook,
          },
        ]
      : []),
    ...(vendor.socialMedia?.twitter
      ? [
          {
            icon: <Twitter className="h-4 w-4" />,
            label: 'Twitter',
            value: '@' + vendor.socialMedia.twitter.split('/').pop(),
            href: vendor.socialMedia.twitter,
          },
        ]
      : []),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 bg-background">
      {/* Mobile Business Info */}
      <div className="lg:hidden mb-4">
        <h1 className="text-2xl font-bold mb-1 text-foreground">
          {vendor.name}
        </h1>
        <p className="text-muted-foreground text-sm">{vendor.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-start">
        {/* Gallery Column */}
        <div className="w-full lg:w-1/3 lg:flex-shrink-0 mb-4 lg:mb-0 order-2 lg:order-1">
          {vendor.image && (
            <div className="space-y-2">
              <Suspense
                fallback={
                  <div className="space-y-1">
                    <Skeleton className="w-full aspect-[4/3]" />
                    <div className="grid grid-cols-3 gap-1">
                      <Skeleton className="aspect-square" />
                      <Skeleton className="aspect-square" />
                      <Skeleton className="aspect-square" />
                    </div>
                  </div>
                }
              >
                <VendorGallery
                  images={[
                    { url: vendor.image.url, alt: vendor.image.alt },
                    ...additionalImages,
                  ]}
                />
              </Suspense>

              {/* Contact Methods Grid */}
              {contactMethods.length > 0 && (
                <div className="grid grid-cols-2 gap-1">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={
                        method.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        method.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-accent text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {method.icon}
                      <span className="truncate">{method.value}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Business Info Card */}
        <div className="flex-grow order-1 lg:order-2">
          <Card className="overflow-hidden p-0 pb-2">
            <CardHeader className="pb-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground hidden lg:block leading-none mb-1">
                  {vendor.name}
                </h1>
                <p className="text-muted-foreground hidden lg:block text-sm">
                  {vendor.description}
                </p>
                <CardTitle className="text-base mt-1">
                  Business Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {/* Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Locations Section */}
                {vendor.addresses && vendor.addresses.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      Locations
                    </h3>
                    <div className="space-y-0.5">
                      {vendor.addresses.map((address, index) => (
                        <div key={index} className="text-xs pl-3 pb-1">
                          <div className="flex items-center gap-1">
                            <p>{address.street}</p>
                            {address.primary && (
                              <span className="text-[10px] bg-primary px-1 rounded-full leading-none py-0.5">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground leading-snug">
                            {address.city}
                            {address.borough && `, ${address.borough}`}
                            {address.state && `, ${address.state}`}
                            {address.zip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hours Section */}
                {vendor.hours && (
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3" />
                      Hours
                    </h3>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs pl-3">
                      {Object.entries(vendor.hours).map(([day, hours]) => (
                        <div key={day} className="contents">
                          <span className="capitalize text-muted-foreground">
                            {day}
                          </span>
                          <span>
                            {hours?.start} - {hours?.end}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ratings Section */}
              <div className="mt-3 pt-3 border-t">
                <VendorRatings placeholder />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mt-4">
        <Tabs defaultValue="menu">
          <TabsList className="justify-start self-center">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({aggregatedRatings.totalReviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {vendor.menuItems?.map((item: any) => (
                <Card key={item.id} className="overflow-hidden p-0">
                  {item.image && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={item.image.url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="px-3">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-muted-foreground text-sm mb-1">
                      {item.description}
                    </p>
                    <p className="font-medium">${item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div>
              {ratings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ratings.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No reviews yet. Be the first to review this vendor!
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
