# Análisis Inicial de Requerimientos — Sistema de Turnos

| Atributo | Valor |
|---|---|
| **Fuente** | Reunión con cliente (Municipalidad de Armstrong) |
| **Fecha** | 2026-07-02 |
| **Estado** | Base / fuente de verdad para el refinamiento |
| **Versión** | 1.0 |

> Este es el **primer documento de análisis**. Contiene los requerimientos funcionales tal como surgieron de la reunión con el cliente y sirve como fuente de verdad para el resto de la documentación. Las decisiones y desgloses posteriores (Fases 1–5) deben ser consistentes con este documento.

---

## 1. Perfil: Administrador

> Usuario con control total del sistema. Por defecto existe un **único** usuario administrador, precargado, con todos los privilegios.

| ID | Requerimiento |
|---|---|
| **ADM-01** | Debe poder gestionar el sistema completo. |
| **ADM-02** | Por defecto, el sistema contará con un único usuario administrador que poseerá todos los privilegios. |
| **ADM-03** | Debe tener la capacidad de registrar y crear cuentas para los usuarios administrativos que utilicen el sistema. |
| **ADM-04** | Debe poder eliminar usuarios administrativos del sistema. |

---

## 2. Perfil: Administrativo

> Operador interno que gestiona la operativa diaria desde un panel exclusivo. Ingresa con email y contraseña.

| ID | Requerimiento |
|---|---|
| **ADT-01** | Se debe disponibilizar un panel de administración exclusivo para este rol. |
| **ADT-02** | El ingreso al sistema por parte del administrativo debe realizarse utilizando su email y contraseña. |
| **ADT-03** | Desde su panel, el administrativo debe poder gestionar turnos, usuarios y trámites. |
| **ADT-04** | Debe tener la capacidad de cargar turnos manualmente cuando provengan de fuentes externas (atención presencial, WhatsApp o llamadas telefónicas). |
| **ADT-05** | Debe poder modificar los datos de cualquier turno existente. |
| **ADT-06** | Debe poder asignar la documentación requerida a cada trámite. |
| **ADT-07** | Debe registrar los horarios y las fechas correspondientes a los turnos. |
| **ADT-08** | Debe poder cargar sobreturnos, los cuales se asignarán a un día específico y se ordenarán por prioridad. |
| **ADT-09** | Debe tener la capacidad de asignar el estado de un turno como "completo" o "incompleto", lo cual hace referencia a si el resultado del trámite fue satisfactorio o no. |

---

## 3. Perfil: Usuario (Ciudadano)

> Usuario externo que reserva y gestiona sus turnos a través de una interfaz amigable.

| ID | Requerimiento |
|---|---|
| **USU-01** | El sistema debe disponibilizar una interfaz amigable para que el usuario elija su turno. |
| **USU-02** | Se debe permitir el registro del usuario solicitando su DNI, email y número de teléfono antes de que pueda elegir turnos. |
| **USU-03** | Al elegir turno, debe presentarse un primer menú de selección por **tipo de trámite** (ej. "licencia") y luego por **versión/variante** del tipo seleccionado (ej. "variante a", "variante b"). |
| **USU-04** | El usuario debe tener la posibilidad de seleccionar **más de una variante** de trámite durante su solicitud. |
| **USU-05** | El usuario debe poder elegir la fecha y el horario de su preferencia para el turno. |
| **USU-06** | La interfaz debe mostrar claramente los turnos que se encuentran disponibles. |
| **USU-07** | Se debe disponibilizar una opción rápida que permita seleccionar el "primer turno disponible". |
| **USU-08** | El sistema debe notificar cualquier cambio en el turno mediante notificaciones **dentro de la plataforma**, por **correo electrónico** y a través de **WhatsApp**. |
| **USU-09** | Se debe disponibilizar un link para que el usuario descargue la **planilla** correspondiente al trámite, la cual también se enviará automáticamente por email y WhatsApp. |
| **USU-10** | El sistema debe contar con una función para notificar al usuario si su **carnet** se encuentra a punto de vencer. |
| **USU-11** | El usuario debe contar con una sección para visualizar sus turnos asignados y sus sobreturnos. |

---

## 4. Glosario inicial

- **Sobreturno:** turno extra asignado a un día específico, fuera de la agenda regular, que se ordena por prioridad.
- **Variante:** versión/subtipo de un tipo de trámite (ej. dentro de "licencia" → "variante A", "variante B").
- **Planilla:** documento/formulario asociado a un trámite que el ciudadano puede descargar y recibir por email y WhatsApp.
- **Carnet:** documento emitido por algunos trámites, con fecha de vencimiento que el sistema debe monitorear.
