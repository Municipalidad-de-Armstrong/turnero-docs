# Identidad Visual — Turnero de Licencias
**Municipalidad de Armstrong**

Este documento registra formalmente el uso de la identidad visual del cliente para el proyecto. El archivo PDF original con los assets visuales se encuentra guardado en el repositorio en:
👉 [identidad-visual.pdf](identidad-visual.pdf)

---

## 1. Logotipo Institucional y Assets Gráficos

> [!IMPORTANT]
> **REGLA DE ORO DE IMPLEMENTACIÓN:**
> Queda **estrictamente prohibido** intentar recrear el logotipo institucional de la Municipalidad de Armstrong mediante código SVG manual, canvas o estilos CSS aproximados en el código del frontend. 
> 
> Para cualquier componente de la interfaz (Header, planillas, notificaciones, etc.) se deben utilizar exclusivamente los archivos de imagen del logotipo oficial. Estos deben ser extraídos directamente del documento de identidad visual [identidad-visual.pdf](identidad-visual.pdf) o provistos por el área de comunicación del municipio, y almacenados como recursos estáticos en el frontend (ej. en `public/assets/logo-muni.png`).

### Directrices de Uso del Logotipo:
* **Versión Principal:** Utilizar para la cabecera y secciones sobre fondo claro.
* **Versiones Monocromáticas:** Reservadas para fondos oscuros o de color naranja donde la versión principal no tenga el contraste requerido.
* **Tamaño Mínimo:** No escalar el logo a un tamaño menor de **50x50px** para asegurar su legibilidad.
* **Márgenes:** Respetar el área de seguridad de $1X$ indicada visualmente en el PDF.

---

## 2. Paleta Cromática

La interfaz gráfica del turnero debe configurarse con los colores oficiales de la municipalidad utilizando la siguiente paleta y proporciones de uso sugeridas:

### Colores Principales

| Color | Código Hex | Proporción Sugerida | Uso Principal |
| :--- | :--- | :---: | :--- |
| **Naranja** | `#FE8F00` | 30% | Elementos de interacción: Header, menú de navegación, botones principales y/o hipervínculos destacados. |
| **Gris Claro** | `#F0F2F5` | 60% | Fondos de pantalla, contenedores de tarjetas (cards) y fondo de formularios. |
| **Gris Oscuro** | `#333333` | 5% | Color principal de textos legibles e iconos sobre fondo claro. |
| **Blanco** | `#FFFFFF` | 5% | Textos e iconos que se posicionen sobre fondos naranjas (contraste). |

### Paleta Auxiliar y de Soporte
* **Gris Medio/Oscuro:** `#999999`
* **Gris Medio:** `#B6B7B8`
* **Gris Medio/Claro:** `#D3D4D6`

---

## 3. Tipografía y Estilo de Texto

Se define la tipografía **Montserrat** (o en su defecto fuentes sans-serif equivalentes y modernas con excelente legibilidad en pantalla como *Inter* o *Outfit*) con la siguiente jerarquía:

* **Títulos Principales ($H1$):** `Montserrat Bold`
* **Subtítulos y Títulos Secundarios ($H2$):** `Montserrat Semibold`
* **Texto de Cuerpo y Etiquetas:** `Montserrat Regular`

*Nota: La tipografía y la iconografía son sugerencias de identidad y pueden emplearse alternativas similares si la optimización de carga en el navegador lo requiere.*

---

## 4. Iconografía

* **Librería Recomendada:** `Material Symbols & Icons` en su variante de **estilo redondeado (rounded)**, para mantener la coherencia con los bordes curvos del logotipo y el tono amigable del turnero.
