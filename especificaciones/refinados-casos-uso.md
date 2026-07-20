# Fase 1 — Refinamiento de Requerimientos y Casos de Uso

> Sistema: **Turnero** — Municipalidad de Armstrong
> Alcance: sistema web multi-área para reserva y gestión de turnos ciudadanos.
> **Fuente de verdad:** [`iniciales.md`](iniciales.md)
> Cada historia/flujo referencia los IDs de requerimiento del análisis: `ADM-xx` (Administrador), `ADT-xx` (Administrativo), `USU-xx` (Usuario/Ciudadano).

---

## 1. Actores del Sistema y Permisos

El sistema distingue **3 roles**. La estructura es **multi-área** (ej. Rentas, Obras Particulares, Mesa de Entradas), decisión confirmada con el cliente como extensión de diseño sobre el análisis.

### 1.1 Usuario / Ciudadano (usuario externo) — `USU`

Usuario externo que se registra y gestiona sus turnos por una interfaz amigable. Se autentica con **email + contraseña** (decisión de autenticación acordada con el cliente, complementa `USU-02`).

| Permiso | Req. | Descripción |
|---|---|---|
| Interfaz de turnos | `USU-01` | Interfaz amigable para elegir turnos. |
| Registrarse | `USU-02` | Registro con **DNI, email y teléfono** (obligatorios) + contraseña. |
| Autenticarse | — | Inicia/cierra sesión; recupera contraseña. |
| Elegir trámite y variante | `USU-03` | Selección en dos pasos: tipo de trámite → variante. |
| Seleccionar múltiples variantes | `USU-04` | Puede incluir más de una variante en una misma solicitud. |
| Elegir fecha y horario | `USU-05` | Selecciona fecha/hora de preferencia. |
| Ver disponibilidad | `USU-06` | La interfaz muestra claramente los turnos disponibles. |
| Primer turno disponible | `USU-07` | Opción rápida para tomar el primer turno disponible. |
| Recibir notificaciones | `USU-08` | Cambios notificados en plataforma, **email** y **WhatsApp**. |
| Descargar planilla | `USU-09` | Link de descarga de la planilla del trámite; además enviada por email y WhatsApp. |
| [OBSOLETO] Aviso de vencimiento | `USU-10` | Eliminado por el cliente, no se envían notificaciones. |
| Ver sus turnos y sobreturnos | `USU-11` | Sección con turnos asignados y sobreturnos. |

**No puede:** ver turnos ajenos, gestionar agendas ni acceder al panel administrativo.

### 1.2 Administrativo (usuario interno) — `ADT`

Operador interno con **panel exclusivo**; ingresa con email + contraseña (`ADT-01`, `ADT-02`). Los usuarios administrativos tienen acceso global y pueden gestionar todas las áreas del municipio.

| Permiso | Req. | Descripción |
|---|---|---|
| Panel exclusivo | `ADT-01` | Acceso a un panel de administración propio del rol. |
| Gestión operativa | `ADT-03` | Gestiona turnos, usuarios y trámites desde su panel. |
| Carga manual de turnos | `ADT-04` | Crea turnos de fuentes externas (presencial, WhatsApp, teléfono). |
| Modificar turnos | `ADT-05` | Modifica los datos de cualquier turno existente de cualquier área. |
| Documentación por trámite | `ADT-06` | Asigna la documentación requerida a cada trámite. |
| Registrar horarios y fechas | `ADT-07` | Define horarios y fechas de los turnos (agenda). |
| Cargar sobreturnos | `ADT-08` | Sobretornos asignados a un día específico, **ordenados por prioridad**. |
| Resultado del trámite | `ADT-09` | Marca el turno como **"completo", "incompleto" o "ausente"** (trámite satisfactorio, no satisfactorio o inasistencia). |

**No puede:** gestionar cuentas administrativas ni la configuración global del sistema.

### 1.3 Administrador (administrador global) — `ADM`

> `ADM-02`: por defecto existe un **único** usuario administrador, precargado, con todos los privilegios.

| Permiso | Req. | Descripción |
|---|---|---|
| Gestión completa | `ADM-01` | Control total del sistema. |
| Único y con todos los privilegios | `ADM-02` | Cuenta única sembrada por defecto. |
| Crear administrativos | `ADM-03` | Registra y crea cuentas para usuarios administrativos. |
| Eliminar administrativos | `ADM-04` | Elimina usuarios administrativos del sistema. |

---

## 2. Índice de Especificaciones por Dominio (Bounded Contexts)

