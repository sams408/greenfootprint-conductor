
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { RecommendationsList } from './RecommendationsList';
import { useRecommendations } from './useRecommendations';

export function RecommendationsCard() {
  const { language } = useLanguage();
  const { recommendations } = useRecommendations();
  
  return (
    <Card className="eco-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-eco-primary" />
            {language === 'en' ? 'Recommendations' : 'Recomendaciones'}
          </CardTitle>
          <CardDescription>
            {language === 'en' ? 'Suggested improvements based on your emissions' : 'Mejoras sugeridas según tus emisiones'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RecommendationsList recommendations={recommendations} />
      </CardContent>
    </Card>
  );
}
