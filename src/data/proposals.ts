export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface Nicho {
  id: string;
  name: string;
  icon: string;
  description: string;
  planes: Plan[];
}

export const nichos: Nicho[] = [
  {
    id: 'hoteles',
    name: 'Hoteles',
    icon: '🏨',
    description: 'Impulsa tu hotel con una presencia digital que convierta visitantes en reservas directas.',
    planes: [
      {
        id: 'basico',
        name: 'Básico',
        price: 1500,
        features: [
          'Diseño web responsive moderno',
          'Sistema de reservas integrado',
          'Galería de habitaciones optimizada',
          'Formulario de contacto',
          'Optimización SEO básica',
          '3 meses de soporte'
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 2800,
        features: [
          'Todo lo incluido en Básico',
          'Motor de reservas avanzado con pagos',
          'Sistema multiidioma (3 idiomas)',
          'Integración con TripAdvisor',
          'Blog de viajes',
          'Panel de administración personalizado',
          '6 meses de soporte'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 4500,
        features: [
          'Todo lo incluido en Pro',
          'Sistema de gestión hotelera completo',
          'App móvil para huéspedes',
          'Programa de fidelización',
          'Integración con OTAs (Booking, Expedia)',
          'Analytics avanzado',
          '12 meses de soporte premium'
        ]
      }
    ]
  },
  {
    id: 'spa',
    name: 'Spa',
    icon: '💆',
    description: 'Transforma tu spa en un oasis digital que atraiga clientes buscando relajación y bienestar.',
    planes: [
      {
        id: 'basico',
        name: 'Básico',
        price: 1200,
        features: [
          'Diseño web elegante y relajante',
          'Catálogo de tratamientos',
          'Sistema de citas online',
          'Formulario de contacto',
          'Galería de instalaciones',
          '3 meses de soporte'
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 2300,
        features: [
          'Todo lo incluido en Básico',
          'Sistema de gestión de citas avanzado',
          'Venta de bonos y gift cards online',
          'Blog de bienestar',
          'Integración con redes sociales',
          'Newsletter automatizado',
          '6 meses de soporte'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 3800,
        features: [
          'Todo lo incluido en Pro',
          'App móvil para clientes',
          'Programa de membresías',
          'Sistema de puntos y recompensas',
          'Integración con software de gestión',
          'Marketing automation completo',
          '12 meses de soporte premium'
        ]
      }
    ]
  },
  {
    id: 'gastronomico',
    name: 'Gastronómico',
    icon: '🍽️',
    description: 'Conquista más comensales con una experiencia digital tan deliciosa como tu cocina.',
    planes: [
      {
        id: 'basico',
        name: 'Básico',
        price: 1000,
        features: [
          'Diseño web atractivo',
          'Menú digital interactivo',
          'Sistema de reservas',
          'Formulario de contacto',
          'Galería de platos',
          '3 meses de soporte'
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 2000,
        features: [
          'Todo lo incluido en Básico',
          'Pedidos online y delivery',
          'Integración con apps de delivery',
          'Sistema de promociones',
          'Blog gastronómico',
          'Gestión de eventos especiales',
          '6 meses de soporte'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 3500,
        features: [
          'Todo lo incluido en Pro',
          'App móvil propia',
          'Programa de fidelización',
          'Sistema de comandas digital',
          'Integración con POS',
          'Marketing automation y CRM',
          '12 meses de soporte premium'
        ]
      }
    ]
  }
];
