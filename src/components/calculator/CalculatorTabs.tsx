
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alcance1Form } from "./Alcance1Form";
import { Alcance2Form } from "./Alcance2Form";
import { Alcance3Form } from "./Alcance3Form";
import { useCalculator } from "@/contexts/CalculatorContext";

export const CalculatorTabs = () => {
  const { selectedAlcance, setSelectedAlcance } = useCalculator();

  return (
    <Tabs defaultValue={selectedAlcance} onValueChange={setSelectedAlcance}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="alcance1">Alcance 1</TabsTrigger>
        <TabsTrigger value="alcance2">Alcance 2</TabsTrigger>
        <TabsTrigger value="alcance3">Alcance 3</TabsTrigger>
      </TabsList>
      
      <TabsContent value="alcance1">
        <Alcance1Form />
      </TabsContent>
      
      <TabsContent value="alcance2">
        <Alcance2Form />
      </TabsContent>
      
      <TabsContent value="alcance3">
        <Alcance3Form />
      </TabsContent>
    </Tabs>
  );
};
