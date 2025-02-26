import type { Rating } from '../payload-types';

export interface AggregatedRatings {
  foodQuality: number;
  service: number;
  value: number;
  atmosphere: number;
  recommendationPercentage: number;
  totalReviews: number;
  recentReviews: Rating[];
}

export function aggregateVendorRatings(ratings: Rating[]): AggregatedRatings {
  const vendorRatings = ratings.filter(
    (r) => r.ratingType === 'vendor' && r.vendorRating,
  );

  const initialAgg = {
    foodQuality: 0,
    service: 0,
    value: 0,
    atmosphere: 0,
    recommendations: 0,
    total: vendorRatings.length,
  };

  const sums = vendorRatings.reduce((acc, rating) => {
    if (!rating.vendorRating) return acc;
    return {
      foodQuality: acc.foodQuality + rating.vendorRating.foodQuality,
      service: acc.service + rating.vendorRating.service,
      value: acc.value + rating.vendorRating.value,
      atmosphere: acc.atmosphere + (rating.vendorRating.atmosphere || 0),
      recommendations:
        acc.recommendations + (rating.vendorRating.recommend ? 1 : 0),
      total: acc.total,
    };
  }, initialAgg);

  return {
    foodQuality: Number((sums.foodQuality / sums.total).toFixed(1)),
    service: Number((sums.service / sums.total).toFixed(1)),
    value: Number((sums.value / sums.total).toFixed(1)),
    atmosphere: Number((sums.atmosphere / sums.total).toFixed(1)),
    recommendationPercentage: Number(
      ((sums.recommendations / sums.total) * 100).toFixed(0),
    ),
    totalReviews: sums.total,
    recentReviews: vendorRatings
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5),
  };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
