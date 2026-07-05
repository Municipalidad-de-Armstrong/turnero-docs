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
| Aviso de vencimiento de carnet | `USU-10` | Notificación cuando el carnet está por vencer. |
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

## 2. Historias de Usuario Técnicas

Convención: **HU-XX** · *Como `<actor>`, quiero `<acción>` para `<valor>`.* Se referencia el requerimiento origen y se incluyen criterios de aceptación (CA).

### 2.1 Ciudadano — Cuenta y autenticación

- **HU-01** `USU-02` — *Como Ciudadano, quiero registrarme con DNI, email, teléfono y contraseña para acceder al sistema.*
  - CA: DNI único; email único y validado; teléfono obligatorio; contraseña con política mínima.
- **HU-02** — *Como Ciudadano, quiero iniciar y cerrar sesión de forma segura.*
  - CA: sesión persistente con expiración; logout invalida el token.
- **HU-03** — *Como Ciudadano, quiero recuperar mi contraseña si la olvidé.*
  - CA: token de reseteo de un solo uso con expiración; email al correo registrado.
- **HU-04** `USU-02` — *Como Ciudadano, quiero editar mis datos de contacto.*
  - CA: teléfono y email editables; cambio de email requiere revalidación.

### 2.2 Ciudadano — Reserva de turnos

- **HU-05** `USU-01` `USU-03` — *Como Ciudadano, quiero elegir turno primero por tipo de trámite y luego por variante.*
  - CA: menú en dos pasos (tipo → variante); muestra documentación requerida por trámite (`ADT-06`).
- **HU-06** `USU-04` — *Como Ciudadano, quiero seleccionar más de una variante en una misma solicitud.*
  - CA: carrito/selección múltiple de variantes; cupo validado por cada variante.
- **HU-07** `USU-06` `USU-05` — *Como Ciudadano, quiero ver los turnos disponibles y elegir fecha y horario.*
  - CA: grilla con cupos reales en tiempo real; bloqueo optimista contra doble reserva.
- **HU-08** `USU-07` — *Como Ciudadano, quiero usar una opción rápida "primer turno disponible".*
  - CA: asigna la primera franja libre del trámite/variante seleccionada.
- **HU-09** `USU-08` `USU-09` — *Como Ciudadano, quiero recibir la confirmación con la planilla del trámite.*
  - CA: al confirmar, turno → **Reservado**; se envía **planilla** por email y WhatsApp y notificación en plataforma.
- **HU-10** — *Como Ciudadano, quiero reprogramar un turno existente.*
  - CA: solo sobre turnos Reservados; respeta anticipación mínima; libera el cupo anterior.
- **HU-11** — *Como Ciudadano, quiero cancelar un turno que ya no necesito.*
  - CA: libera cupo; turno → **Cancelado**; notificación en plataforma, email y WhatsApp.
- **HU-12** `USU-11` — *Como Ciudadano, quiero ver mis turnos y sobreturnos.*
  - CA: sección con próximos turnos, sobreturnos e historial.
- **HU-13** `USU-10` — *Como Ciudadano, quiero ser avisado cuando mi carnet esté por vencer.*
  - CA: el sistema genera una entidad "Carnet" local asociada al ciudadano cuando su turno de un trámite habilitado (`emite_carnet = true`) se marca como completo. Un proceso en segundo plano monitorea los vencimientos y notifica al ciudadano (plataforma/email/WhatsApp) con 30 días de anticipación (parámetro configurable a nivel sistema).

### 2.3 Administrativo — Gestión operativa

- **HU-14** `ADT-01` `ADT-03` — *Como Administrativo, quiero un panel para gestionar turnos, usuarios y trámites de cualquier área.*
- **HU-15** `ADT-04` — *Como Administrativo, quiero cargar turnos manualmente (presencial/WhatsApp/teléfono).*
  - CA: busca ciudadano por DNI o lo registra al vuelo; asigna trámite + variante + horario.
