# Hoja de Ruta — Turnero Municipalidad de Armstrong

## Fase 1: Refinamiento de Requerimientos y Casos de Uso

- [ ] Identificar todos los actores del sistema y sus permisos específicos.
- [ ] Desglosar los requerimientos generales en historias de usuario técnicas.
- [ ] Definir los flujos críticos:
  - [ ] Registro de ciudadano
  - [ ] Reserva de turno
  - [ ] Asignación de sobreturno
  - [ ] Cancelación

## Fase 2: Modelado del Dominio y Reglas de Negocio

- [ ] Definir las entidades principales:
  - Usuarios
  - Trámites
  - Variantes
  - Turnos
  - Agenda
- [ ] Establecer las relaciones de cardinalidad entre entidades.
- [ ] Documentar el ciclo de vida (Máquina de Estados) de un turno:

  ```
  Disponible → Reservado → Completado / Ausente
  ```

## Fase 3: Diseño de Contratos de API (SDD - Backend)

- [ ] Mapear los endpoints RESTful necesarios para cubrir los casos de uso.
- [ ] Definir los esquemas de entrada (Request) y salida (Response) que manejará FastAPI.
- [ ] Establecer los códigos de estado HTTP y la estructura de manejo de errores.

## Fase 4: Arquitectura Frontend y Experiencia de Usuario (UI/UX)

- [ ] Definir el mapa del sitio (rutas públicas, rutas de ciudadanos, panel administrativo en Next.js).
- [ ] Estructurar la jerarquía de componentes y definir dónde se guardarán e integrarán las librerías de UI (ej. componentes base de Tailwind CSS o Material Design).
- [ ] Determinar la estrategia de renderizado (SSR vs. CSR) para cada ruta según la necesidad de SEO o interactividad.

## Fase 5: Arquitectura de Infraestructura y Seguridad

- [ ] Planificar el esquema de base de datos relacional y el uso de caché.
- [ ] Definir los protocolos de autenticación y autorización en ambas capas (Next.js y FastAPI).
- [ ] Documentar los flujos de auditoría para las acciones gubernamentales.
