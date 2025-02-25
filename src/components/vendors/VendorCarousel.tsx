'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { VendorCard } from './VendorCard';
import type { Vendor } from '@/payload-types';

interface VendorCarouselProps {
  title: string;
  vendors: Vendor[];
}

export function VendorCarousel({ title, vendors }: VendorCarouselProps) {
  if (!vendors.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {vendors.map((vendor) => (
            <CarouselItem
              key={vendor.id}
              className="pl-4 basis-1/2 sm:basis-1/2 lg:basis-1/3"
            >
              <VendorCard vendor={vendor} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
