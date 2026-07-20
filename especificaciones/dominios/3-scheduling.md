# Dominio de Agendamiento (`scheduling`)
> Sistema: **Turnero** — Municipalidad de Armstrong
> Tipo de Documento: Especificación Funcional por Dominio

Este dominio se encarga de definir la capacidad de atención y disponibilidad temporal del municipio. Regula las horas hábiles de servicio de cada trámite y la cantidad de recursos concurrentes que tiene el municipio para atender al público.

---

## 1. Historias de Usuario Técnicas

- **HU-18** `ADT-07` — *Como Administrativo, quiero registrar horarios y fechas de los turnos (agenda).*
  - **Criterios de Aceptación (CA):**
    - El administrativo puede configurar los parámetros de atención semanal por cada Trámite en la tabla `agenda_configuracion`.
    - Cada regla de agenda define: el Día de la semana (0 a 6), la Hora de Inicio de atención, la Hora de Fin de atención, y la Capacidad Simultánea.
    - El sistema valida que la Hora de Fin sea estrictamente posterior a la Hora de Inicio.
    - El sistema permite deshabilitar temporalmente la atención de un día de la semana específico utilizando la bandera `activo = false/true`.

---

## 2. Reglas de Negocio del Dominio

1. **Configuración por Trámite:**
   - La disponibilidad horaria se rige a nivel de **Trámite** y no por área global. Esto permite que el trámite de "Licencia de Conducir" tenga horarios o capacidades diferentes a las del trámite de "Pago de Tasas Municipales", aun perteneciendo a la misma área física.
2. **Capacidad Simultánea de Atención:**
   - La variable `capacidad_simultanea` (entero mayor a cero, por defecto `1`) define cuántos ciudadanos pueden tener un turno superpuesto en el mismo bloque temporal. Equivale a la cantidad de ventanillas u operadores disponibles para el trámite en ese horario.
3. **Persistencia de Reglas vs. Turnos Existentes:**
   - Si el administrativo modifica la agenda semanal (por ejemplo, reduce la capacidad simultánea de 3 a 1 para los lunes, o cambia el horario de cierre), los turnos que ya fueron reservados previamente por ciudadanos para fechas futuras **deben ser respetados y no se cancelan de forma automática**. Las nuevas reglas de agenda aplican únicamente para búsquedas y reservas realizadas a partir del momento de la modificación.
4. **Desactivación Temporal:**
   - Configurar `activo = false` para un día de la semana específico bloquea por completo la oferta de slots para ese día en el motor de búsqueda de disponibilidad, impidiendo que los ciudadanos soliciten citas en ese día hasta que vuelva a ser activado.
