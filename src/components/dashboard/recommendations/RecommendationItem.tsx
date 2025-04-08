
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { RecommendationSteps } from './RecommendationSteps';
import { Recommendation } from './types';
import { getImpactStyle, getImpactText } from './utils';

interface RecommendationItemProps {
  recommendation: Recommendation;
}

export function RecommendationItem({ recommendation }: RecommendationItemProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const { icon: Icon } = recommendation;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col rounded-lg border p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 eco-icon">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{recommendation.title}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactStyle(recommendation.impact)}`}>
              {getImpactText(recommendation.impact, language)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpand} 
            className="mt-2 flex items-center gap-1 px-0 text-sm"
          >
            {language === 'en' ? 'Step-by-step guide' : 'Guía paso a paso'}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {isExpanded && <RecommendationSteps steps={recommendation.steps} />}
    </div>
  );
}
