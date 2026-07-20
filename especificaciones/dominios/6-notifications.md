# Dominio de Notificaciones y Planillas (`notifications`)
> Sistema: **Turnero** — Municipalidad de Armstrong
> Tipo de Documento: Especificación Funcional por Dominio

Este dominio se encarga de mantener informado al ciudadano y proveerle la documentación formal del turno. Gestiona la generación de la planilla PDF y el despacho de notificaciones asíncronas por múltiples canales (plataforma, email y WhatsApp).

---

## 1. Historias de Usuario Técnicas

- **HU-09** `USU-08` `USU-09` — *Como Ciudadano, quiero recibir la confirmación con la planilla del trámite.*
  - **Criterios de Aceptación (CA):**
    - Al guardarse una reserva con éxito, el sistema encola automáticamente el envío de confirmación.
    - Se envía un mensaje por WhatsApp y un correo electrónico (SMTP) que contienen: detalles de la reserva (fecha, hora, área, trámite), la lista de documentos que debe llevar, y el enlace/archivo de la planilla del trámite.
    - En la interfaz del ciudadano (plataforma) se genera una notificación interna.
- **HU-25** `USU-03` — *Como Ciudadano, quiero descargar la planilla y ver los enlaces y documentos descargables del trámite.*
  - **Criterios de Aceptación (CA):**
    - En el detalle del turno dentro de su panel, el ciudadano puede hacer clic en "Descargar Planilla" para obtener el comprobante de turno en formato PDF.
    - Se visualizan enlaces externos útiles configurados para el trámite y se permite la descarga directa de archivos PDF/formularios subidos por el administrativo.

---

## 2. Reglas de Negocio del Dominio

1. **Desacoplamiento y Asincronismo Obligatorio:**
   - Queda estrictamente prohibido que las llamadas HTTP del cliente (ej: `POST /turnos`) queden en espera mientras el servidor genera un PDF o envía un correo SMTP.
   - El backend debe responder inmediatamente al cliente y procesar el envío de correos y mensajes en segundo plano utilizando las **Background Tasks de FastAPI** (o un worker de tareas asíncronas).
2. **Generación de Planilla PDF:**
   - El backend compila los datos del turno y genera un archivo PDF dinámico que incluye:
     - Código de barras o identificador único del turno.
     - Datos personales del ciudadano (Nombre, Apellido, DNI).
     - Datos de la cita (Área, Trámite, Variantes, Fecha, Horario de inicio y fin).
     - La sección de documentación requerida (renderizada de Markdown a texto en el PDF).
3. **Canal de Notificaciones de WhatsApp:**
   - Se implementará un cliente HTTP asíncrono para comunicarse con la API de WhatsApp oficial provista por el municipio. 
   - Durante las fases de desarrollo y prueba, el servicio de WhatsApp se configurará de manera "mockable" (simulada) imprimiendo los mensajes enviados en los logs de la consola del backend o escribiéndolos en archivos de depuración local.
4. **Notificaciones en Plataforma:**
   - La tabla `notificaciones` guarda los mensajes destinados al usuario. El frontend muestra un indicador visual (ej: campana de notificaciones) para alertar al ciudadano sobre nuevos avisos (confirmaciones de reserva, cancelaciones administrativas o reprogramaciones).
5. **No Alertas de Vencimiento de Carnets:**
   - Se confirma que **no se envían alertas de vencimiento de carnet** al ciudadano por WhatsApp ni correo (requerimiento obsoleto). Las notificaciones de este dominio aplican exclusivamente para el agendamiento y control del turno.