- **HU-16** `ADT-05` — *Como Administrativo, quiero modificar los datos de cualquier turno existente en el sistema.*
- **HU-17** `ADT-06` — *Como Administrativo, quiero asignar la documentación requerida a cada trámite.*
- **HU-18** `ADT-07` — *Como Administrativo, quiero registrar horarios y fechas de los turnos (agenda).*
- **HU-19** `ADT-08` — *Como Administrativo, quiero cargar sobreturnos para un día específico, ordenados por prioridad.*
  - CA: turno extra fuera de la agenda regular; marcado `es_sobturno`; ordenado por prioridad asignada manualmente (Alta, Media, Baja) y sub-ordenado cronológicamente. Límite diario de sobreturnos configurable por trámite/área (por defecto 5, permitiendo deshabilitar/ilimitado).
- **HU-20** `ADT-09` — *Como Administrativo, quiero cerrar un turno marcándolo completo, incompleto o ausente.*
  - CA: al finalizar el turno marca **"completo"** (trámite satisfactorio), **"incompleto"** (asistió pero faltó documentación u otra razón) o **"ausente"** (no asistió). Si el trámite genera carnet, al marcar "completo" el administrativo ingresa la fecha de vencimiento para registrar el Carnet localmente.

### 2.4 Administrador — Administración global

- **HU-21** `ADM-01` — *Como Administrador, quiero gestionar el sistema completo.*
- **HU-22** `ADM-02` — *Como Administrador, opero como cuenta única sembrada con todos los privilegios.*
- **HU-23** `ADM-03` — *Como Administrador, quiero crear cuentas para usuarios administrativos.*
- **HU-24** `ADM-04` — *Como Administrador, quiero eliminar usuarios administrativos.*

---

## 3. Flujos Críticos

### 3.1 Registro de ciudadano `USU-02`

**Actor:** Ciudadano · **Precondición:** no posee cuenta.

1. Ciudadano accede a "Registrarse".
2. Completa formulario: nombre, apellido, **DNI, email, teléfono**, contraseña.
3. **Sistema valida:** email único, DNI único, política de contraseña.
4. Sistema crea la cuenta en estado *pendiente de validación* y envía email de confirmación.
5. Ciudadano confirma vía enlace (token de un solo uso).
6. Cuenta pasa a *activa*; puede iniciar sesión y reservar.

**Alternativos:** DNI/email existente → se ofrece recuperación; token expirado → reenvío.

### 3.2 Reserva de turno `USU-01` `USU-03..09`

**Actor:** Ciudadano · **Precondición:** sesión iniciada, cuenta activa.

1. Ciudadano elige **tipo de trámite** y luego **variante(s)**; puede seleccionar **más de una variante** (`USU-04`). El sistema calcula la duración total del turno sumando la duración de todas las variantes seleccionadas para agendar un bloque continuo único de tiempo.
2. Sistema muestra documentación requerida del trámite (`ADT-06`) y la disponibilidad real (`USU-06`).
3. Ciudadano elige fecha/hora (`USU-05`) **o** usa **"primer turno disponible"** (`USU-07`).
4. **Sistema valida disponibilidad** con bloqueo contra doble reserva (concurrencia).
5. Turno creado en estado **Reservado** (fecha, hora, área, trámite, variante(s), ciudadano).
6. Sistema envía por **email y WhatsApp**: confirmación + **planilla** descargable (`USU-09`), y notificación en plataforma (`USU-08`).

**Alternativos:** sin disponibilidad → fechas alternativas o sobreturno vía administrativo; conflicto de concurrencia → refresco de grilla.

### 3.3 Asignación de sobreturno `ADT-08`

**Actor:** Administrativo · **Precondición:** se requiere un turno fuera de la agenda regular.

1. El ciudadano (presencial/WhatsApp/teléfono) solicita atención sin cupo en agenda.
2. Administrativo abre el día/trámite y selecciona "Cargar sobreturno".
3. Sistema crea un turno extra para ese **día específico**, marcado `es_sobturno = true`.
4. El sobreturno se **ordena por prioridad** (Alta, Media, Baja asignada de forma manual) y, a igual prioridad, por orden cronológico de creación.
5. Sistema notifica al ciudadano (plataforma/email/WhatsApp) con código/comprobante y planilla.

**Alternativos:** límite diario de sobreturnos (límite configurable por área/trámite, por defecto 5 sobreturnos diarios) → bloqueo y aviso; ciudadano no registrado → registro al vuelo (`HU-15`).

