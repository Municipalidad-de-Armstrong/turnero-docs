# Fase 1 — Refinamiento de Requerimientos y Casos de Uso

> Sistema: **Turnero** — Municipalidad de Armstrong
> Alcance: sistema web multi-área para reserva y gestión de turnos ciudadanos.
> **Fuente de verdad:** [`00-requerimientos-iniciales.md`](00-requerimientos-iniciales.md)
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

### 1.2 Administrativo (usuario interno, por área) — `ADT`

Operador interno con **panel exclusivo**; ingresa con email + contraseña (`ADT-01`, `ADT-02`). Su alcance es el área a la que está asignado.

| Permiso | Req. | Descripción |
|---|---|---|
| Panel exclusivo | `ADT-01` | Acceso a un panel de administración propio del rol. |
| Gestión operativa | `ADT-03` | Gestiona turnos, usuarios y trámites desde su panel. |
| Carga manual de turnos | `ADT-04` | Crea turnos de fuentes externas (presencial, WhatsApp, teléfono). |
| Modificar turnos | `ADT-05` | Modifica los datos de cualquier turno existente de su área. |
| Documentación por trámite | `ADT-06` | Asigna la documentación requerida a cada trámite. |
| Registrar horarios y fechas | `ADT-07` | Define horarios y fechas de los turnos (agenda). |
| Cargar sobreturnos | `ADT-08` | Sobreturnos asignados a un día específico, **ordenados por prioridad**. |
| Resultado del trámite | `ADT-09` | Marca el turno como **"completo" o "incompleto"** (resultado satisfactorio o no). |

**No puede:** gestionar otras áreas, gestionar cuentas administrativas ni la configuración global del sistema.

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
  - CA: el sistema monitorea fecha de vencimiento del carnet y notifica (plataforma/email/WhatsApp) con anticipación configurada.

### 2.3 Administrativo — Gestión operativa

- **HU-14** `ADT-01` `ADT-03` — *Como Administrativo, quiero un panel para gestionar turnos, usuarios y trámites de mi área.*
- **HU-15** `ADT-04` — *Como Administrativo, quiero cargar turnos manualmente (presencial/WhatsApp/teléfono).*
  - CA: busca ciudadano por DNI o lo registra al vuelo; asigna trámite + variante + horario.
- **HU-16** `ADT-05` — *Como Administrativo, quiero modificar los datos de cualquier turno existente de mi área.*
- **HU-17** `ADT-06` — *Como Administrativo, quiero asignar la documentación requerida a cada trámite.*
- **HU-18** `ADT-07` — *Como Administrativo, quiero registrar horarios y fechas de los turnos (agenda).*
- **HU-19** `ADT-08` — *Como Administrativo, quiero cargar sobreturnos para un día específico, ordenados por prioridad.*
  - CA: turno extra fuera de la agenda regular; marcado `es_sobturno`; ordenado por prioridad.
- **HU-20** `ADT-09` — *Como Administrativo, quiero cerrar un turno marcándolo completo o incompleto.*
  - CA: al finalizar la atención marca **"completo"** (trámite satisfactorio) o **"incompleto"**.

### 2.4 Administrador — Administración global

- **HU-21** `ADM-01` — *Como Administrador, quiero gestionar el sistema completo.*
- **HU-22** `ADM-02` — *Como Administrador, opero como cuenta única sembrada con todos los privilegios.*
- **HU-23** `ADM-03` — *Como Administrador, quiero crear cuentas para usuarios administrativos y asignarlos a áreas.*
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

1. Ciudadano elige **tipo de trámite** y luego **variante(s)**; puede seleccionar **más de una variante** (`USU-04`).
2. Sistema muestra documentación requerida del trámite (`ADT-06`) y la disponibilidad real (`USU-06`).
3. Ciudadano elige fecha/hora (`USU-05`) **o** usa **"primer turno disponible"** (`USU-07`).
4. **Sistema valida disponibilidad** con bloqueo contra doble reserva (concurrencia).
5. Turno creado en estado **Reservado** (fecha, hora, área, trámite, variante(s), ciudadano).
6. Sistema envía por **email y WhatsApp**: confirmación + **planilla** descargable (`USU-09`), y notificación en plataforma (`USU-08`).

**Alternativos:** sin disponibilidad → fechas alternativas o sobreturno vía administrativo; conflicto de concurrencia → refresco de grilla.

### 3.3 Asignación de sobreturno `ADT-08`

**Actor:** Administrativo · **Precondición:** se requiere un turno fuera de la agenda regular.

1. El ciudadano (presencial/WhatsApp/teléfono) solicita atención sin cupo en agenda.
2. Administrativo abre el día/trámite en su área y selecciona "Cargar sobreturno".
3. Sistema crea un turno extra para ese **día específico**, marcado `es_sobturno = true`.
4. El sobreturno se **ordena por prioridad** respecto a los demás sobreturnos del día.
5. Sistema notifica al ciudadano (plataforma/email/WhatsApp) con código/comprobante y planilla.

**Alternativos:** límite diario de sobreturnos (política) → bloqueo y aviso; ciudadano no registrado → registro al vuelo (`HU-15`).

