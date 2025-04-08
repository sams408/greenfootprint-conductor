
import { useLanguage } from '@/hooks/useLanguage';

interface RecommendationStepsProps {
  steps: string[];
}

export function RecommendationSteps({ steps }: RecommendationStepsProps) {
  const { language } = useLanguage();
  
  return (
    <div className="mt-3 pl-7">
      <h5 className="text-sm font-medium mb-2">
        {language === 'en' ? 'Implementation Steps:' : 'Pasos de implementación:'}
      </h5>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {steps.map((step, index) => (
          <li key={index} className="flex items-baseline gap-2">
            <span className="text-xs font-semibold">{index + 1}.</span> 
            <span>{step.substring(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
