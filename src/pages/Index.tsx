
import { Button } from "@/components/ui/button";
import { ChevronRight, CloudSun, FileText, BarChart3, Leaf, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-eco-primary to-eco-dark py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex flex-col space-y-4 text-center lg:text-left lg:w-1/2">
              <div className="inline-block px-3 py-1 mb-2 text-sm rounded-full bg-white/10 backdrop-blur text-eco-light border border-white/20 w-fit mx-auto lg:mx-0">
                ISO 14067:2018 y GHG Protocol
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                Calcula y reduce tu huella de carbono empresarial
              </h1>
              <p className="text-eco-light/90 md:text-xl">
                GreenFlow te ayuda a medir, gestionar y reducir las emisiones de gases de efecto invernadero de tu organización de forma sencilla y conforme a estándares internacionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Acceder al Dashboard <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  Saber más
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative animate-pulse-slow">
                <div className="absolute inset-0 bg-eco-accent/30 rounded-full blur-3xl"></div>
                <CloudSun className="h-64 w-64 text-white mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gestiona toda tu huella de carbono</h2>
            <p className="text-muted-foreground md:text-lg max-w-3xl mx-auto">
              GreenFlow te permite medir y gestionar los tres alcances de emisiones según los estándares internacionales ISO 14064 y Greenhouse Gas Protocol.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Alcance 1: Emisiones Directas",
                description: "Calcula las emisiones directas de fuentes controladas por tu organización, como combustibles fósiles en edificios y vehículos de flota.",
                icon: Leaf,
              },
              {
                title: "Alcance 2: Emisiones Indirectas",
                description: "Mide las emisiones indirectas asociadas con la electricidad, calefacción, refrigeración y vapor compradas y consumidas.",
                icon: BarChart3,
              },
              {
                title: "Alcance 3: Otras Indirectas",
                description: "Gestiona todas las demás emisiones indirectas, como viajes de negocios, transporte de empleados y cadena de suministro.",
                icon: FileText,
              },
              {
                title: "Multiempresa y multiusuario",
                description: "Gestiona múltiples cuentas empresariales con distintos usuarios y permisos dentro de una misma plataforma.",
                icon: Users,
              },
              {
                title: "Informes y cumplimiento",
                description: "Genera informes que cumplen con los estándares internacionales y regulaciones locales para la presentación de informes.",
                icon: Award,
              },
              {
                title: "Recomendaciones inteligentes",
                description: "Recibe sugerencias personalizadas para reducir tu huella de carbono basadas en tus datos específicos.",
                icon: CloudSun,
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col p-6 space-y-4 eco-card">
                <div className="eco-icon w-fit">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <div className="eco-card flex flex-col md:flex-row gap-8 p-8 items-center text-center md:text-left">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Listo para comenzar a medir tu impacto ambiental?
              </h2>
              <p className="text-muted-foreground mb-6">
                Accede al dashboard de GreenFlow y comienza a gestionar tu huella de carbono de forma conforme a los estándares internacionales.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Button size="lg" asChild>
                <Link to="/dashboard">Ir al Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-eco-primary" />
              <span className="text-xl font-bold">GreenFlow</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2023 GreenFlow. Todos los derechos reservados. Conforme con ISO 14067:2018.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
