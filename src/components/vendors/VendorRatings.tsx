'use client';

import { Star, ThumbsUp, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface VendorRatingsProps {
  // This will be replaced with real data later
  placeholder?: boolean;
}

export function VendorRatings({ placeholder }: VendorRatingsProps) {
  // Placeholder data
  const ratings = {
    average: 4.7,
    total: 124,
    recommended: 96,
    popularity: 89,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <Star className="w-4 h-4 text-yellow-500" />
          <div>
            <div className="text-lg font-semibold">{ratings.average}</div>
            <div className="text-xs text-muted-foreground">
              {ratings.total} ratings
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <ThumbsUp className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-lg font-semibold">{ratings.recommended}%</div>
            <div className="text-xs text-muted-foreground">would recommend</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <Users className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-lg font-semibold">{ratings.popularity}%</div>
            <div className="text-xs text-muted-foreground">popularity</div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 sm:col-span-1">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Food</span>
              <span className="font-medium">4.8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service</span>
              <span className="font-medium">4.6</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Value</span>
              <span className="font-medium">4.5</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
