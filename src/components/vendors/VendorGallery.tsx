"use client"

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useMediaQuery } from "@/hooks/use-media-query"

interface GalleryImage {
  url: string
  alt: string
}

// Temporary test images - replace with actual vendor images later
const testImages: GalleryImage[] = [
  { url: "https://images.unsplash.com/photo-1565299543923-37dd37887442", alt: "Food 1" },
  { url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", alt: "Food 2" },
  { url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828", alt: "Food 3" },
]

interface VendorGalleryProps {
  mainImage: GalleryImage
  additionalImages?: GalleryImage[]
}

export function VendorGallery({ mainImage, additionalImages = testImages }: VendorGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [clickedImage, setClickedImage] = useState<GalleryImage | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const allImages = [mainImage, ...additionalImages]

  const handleImageInteraction = (image: GalleryImage) => {
    if (isMobile) {
      setClickedImage(image)
    }
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-4 gap-2">
        {allImages.map((image, index) => (
          isMobile ? (
            <motion.div
              key={image.url}
              className={cn(
                "relative cursor-pointer rounded-lg overflow-hidden",
                "h-[100px] transition-all duration-300"
              )}
              onClick={() => handleImageInteraction(image)}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <HoverCard key={image.url} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <motion.div
                  className={cn(
                    "relative cursor-pointer rounded-lg overflow-hidden",
                    "h-[100px] transition-all duration-300"
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </HoverCardTrigger>
              <HoverCardContent 
                side="right" 
                align="start" 
                className="w-[300px] h-[300px] p-0"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </HoverCardContent>
            </HoverCard>
          )
        ))}
      </div>

      {/* Mobile Lightbox */}
      <AnimatePresence>
        {isMobile && clickedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setClickedImage(null)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl aspect-video"
            >
              <Image
                src={clickedImage.url}
                alt={clickedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
