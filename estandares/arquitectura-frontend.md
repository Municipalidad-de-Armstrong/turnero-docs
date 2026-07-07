# Estándar de Arquitectura y Diseño Frontend
**Proyecto:** Turnero — Municipalidad de Armstrong  
**Tipo de Documento:** Estándar Técnico de Desarrollo  

Este documento define la arquitectura técnica del frontend, la estrategia de renderizado de Next.js, y el sistema de diseño visual (tokens y componentes) que rige el desarrollo de la interfaz de usuario.

---

## 1. Guía de Diseño Visual (Design Tokens)

El diseño del frontend se basa en las especificaciones cromáticas del documento de [identidad-visual.md](identidad-visual.md). Se utilizará **Tailwind CSS** para la implementación ágil de estilos, utilizando los siguientes tokens configurados:

### A. Paleta de Colores (config. de Tailwind)
Para mantener las proporciones visuales sugeridas por el cliente (60% fondos, 30% interacción, 5% textos, 5% destaque en naranja), se registrarán los siguientes alias en la configuración:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FE8F00',     // 30% - Interacción, Header, Botones, Links
          bgLight: '#F0F2F5',    // 60% - Fondos generales, Tarjetas, Formularios
          textDark: '#333333',   // 5%  - Texto primario, Iconos en fondo claro
          white: '#FFFFFF',      // 5%  - Texto/Iconos sobre brand.orange
          grayDark: '#999999',   // Soporte - Texto secundario
          grayMedium: '#B6B7B8', // Soporte - Bordes y estados inactivos
          grayLight: '#D3D4D6'   // Soporte - Divisores y fondos secundarios
        },
        estado: {
          reservado: '#2563EB',  // Azul - Turno reservado
          completo: '#16A34A',   // Verde - Trámite satisfactorio
          incompleto: '#D97706', // Amarillo/Ámbar - Falta documentación
          ausente: '#DC2626',    // Rojo - Inasistencia
          cancelado: '#4B5563'   // Gris - Turno cancelado/liberado
        }
      }
    }
  }
}
```

### B. Tipografía
Se importará la fuente **Montserrat** mediante `next/font/google`.
- **Títulos ($H1$):** `font-bold` (Montserrat Bold).
- **Subtítulos ($H2$):** `font-semibold` (Montserrat Semibold).
- **Cuerpo de texto / Inputs / Botones:** `font-normal` o `font-medium` (Montserrat Regular/Medium).

### C. Iconografía
Se integrará **Material Symbols & Icons** de Google con el estilo **Rounded** configurado globalmente para asegurar bordes circulares coherentes con el logotipo municipal.

### D. Uso del Logotipo Oficial (Assets de Imagen)
> [!IMPORTANT]
> **REGLA DE CONSTRUCCIÓN DE LOGOS:**
> Queda prohibido escribir código SVG dinámico o manual en el frontend para el logo. Los logos se deben cargar exclusivamente como recursos de imagen estáticos (ej: `.png` o `.svg` oficiales de la municipalidad extraídos de `identidad-visual.pdf`) almacenados en el directorio `/public/images/` del frontend y renderizados con el componente `<Image />` de Next.js.

---

## 2. Estrategia de Renderizado (SSR vs CSR vs SSG)

Para optimizar los tiempos de carga, mejorar el SEO en la landing page y proveer interactividad en los paneles, se adopta un enfoque híbrido en Next.js (App Router):

| Ruta/Página | Estrategia de Renderizado | Justificación Técnica |
| :--- | :--- | :--- |
| `/` (Landing) | **SSG (Static Site Generation)** | Contenido estático. Se pre-renderiza en build time para carga instantánea y SEO óptimo. |
| `/auth/*` | **CSR (Client-Side Rendering)** | Contiene formularios dinámicos y validaciones de cliente en tiempo real. |
| `/turnos` | **SSR (Server-Side Rendering)** | Obtiene del servidor los turnos del usuario logueado en tiempo de petición para asegurar frescura de datos. |
| `/turnos/reservar` | **Híbrido (Layout SSR + Contenido CSR)** | El contenedor inicial es del servidor para validar sesión, pero el stepper de reserva es 100% interactivo en cliente (grilla de turnos dinámicos, cálculo del carrito de variantes). |
| `/admin/*` (Paneles) | **SSR (Server-Side Rendering)** | Datos de alta criticidad que cambian constantemente. Requiere validación de rol del lado del servidor en cada request para seguridad estricta. |

---

## 3. Jerarquía y Estrategia de Componentes

Los componentes se organizarán bajo la carpeta `/src/components` del frontend siguiendo un esquema de diseño modular:

```
src/
└── components/
    ├── ui/                 # Componentes atómicos de UI (genéricos y reutilizables)
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   ├── Card.tsx
    │   ├── Badge.tsx       # Muestra el estado del turno con colores brand.estado
    │   └── Dialog.tsx      # Modal de confirmación genérico
    └── business/           # Componentes de negocio (acoplados al dominio)
        ├── CartVariantes.tsx       # Selección y acumulación de variantes del ciudadano
        ├── GrillaSlots.tsx         # Renderiza los horarios libres del día
        ├── BuscadorCiudadano.tsx   # Autocompletado administrativo por DNI/Email
        ├── AtendedorTurno.tsx      # Panel para administrativo para marcar Completo/Incompleto/Ausente
        └── PrioritySelector.tsx    # Asignación manual de prioridad de sobreturnos
```

### Componentes Clave de Negocio:

1. **`CartVariantes` (Carrito de Variantes):**
   - Permite agregar y quitar variantes del trámite elegido.
   - Calcula y muestra la suma total en minutos de la duración del bloque de tiempo requerido (`USU-04`).
2. **`GrillaSlots` (Grilla de Disponibilidad):**
   - Consume la disponibilidad de la API en tiempo real.
   - Muestra visualmente las franjas horarias ocupadas e inhabilitadas.
   - Bloquea optimistamente el slot seleccionado al avanzar al paso de confirmación para mitigar problemas de concurrencia.
3. **`AtendedorTurno` (Cierre Operativo):**
   - Formulario rápido utilizado por el administrativo para cambiar el estado de un turno reservado.
   - Al marcar "Completo", si el trámite tiene `emite_carnet: true`, despliega un campo obligatorio para ingresar la `fecha_vencimiento` del carnet del ciudadano.
4. **`PrioritySelector` (Priorización de Sobretornos):**
   - Permite al administrativo asignar las prioridades `ALTA`, `MEDIA` o `BAJA` al cargar un sobreturno.
   - Ordena visualmente la cola de espera de sobreturnos del día.
