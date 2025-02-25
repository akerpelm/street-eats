'use client';

import * as React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface GalleryImage {
  url: string;
  alt: string;
}

interface VendorGalleryProps {
  images: GalleryImage[];
}

function GalleryModal({
  images,
  isOpen,
  onClose,
  initialSlide = 0,
}: {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialSlide: number;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[1400px]">
        <DialogTitle className="sr-only">Image Gallery</DialogTitle>
        <Carousel
          className="w-full"
          opts={{ loop: true, startIndex: initialSlide }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image.url}>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-contain rounded-lg"
                    priority={index === 0}
                    sizes="95vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}

export function VendorGallery({ images }: VendorGalleryProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  if (!images?.length) return null;

  const mainImage = images[0];
  const previewImages = images.slice(1, 4);
  const remainingCount = Math.max(0, images.length - 4);

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {/* Main Image - Full width */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => {
            setSelectedIndex(0);
            setIsOpen(true);
          }}
          className="relative aspect-[4/3] col-span-4 rounded-lg overflow-hidden cursor-pointer"
        >
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 66vw, 100vw"
            priority
          />
        </motion.div>

        {/* Preview Images - Smaller and in a row */}
        {previewImages.map((image, idx) => (
          <motion.div
            key={image.url}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setSelectedIndex(idx + 1); // +1 because these are preview images
              setIsOpen(true);
            }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 16vw, 25vw"
            />
          </motion.div>
        ))}

        {/* Show More Button - Same size as previews */}
        {remainingCount > 0 && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setSelectedIndex(0); // Reset to first image when showing all
              setIsOpen(true);
            }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-muted"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs font-medium">+{remainingCount}</span>
            </div>
          </motion.div>
        )}
      </div>

      <GalleryModal
        images={images}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialSlide={selectedIndex}
      />
    </>
  );
}
