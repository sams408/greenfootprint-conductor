
import { RecommendationItem } from './RecommendationItem';
import { Recommendation } from './types';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  return (
    <>
      {recommendations.map((recommendation) => (
        <RecommendationItem key={recommendation.id} recommendation={recommendation} />
      ))}
    </>
  );
}
