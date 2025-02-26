'use client';

import { Star, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Media, Rating } from '@/payload-types';
import { formatDate } from '@/lib/ratingUtils';
import Image from 'next/image';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ReviewCardProps {
  review: Rating;
}

function ImagePreview({
  image,
  caption,
}: {
  image: Media;
  caption?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative h-12 w-32 rounded overflow-hidden flex-shrink-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <Image
          src={image.url}
          alt={caption || 'Review image'}
          fill
          className="object-cover"
        />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {caption || 'Review image preview'}
          </DialogTitle>

          <div className="flex flex-col">
            <div className="relative w-full max-h-[80vh]">
              <Image
                src={image.url}
                alt={caption || 'Review image'}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
              <p className="text-sm text-center text-foreground">
                {caption || 'Food image from review'}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  if (!review.vendorRating) return null;
  const averageRating = (
    (review.vendorRating.foodQuality +
      review.vendorRating.service +
      review.vendorRating.value) /
    3
  ).toFixed(1);

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-2">
        {/* Rating Header */}
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:gap-2">
          {/* Core Rating Info */}
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            {/* Score & Recommendation */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-sm ml-1">
                  {averageRating}
                </span>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-muted/50">
                    {review.vendorRating.recommend ? (
                      <>
                        <ThumbsUp className="h-3 w-3 text-green-500" />
                        <span className="text-[10px] text-muted-foreground">
                          Rec
                        </span>
                      </>
                    ) : (
                      <>
                        <ThumbsDown className="h-3 w-3 text-red-500" />
                        <span className="text-[10px] text-muted-foreground">
                          Not Rec
                        </span>
                      </>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {review.vendorRating.recommend
                    ? 'This customer recommends this vendor'
                    : "This customer doesn't recommend this vendor"}
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Detailed Ratings */}
            <div className="flex gap-2 text-[10px] text-muted-foreground border-l pl-2">
              <div className="flex flex-col items-center leading-none">
                <span className="font-medium mb-0.5">
                  {review.vendorRating.foodQuality}
                </span>
                <span>Food</span>
              </div>
              <div className="flex flex-col items-center leading-none">
                <span className="font-medium mb-0.5">
                  {review.vendorRating.service}
                </span>
                <span>Service</span>
              </div>
              <div className="flex flex-col items-center leading-none">
                <span className="font-medium mb-0.5">
                  {review.vendorRating.value}
                </span>
                <span>Value</span>
              </div>
            </div>

            {/* Date - Right aligned on mobile and desktop */}
            <span className="text-[10px] text-muted-foreground ml-auto">
              {formatDate(review.createdAt)}
            </span>
          </div>

          {/* Tags on new line for mobile, same line for desktop */}
          {review.tags && review.tags.length > 0 && (
            <div className="flex gap-1 sm:border-l sm:pl-2 overflow-x-auto pb-1 sm:pb-0 -mx-2 px-2 sm:mx-0 sm:px-0">
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] sm:text-[10px] bg-muted/50 px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Row */}
        <div className="flex gap-3 mt-2">
          {review.images && review.images.length > 0 && (
            <div className="flex gap-1.5 flex-shrink-0">
              {review.images.map((img, idx) => (
                <ImagePreview
                  key={idx}
                  image={img.image}
                  caption={img.caption}
                />
              ))}
            </div>
          )}
          {review.comment && (
            <p className="text-xs text-foreground/90 leading-snug line-clamp-2">
              {review.comment}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
