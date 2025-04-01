
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

// Data para el gráfico
const data = [
  { name: "Transporte", value: 35, color: "#10B981" },
  { name: "Electricidad", value: 25, color: "#3B82F6" },
  { name: "Dieta", value: 20, color: "#6366F1" },
  { name: "Residuos", value: 15, color: "#F59E0B" },
  { name: "Otros", value: 5, color: "#8B5CF6" },
];

// Renderizado personalizado para las etiquetas
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return percent > 0.05 ? (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

// Componente personalizado para el tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-lg">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-xs text-gray-600">{`${payload[0].value}% del total`}</p>
      </div>
    );
  }
  return null;
};

// Componente personalizado para la leyenda
const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            style={{ backgroundColor: entry.color }}
            className="w-3 h-3 rounded-full"
          />
          <span className="text-xs">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export function ScopeBreakdown() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Emisiones por categoría</CardTitle>
        <CardDescription>
          Distribución de la huella de carbono por fuente de emisión
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
