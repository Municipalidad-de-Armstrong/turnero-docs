# Hoja de Ruta Procedural — Turnero Municipalidad de Armstrong

Este documento define la secuencia obligatoria de fases de especificación pre-desarrollo. Ninguna fase puede iniciarse si la anterior no está formalmente completada y validada contra los criterios establecidos en [ingenieria.md](../estandares/ingenieria.md).

> 📄 **Fuentes de verdad iniciales:** 
> - [iniciales.md](../especificaciones/iniciales.md) (Requerimientos brutos de la entrevista).
> - [ingenieria.md](../estandares/ingenieria.md) (Estándares de calidad y gobernanza técnica del proyecto).

---

## Fase 1: Refinamiento de Requerimientos y Resolución de Ambigüedades
> 📄 **Documento de salida:** [refinados-casos-uso.md](../especificaciones/refinados-casos-uso.md)

- [x] Identificar todos los actores del sistema y sus permisos específicos.
- [x] Desglosar los requerimientos generales en historias de usuario técnicas.
- [x] Definir los flujos críticos (Registro, Reserva, Sobreturno, Cancelación).
- [x] **[BLOQUEANTE] Resolver y Cerrar Ambigüedades Críticas:**
  - [x] Responder las 6 preguntas de negocio pendientes (Sección 5 de [refinados-casos-uso.md](../especificaciones/refinados-casos-uso.md)).
  - [x] Definir el funcionamiento exacto y la lógica de tiempo del "Carrito de Variantes" (`USU-04`).
  - [x] Definir el origen de datos y almacenamiento de las fechas de vencimiento de los Carnets (`USU-10`).
- [x] Actualizar e integrar todas las respuestas directamente en el documento de especificación funcional [refinados-casos-uso.md](../especificaciones/refinados-casos-uso.md) eliminando la sección de "Pendientes".

---

## Fase 2: Modelado del Dominio y Reglas de Negocio
> 📄 **Documento de salida:** [modelo-dominio.md](../estandares/modelo-dominio.md) (Completado)

- [x] Modelar las entidades principales del sistema (Usuarios, Roles, Áreas, Trámites, Variantes, Turnos, Agenda, Sobretornos, Carnets).
- [x] Establecer relaciones de cardinalidad y restricciones SQL para cada entidad según los estándares de [ingenieria.md](../estandares/ingenieria.md).
- [x] Crear el diagrama Entity-Relationship (ERD) en formato Mermaid.
- [x] Documentar el ciclo de vida y la Máquina de Estados de la entidad `Turno` mediante un diagrama de estados Mermaid, detallando:
  - Transiciones válidas (ej: `Reservado` -> `Completo` / `Incompleto` / `Ausente`).
  - Restricciones de seguridad por rol para cada transición.

---

## Fase 3: Diseño de Contratos de API
> 📄 **Documento de salida:** [openapi.yaml](../especificaciones/openapi.yaml) (Completado)

- [x] Mapear los endpoints RESTful necesarios para cumplir con todos los casos de uso descritos en la Fase 1.
- [x] Crear el contrato OpenAPI 3.0 en formato YAML, definiendo esquemas de entrada (Requests) y salida (Responses) de FastAPI.
- [x] Establecer el estándar de manejo de errores uniforme (Problem Details) y códigos de estado HTTP aplicables para cada endpoint.

---

## Fase 4: Arquitectura Frontend y Experiencia de Usuario (UI/UX)
> 📄 **Documento de salida:** [frontend-ux-ui.md](../estandares/frontend-ux-ui.md) (A generar)

- [ ] Definir el mapa de sitio jerárquico y rutas protegidas en Next.js por rol.
- [ ] Estructurar la arquitectura de componentes del frontend y la estrategia de renderizado (SSR vs CSR) para cada página.
- [ ] Definir la guía de diseño visual del frontend (Layout, tipografía, paleta de colores, librerías de UI a utilizar).

---

## Fase 5: Arquitectura de Infraestructura, Notificaciones y Seguridad
> 📄 **Documento de salida:** [infraestructura-seguridad.md](../estandares/infraestructura-seguridad.md) (A generar)

- [ ] Planificar la infraestructura de la base de datos (PostgreSQL), la estrategia de indexación para búsquedas rápidas (por DNI/Fecha) y el uso de caché si aplica.
- [ ] Definir la arquitectura asíncrona para el envío de notificaciones automáticas (WhatsApp and Email) sin bloquear el hilo principal de la API.
- [ ] Documentar el flujo de auditoría de acciones administrativas y el protocolo de seguridad para la autenticación (JWT con cookies HttpOnly) y encriptación de datos sensibles.