### 3.4 Cancelación

**Actor:** Ciudadano o Administrativo · **Precondición:** turno en estado **Reservado**.

**Por ciudadano:**
1. Ciudadano selecciona el turno y elige "Cancelar".
2. Sistema verifica anticipación mínima (parámetro configurable a nivel sistema, por defecto 24 horas).
3. Turno → **Cancelado**; se libera el cupo.
4. Notificación en plataforma, **email y WhatsApp**.

**Por administrativo:**
1. Administrativo localiza el turno en la cola.
2. Indica motivo (obligatorio) y cancela.
3. Turno → **Cancelado**; notificación al ciudadano por todos los canales; registro en auditoría.

**Alternativos:** fuera de anticipación → el ciudadano no puede autodescancelar (debe contactar a la municipalidad); turno ya cerrado → no se puede cancelar.

### 3.5 Cierre / resultado del trámite `ADT-09`

**Actor:** Administrativo · **Precondición:** turno atendido.

1. Administrativo atiende al ciudadano y, al finalizar, registra el resultado.
2. Marca el turno como **"completo"** (trámite satisfactorio), **"incompleto"** (asistió pero no pudo completar) o **"ausente"** (no asistió al turno).
3. Si el turno es "completo" y el trámite genera carnet, el Administrativo ingresa la fecha de vencimiento. El sistema genera el registro local de "Carnet" asociado al Ciudadano, disparando el proceso de seguimiento de **vencimiento del carnet** (`USU-10`).

---

## 4. Supuestos y decisiones (reconciliadas con el análisis)

- **Roles y nombres:** alineados al análisis: **Administrador** (único, sembrado, `ADM-02`), **Administrativo** (`ADT`), **Usuario/Ciudadano** (`USU`).
- **Autenticación ciudadano:** email + contraseña (decisión acordada con el cliente; complementa `USU-02`, que exige DNI/email/teléfono en el registro).
- **Estructura multi-área:** la arquitectura soporta múltiples áreas (ej. Rentas, Tránsito, etc.), y el usuario administrativo tiene acceso global para gestionar todas las áreas del sistema.
- **Notificaciones:** **siempre** en plataforma + email + **WhatsApp** (`USU-08`). WhatsApp es un requerimiento, no diferido.
- **Planilla:** descargable y enviada por email y WhatsApp (`USU-09`).
- **Carnet y Vencimientos:** se almacena una entidad "Carnet" en forma local e independiente vinculada al ciudadano (con su número, fecha de emisión y vencimiento) al momento de marcar como "completo" un turno de un trámite que emite carnet (`emite_carnet = true`). El sistema corre un proceso automático diario que envía notificaciones 30 días antes del vencimiento (configurable por el Administrador).
- **Sobretornos:** se marcan con `es_sobturno = true` para un día específico. Cuentan con una prioridad asignada manualmente (Alta, Media, Baja) por el administrativo, ordenándose por prioridad y luego por orden de llegada (hora de creación). Existe un límite diario de sobreturnos configurable por trámite/área (por defecto 5, con opción a ilimitado).
- **Resultado del turno:** los estados posibles para el resultado de un turno atendido/finalizado son: **completo** (trámite satisfactorio), **incompleto** (trámite no satisfactorio o no finalizado tras la asistencia) y **ausente** (el ciudadano no asistió al turno).
- **Reprogramación y Cancelación:** la cancelación/reprogramación por parte del ciudadano está sujeta a un parámetro de anticipación mínima configurable en el sistema por el Administrador (por defecto 24 horas). La reprogramación opera lógicamente como una cancelación y nueva reserva en una sola transacción.
- **Carrito de Variantes:** cuando un ciudadano selecciona múltiples variantes en un mismo turno, el sistema realiza una reserva de un bloque continuo único de tiempo equivalente a la suma de las duraciones de las variantes seleccionadas.

---

## 5. Historial de Resoluciones de Ambigüedades
Todas las ambigüedades de negocio identificadas inicialmente en esta sección han sido resueltas en acuerdo con el cliente (véase Sección 4). No quedan pendientes de definición para el inicio de la Fase 2.
