
import { LucideIcon } from 'lucide-react';

export interface Recommendation {
  id: number;
  title: string;
  description: string;
  impact: string;
  icon: LucideIcon;
  steps: string[];
}
