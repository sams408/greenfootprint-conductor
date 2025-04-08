
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RecommendationsCard } from "@/components/dashboard/recommendations";
import { EmissionForm } from "@/components/dashboard/emission-form";
import { useLanguage } from "@/hooks/useLanguage";

export function DetailTab() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('detailedEmissionsBreakdown')}</CardTitle>
            <CardDescription>{t('yearToDateData')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('scope')}</TableHead>
                  <TableHead>{t('emissions')} (tCO2e)</TableHead>
                  <TableHead className="text-right">{t('yearlyChange')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t('naturalGas')}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>42.3</TableCell>
                  <TableCell className="text-right text-green-600">-3.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('companyVehicles')}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>45.0</TableCell>
                  <TableCell className="text-right text-red-600">+1.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('purchasedElectricity')}</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>115.9</TableCell>
                  <TableCell className="text-right text-green-600">-7.4%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('businessTravel')}</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>62.7</TableCell>
                  <TableCell className="text-right text-green-600">-4.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('employeeCommuting')}</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>58.7</TableCell>
                  <TableCell className="text-right text-red-600">+5.4%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecommendationsCard />
        <EmissionForm />
      </div>
    </>
  );
}
