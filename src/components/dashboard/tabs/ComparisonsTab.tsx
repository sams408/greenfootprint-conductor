
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/hooks/useLanguage";

export function ComparisonsTab() {
  const { t } = useLanguage();
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('comparisonWithBenchmarks')}</CardTitle>
          <CardDescription>{t('industryAndGlobalComparisons')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('metric')}</TableHead>
                <TableHead>{t('yourEmissions')}</TableHead>
                <TableHead>{t('industryAverage')}</TableHead>
                <TableHead>{t('nationalAverage')}</TableHead>
                <TableHead>{t('globalAverage')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{t('totalEmissions')} (tCO2e)</TableCell>
                <TableCell className="font-medium">324.6</TableCell>
                <TableCell>352.3</TableCell>
                <TableCell>392.1</TableCell>
                <TableCell>405.7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('perEmployeeEmissions')} (tCO2e)</TableCell>
                <TableCell className="font-medium">4.2</TableCell>
                <TableCell>4.8</TableCell>
                <TableCell>5.3</TableCell>
                <TableCell>5.7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('energyIntensity')} (kgCO2e/$1000)</TableCell>
                <TableCell className="font-medium">32.4</TableCell>
                <TableCell>36.1</TableCell>
                <TableCell>41.2</TableCell>
                <TableCell>45.8</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('annualResults')}</CardTitle>
            <CardDescription>{t('yearOverYearComparison')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{t('currentYear')}: 324.6 tCO2e</span>
                  <span className="text-green-600">-8.4% {t('fromPreviousYear')}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "63%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{t('previousYear')}: 354.2 tCO2e</span>
                  <span className="text-green-600">-5.1% {t('fromYearBefore')}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-primary/80 h-full" style={{ width: "68%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>2021: 373.1 tCO2e</span>
                  <span className="text-red-600">+2.3% {t('fromYearBefore')}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-primary/60 h-full" style={{ width: "72%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('accumulatedResults')}</CardTitle>
            <CardDescription>{t('progressTowardsReductionGoals')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('shortTermGoal')}: -15% {t('by')} 2025</span>
                  <span className="text-sm text-green-600">58% {t('complete')}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: "58%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('mediumTermGoal')}: -30% {t('by')} 2030</span>
                  <span className="text-sm text-green-600">29% {t('complete')}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: "29%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('longTermGoal')}: -50% {t('by')} 2040</span>
                  <span className="text-sm text-green-600">17% {t('complete')}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full" style={{ width: "17%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
