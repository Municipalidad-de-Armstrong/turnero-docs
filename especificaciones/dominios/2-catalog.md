# Dominio de Catálogo y Configuración (`catalog`)
> Sistema: **Turnero** — Municipalidad de Armstrong
> Tipo de Documento: Especificación Funcional por Dominio

Este dominio se encarga de estructurar y configurar la oferta de servicios que el municipio pone a disposición del ciudadano. Define la jerarquía de Áreas, Trámites, Variantes de atención y los recursos documentales asociados.

---

## 1. Historias de Usuario Técnicas

- **HU-14 (Catálogo)** `ADT-01` `ADT-03` — *Como Administrativo, quiero poder configurar el catálogo de trámites y áreas del municipio.*
  - **Criterios de Aceptación (CA):**
    - El administrativo puede crear, modificar y listar Áreas Municipales (ej: Rentas, Tránsito, Obras Particulares). Cada área cuenta con un Nombre (único) y una Descripción.
    - El administrativo puede crear, modificar y listar Trámites dentro de un Área. Cada trámite define si emite carnet físico (`emite_carnet = true/false`) y un límite diario de sobreturnos.
- **HU-17** `ADT-06` — *Como Administrativo, quiero asignar la documentación requerida a cada trámite.*
  - **Criterios de Aceptación (CA):**
    - El administrativo dispone de un editor de texto a nivel de trámite para detallar qué papeles, comprobantes o fotocopias debe presentar físicamente el ciudadano el día de su cita.
    - La documentación se guarda como texto plano en formato Markdown en la base de datos.
- **HU-26** `ADT-06` — *Como Administrativo, quiero gestionar los requerimientos previos, subir documentos descargables y configurar enlaces útiles para cada trámite.*
  - **Criterios de Aceptación (CA):**
    - El panel administrativo permite editar requerimientos previos específicos del trámite (pasos o validaciones previas a realizar online) en formato Markdown.
    - Permite subir archivos físicos de formularios oficiales al servidor (ej. archivos PDF, DOCX), asociándolos al trámite con un nombre descriptivo. Los archivos se almacenan en una carpeta física local del backend y sus URIs se guardan en la tabla `tramites_documentos`.
    - Permite configurar enlaces útiles de la web externa (como el link de consulta de multas nacionales) ingresando una descripción (nombre del link) y la URL correspondiente.

---

## 2. Reglas de Negocio del Dominio

1. **Jerarquía Relacional:**
   - Un **Área** puede tener múltiples **Trámites** asociados.
   - Un **Trámite** debe pertenecer obligatoriamente a una única **Área**.
   - Un **Trámite** puede tener asociadas múltiples **Variantes** de duración.
2. **Ciclo de Vida de los Recursos del Trámite:**
   - La eliminación de un trámite provoca la eliminación en cascada de sus variantes asociadas, sus registros de enlaces útiles y sus registros de documentos (los archivos físicos correspondientes del servidor local deben ser borrados del disco duro para evitar el almacenamiento de archivos huérfanos).
3. **Markdown Sanitizado:**
   - La documentación requerida y los requerimientos previos se escriben en Markdown. El backend almacena el texto crudo y el frontend es responsable de renderizar el Markdown a HTML aplicando un proceso obligatorio de sanitización en el cliente para prevenir inyecciones de código malicioso.
4. **Emisión de Carnet:**
   - Cada trámite expone una bandera booleana `emite_carnet`. Si está activa, indica al sistema de cierre de turnos que el trámite califica para registrar un Carnet en el perfil del ciudadano una vez finalizado exitosamente.
5. **Configuración de Límite de Sobretornos:**
   - El límite diario de sobreturnos se configura a nivel de Trámite (`limite_sobreturnos_diarios`). Por defecto, se asigna un valor de `5`. Este campo admite valores nulos o cero si se desea inhabilitar la creación de sobreturnos para un trámite en particular.