Para lograr un diseño modular y mantener la gobernanza técnica de la documentación (SSOT), las historias de usuario, los diagramas de secuencia, las máquinas de estado y las reglas de negocio específicas han sido segmentados en los siguientes archivos de especificación funcional:

### [1. Dominio de Identidad y Autenticación](dominios/1-identity.md)
* **Alcance:** Registro de ciudadanos, login/logout con cookies JWT HttpOnly, recuperación de claves, roles (`USU`, `ADT`, `ADM`) y el protocolo de reportes de usurpación de DNI en conflicto.
* **Componentes clave:** Login, Registro, Recuperación, Gestión de Usurpaciones.

### [2. Dominio de Catálogo y Configuración](dominios/2-catalog.md)
* **Alcance:** Gestión de la oferta municipal de Áreas, Trámites y sus Variantes de duración. Configuración de límites y adjuntos del trámite (documentos descargables y enlaces útiles).
* **Componentes clave:** Editor de Trámites, Gestor de Requisitos.

### [3. Dominio de Agendamiento](dominios/3-scheduling.md)
* **Alcance:** Parámetros de atención semanal (días y horas hábiles) y la capacidad simultánea de atención por trámite.
* **Componentes clave:** Configuración de Agenda.

### [4. Dominio de Reservas y Disponibilidad](dominios/4-booking.md)
* **Alcance:** Motor de cálculo de slots de disponibilidad para múltiples variantes (carrito de variantes), validación de solapamientos sin condiciones de carrera, reserva de turnos, reprogramación y cancelación.
* **Diagramas incluidos:** Diagrama de secuencia del Motor de Disponibilidad y Diagrama del Stepper de reserva del frontend.

### [5. Dominio de Operación y Cierre](dominios/5-operation.md)
* **Alcance:** Gestión diaria de la cola de turnos en tiempo real, sobreturnos con prioridad y límites diarios, atendedor de resultados del trámite (Completo, Incompleto, Ausente) y registro histórico de Carnets.
* **Diagramas incluidos:** Máquina de Estados de la entidad `Turno`.

### [6. Dominio de Notificaciones y Planillas](dominios/6-notifications.md)
* **Alcance:** Envío asíncrono de confirmaciones y cancelaciones por Email y WhatsApp, y generación de la planilla PDF descargable de la cita.
* **Componentes clave:** Tareas en segundo plano (Background Tasks), Generador de PDF.

---

## 3. Supuestos y decisiones de negocio consolidadas

- **Autenticación ciudadano:** Email + contraseña (exigiendo DNI, email y teléfono obligatorios en el registro).
- **Acceso Multi-área:** La arquitectura soporta múltiples áreas, y los usuarios administrativos tienen acceso global para gestionar todas las áreas del municipio.
- **Canal de Notificaciones:** Se despachan avisos por tres vías simultáneas: plataforma, email y WhatsApp (este último de forma mandatoria y no diferido).
- **Control de Carnets:** Se almacena una entidad `Carnet` histórica vinculada al ciudadano (con número, fecha de emisión y vencimiento) al marcar como Completo un turno de un trámite que emite carnet. Se desactivan por completo las alertas automáticas de vencimiento al ciudadano, conservando la información solo para consulta administrativa.
- **Reportes de Identidad:** Permite a ciudadanos no autenticados reportar un DNI en uso no autorizado durante el registro. Requiere datos de contacto reales y descripción. El administrativo puede suspender la cuenta del DNI usurpador directamente desde el reporte.
- **Sobretornos:** Se marcan con `es_sobreturno = true` para un día específico. Cuentan con una prioridad asignada manualmente (Alta, Media, Baja), ordenándose por prioridad y luego por orden de llegada (hora de creación). Existe un límite diario de sobreturnos configurable por trámite (por defecto 5).
- **Resultado del turno:** Los estados posibles para el resultado de un turno atendido son: `COMPLETO`, `INCOMPLETO` y `AUSENTE`.
- **Reprogramación y Cancelación:** La cancelación/reprogramación por parte del ciudadano está sujeta a un parámetro de anticipación mínima configurable en el sistema por el Administrador (por defecto 24 horas). La reprogramación opera como una cancelación y nueva reserva en una sola transacción.
- **Carrito de Variantes:** Cuando un ciudadano selecciona múltiples variantes en un mismo turno, el sistema realiza una reserva de un bloque continuo único de tiempo equivalente a la suma de las duraciones de las variantes seleccionadas.

---

## 4. Historial de Resoluciones de Ambigüedades
Todas las ambigüedades de negocio identificadas inicialmente en esta sección han sido resueltas en acuerdo con el cliente. No quedan pendientes de definición para el inicio de la fase de construcción.