### 3.4 Cancelación

**Actor:** Ciudadano o Administrativo · **Precondición:** turno en estado **Reservado**.

**Por ciudadano:**
1. Ciudadano selecciona el turno y elige "Cancelar".
2. Sistema verifica anticipación mínima.
3. Turno → **Cancelado**; se libera el cupo.
4. Notificación en plataforma, **email y WhatsApp**.

**Por administrativo:**
1. Administrativo localiza el turno en la cola del área.
2. Indica motivo (obligatorio) y cancela.
3. Turno → **Cancelado**; notificación al ciudadano por todos los canales; registro en auditoría.

**Alternativos:** fuera de anticipación → el ciudadano no puede autodescancelar (contacta al área); turno ya cerrado → no se puede cancelar.

### 3.5 Cierre / resultado del trámite `ADT-09`

**Actor:** Administrativo · **Precondición:** turno atendido.

1. Administrativo atiende al ciudadano y, al finalizar, registra el resultado.
2. Marca el turno como **"completo"** (trámite satisfactorio) o **"incompleto"** (no satisfactorio).
3. El resultado queda registrado para reportes y, si corresponde, dispara el seguimiento de **vencimiento del carnet** (`USU-10`).

> ⚠️ El estado de **ausencia/no-show** (el ciudadano no concurrió) no está contemplado explícitamente en el análisis; queda pendiente de confirmación con el cliente antes de formalizar la máquina de estados en Fase 2.

---

## 4. Supuestos y decisiones (reconciliadas con el análisis)

- **Roles y nombres:** alineados al análisis: **Administrador** (único, sembrado, `ADM-02`), **Administrativo** (`ADT`), **Usuario/Ciudadano** (`USU`).
- **Autenticación ciudadano:** email + contraseña (decisión acordada con el cliente; complementa `USU-02`, que exige DNI/email/teléfono en el registro).
- **Estructura multi-área:** extensión de diseño confirmada con el cliente, no contradice el análisis; acota el alcance de cada Administrativo.
- **Notificaciones:** **siempre** en plataforma + email + **WhatsApp** (`USU-08`). WhatsApp es un requerimiento, no diferido.
- **Planilla:** descargable y enviada por email y WhatsApp (`USU-09`).
- **Carnet:** el sistema debe trackear vencimientos y notificar (`USU-10`) → implica una entidad/atributo de carnet con fecha de vencimiento (a modelar en Fase 2).
- **Sobreturno:** turno extra para un día específico, **ordenado por prioridad** (`ADT-08`).
- **Resultado del turno:** **completo / incompleto** (`ADT-09`). El no-show queda pendiente de confirmar con el cliente.
- **Reprogramación:** se tratará como cancelar + reservar en una sola operación (a formalizar en Fase 3).

## 5. Items pendientes de confirmar con el cliente

> [!WARNING]
> **ESTADO: BLOQUEADO.** En cumplimiento de la guía de [estanderes-ingenieria.md](estanderes-ingenieria.md) y de la [01-hoja-de-ruta.md](01-hoja-de-ruta.md), las siguientes preguntas representan ambigüedades de negocio que bloquean el modelado de datos de la Fase 2. Deben ser respondidas y sus reglas de negocio integradas en este documento antes de proceder.

1. ¿Existe el estado de **ausencia/no-show** (cuando el ciudadano no asiste al turno) además de completo/incompleto? (`ADT-09`). *Esto afecta la máquina de estados del turno.*
2. ¿Cuál es la política de **límite diario de sobreturnos** por área/trámite? (`ADT-08`). *Esto define reglas de validación en la API.*
3. ¿Cuál es el criterio exacto de **prioridad** de los sobreturnos (ej. orden de llegada, urgencia médica/social, prioridad administrativa)? *Afecta al ordenamiento en la cola de atención.*
4. ¿Cuál es la anticipación mínima requerida para cancelar o reprogramar un turno por parte del ciudadano? *Afecta las validaciones de las historias de usuario de cancelación.*
5. ¿Un Administrativo puede estar asignado a **más de un área** a la vez, o su relación es estrictamente de 1 a 1? *Afecta la cardinalidad de las tablas en la base de datos.*
6. Alcance del seguimiento de **carnet**: ¿qué trámites emiten carnet, cómo se asocia un carnet al ciudadano, y con qué anticipación se debe disparar el aviso de vencimiento? (`USU-10`).
7. **[NUEVO] Funcionamiento técnico del "Carrito de Variantes" (`USU-04`):** Cuando un ciudadano elige múltiples variantes en una reserva (ej. variante A de 20 min y variante B de 15 min), ¿cómo se calcula la duración del turno en la agenda? ¿El sistema debe reservar un bloque continuo de tiempo (ej. 35 minutos en un único slot) o reservar turnos separados?
8. **[NUEVO] Gestión de la fecha de vencimiento del carnet (`USU-10`):** ¿El sistema de turnos es el que genera y almacena la información del carnet (es decir, persiste la entidad "Carnet" con su fecha de vencimiento cuando el administrativo marca "completo" en el turno)? ¿O debe integrarse con una base de datos externa de la Municipalidad?

